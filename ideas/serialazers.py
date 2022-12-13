from rest_framework import serializers
from .models import Idea
from django.contrib.auth.models import User


class IdeaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Idea
        fields = ['pk', 'title', 'description', 'status', 'created_at', 'idea_index']
        read_only_fields = ['pk', 'created_at']
