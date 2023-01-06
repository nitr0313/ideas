from django.conf import settings

def app_version(request):
    return {'app_version': settings.VERSION_}