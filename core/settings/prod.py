from .base import *

DEBUG = False

INSTALLED_APPS += \
    [
        'defender'
    ] + PROJECT_APPS
DEV_APPS = []

MIDDLEWARE.insert(5, 'defender.middleware.FailedLoginMiddleware')