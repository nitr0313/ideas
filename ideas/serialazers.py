from rest_framework import serializers
from .models import Idea
from django.contrib.auth.models import User


class IdeaSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    
    class Meta:
        model = Idea
        fields = ['id', 'title', 'description', 'status']
