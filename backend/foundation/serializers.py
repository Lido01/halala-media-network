from rest_framework import serializers
from .models import FoundationProgram, Event

class FoundationProgramSerializer(serializers.ModelSerializer):
	class Meta:
		model = FoundationProgram
		fields = '__all__'

class EventSerializer(serializers.ModelSerializer):
	class Meta:
		model = Event
		fields = '__all__'
