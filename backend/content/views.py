from rest_framework import viewsets, response, permissions
from .models import Post
from .serializers import PostListSerializer, PostDetailSerializer, PostCreateUpdateSerializer
from .services import get_posts_by_category, increment_post_view
from .permissions import IsAuthorOrReadOnly
from django.db import transaction

class PostViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Post model with author permissions.
    """
    queryset = Post.objects.all().order_by('-created_at')
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]

    def get_queryset(self):
        category = self.request.query_params.get('category')
        return get_posts_by_category(category_name=category)

    def get_serializer_class(self):
        if self.action in ['retrieve']:
            return PostDetailSerializer
        elif self.action in ['create', 'update', 'partial_update']:
            return PostCreateUpdateSerializer
        return PostListSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        increment_post_view(instance.id)
        serializer = self.get_serializer(instance)
        return response.Response(serializer.data)

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    @transaction.atomic
    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    @transaction.atomic
    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)
    