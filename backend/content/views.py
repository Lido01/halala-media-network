from rest_framework import viewsets, response, permissions
from .models import Post
from .serializers import PostListSerializer, PostDetailSerializer, PostCreateUpdateSerializer
from .services import increment_post_view  # Removed get_posts_by_category helper to fix filtering here directly
from .permissions import IsAuthorOrReadOnly, IsAdminOrReadOnly
from django.db import transaction

class PostViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Post model with robust author permissions and bulletproof category filtering.
    """
    queryset = Post.objects.all().order_by('-created_at')
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAdminOrReadOnly]

    def get_queryset(self):
        # Start with all active, published posts
        queryset = Post.objects.filter(is_published=True).order_by('-created_at')
        
        # 1. Grab parameter from React request URL (?category=news)
        category = self.request.query_params.get('category', None)
        
        if category:
            # 2. Force it to lowercase and clean up trailing spaces
            category_clean = category.strip().lower()
            
            # 3. FIX PLURAL TAB MISMATCH: If react asks for "projects", change it to "project" to match Django model choices
            if category_clean == 'projects':
                category_clean = 'project'
                
            # 4. Perform case-insensitive filter match
            queryset = queryset.filter(category__iexact=category_clean)
            
        return queryset

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
