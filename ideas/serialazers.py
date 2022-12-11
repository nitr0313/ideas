from rest_framework import serializers
from .models import Idea


class IdeaSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Idea
        fields = ['title', 'description']
