from rest_framework import viewsets
from rest_framework import permissions
from ideas.models import Idea
from .serialazers import IdeaSerializer
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie


class IdeaViewSet(viewsets.ModelViewSet):
    queryset = Idea.objects.all()
    serializer_class = IdeaSerializer
    permission_classes = [permissions.AllowAny]

    @method_decorator(ensure_csrf_cookie)
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    def perform_create(self, instance):
        instance.save(user=self.request.user)

    def get_queryset(self):
        qs = super().get_queryset()
        qs = qs.filter(user=self.request.user).order_by('-idea_index', 'updated_at')        
        return qs
