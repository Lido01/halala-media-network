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

	def update(self, instance, validated_data):
		# Only update thumbnail if present in validated_data
		thumbnail = validated_data.pop('thumbnail', None)
		for attr, value in validated_data.items():
			setattr(instance, attr, value)
		if thumbnail is not None:
			instance.thumbnail = thumbnail
		instance.save()
		return instance
