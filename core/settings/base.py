
from pathlib import Path

import environ

BASE_DIR = Path(__file__).resolve().parent.parent.parent

env = environ.Env()
environ.Env.read_env(BASE_DIR / '.env')

DEBUG = True

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
]

PROJECT_APPS = [
    'ideas.apps.IdeasConfig',
    'frontend.apps.FrontendConfig',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'core.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

WSGI_APPLICATION = 'core.wsgi.application'

ALLOWED_HOSTS = env.list('ALLOWED_HOSTS', cast=str)
SECRET_KEY = env.str('SECRET_KEY')

LANGUAGE_CODE = 'ru-RU'
TIME_ZONE = 'Europe/Moscow'
USE_I18N = True
USE_TZ = True

DATABASES = {'default': env.db('DATABASE_URL')}
PUBLIC_ROOT = Path(env.str('PUBLIC_ROOT', BASE_DIR / 'public'))
MEDIA_ROOT = PUBLIC_ROOT / 'media'
MEDIA_URL = env.str('MEDIA_URL', default='/media/')

STATIC_ROOT = PUBLIC_ROOT / 'static'
STATICFILES_DIRS = [
    BASE_DIR / "static",
    BASE_DIR / "frontend",
]
STATIC_URL = env.str('STATIC_URL', default='/static/')

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
