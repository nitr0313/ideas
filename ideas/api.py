from rest_framework import viewsets
from rest_framework import permissions
from ideas.models import Idea
from .serialazers import IdeaSerializer


class IdeaViewSet(viewsets.ModelViewSet):
    queryset = Idea.objects.all()
    serializer_class = IdeaSerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, instance):
        instance.save(user=self.request.user)

    def get_queryset(self):
        qs = super().get_queryset()
        qs = qs.order_by('-idea_index', 'updated_at')
        if self.request.user.is_authenticated:
            qs = qs.filter(user=self.request.user)
        return qs
