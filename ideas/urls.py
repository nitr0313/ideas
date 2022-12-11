from rest_framework import routers
from .api import IdeaViewSet
from django.urls import path, include

router = routers.DefaultRouter()
router.register(r'ideas', IdeaViewSet)


urlpatterns = [
    path('api/v1/', include(router.urls)),
]
