from rest_framework import viewsets
from rest_framework import permissions
from ideas.models import Idea
from .serialazers import IdeaSerializer


class IdeaViewSet(viewsets.ModelViewSet):
    queryset = Idea.objects.all()
    serializer_class = IdeaSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, instance):
        instance.save(user=self.request.user)
