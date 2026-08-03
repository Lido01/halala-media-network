import os
from datetime import timedelta
from pathlib import Path
import dj_database_url
import environ
from corsheaders.defaults import default_headers

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# 1. INITIALIZE ENVIRON WITH SMART FALLBACKS
env = environ.Env(
    DEBUG=(bool, False),
    ALLOWED_HOSTS=(list, ['localhost', '127.0.0.1']),
)

# Safely look for local .env files
environ.Env.read_env(os.path.join(BASE_DIR, '.env'))

# --- CRITICAL SECURITY SETTINGS ---
DEBUG = env('DEBUG')
SECRET_KEY = env('SECRET_KEY', default='django-insecure-development-fallback-key-string-replace-me')

# 2. BULLETPROOF ALLOWED_HOSTS FALLBACK
ALLOWED_HOSTS = env.list('ALLOWED_HOSTS', default=[])
if not ALLOWED_HOSTS or 'new-media-backend-c5uc.onrender.com' not in ALLOWED_HOSTS:
    ALLOWED_HOSTS = [
        'new-media-backend-c5uc.onrender.com',
        'localhost',
        '127.0.0.1',
        '.onrender.com'
    ]

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',    
    
    # CRITICAL POSITION: Cloudinary storage apps MUST be declared right here, 
    # directly before the staticfiles framework executes!
    'cloudinary_storage',
    'django.contrib.staticfiles',
    'cloudinary', # Core API module extension
    
    # Third-party extensions
    'rest_framework',
    'corsheaders',
    'drf_yasg',
    
    # Custom project apps
    'accounts',
    'content',
    'foundation',
    'media_gallery',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # Must remain at the top
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# Set up environment dictionary lookups for your Cloudinary account parameters
CLOUDINARY_STORAGE = {
    'CLOUD_NAME': env('CLOUDINARY_CLOUD_NAME', default=''),
    'API_KEY': env('CLOUDINARY_API_KEY', default=''),
    'API_SECRET': env('CLOUDINARY_API_SECRET', default=''),
}

# Instruct Django to route user upload media files directly into Cloudinary CDN storage
DEFAULT_FILE_STORAGE = 'cloudinary_storage.storage.MediaCloudinaryStorage'

ROOT_URLCONF = 'core.urls'
AUTH_USER_MODEL = 'accounts.User'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'core.wsgi.application'


import dj_database_url

BASE_DIR = Path(__file__).resolve().parent.parent

# Uses PostgreSQL if DATABASE_URL env variable exists, otherwise falls back to local SQLite
DATABASES = {
    'default': dj_database_url.config(
        default=f"sqlite:///{BASE_DIR / 'db.sqlite3'}",
        conn_max_age=600
    )
}


# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# Localization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# --- STATIC AND MEDIA FILE MANAGEMENT ---
STATIC_URL = 'static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# --- REST FRAMEWORK CONFIGURATIONS ---
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
}

# --- CORS & NETWORK POLICY SETTINGS ---
# CRITICAL FIX: Explicitly combine dashboard variables with hardcoded origins so dashboard variables cannot erase localhost.
CORS_ALLOWED_ORIGINS = [
    "https://netlify.app",
    "http://localhost:3000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

# Read optional items from Render Dashboard, clean them, and append safely
dashboard_origins = env.list('CORS_ALLOWED_ORIGINS', default=[])
for origin in dashboard_origins:
    clean_origin = origin.rstrip('/')
    if clean_origin and clean_origin not in CORS_ALLOWED_ORIGINS:
        CORS_ALLOWED_ORIGINS.append(clean_origin)

CORS_ALLOW_CREDENTIALS = False

CORS_ALLOW_HEADERS = list(default_headers) + [
    "content-type",
    "authorization",
    "accept",
    "origin",
    "x-requested-with",
]

# Security toggles adjust smoothly between Local (HTTP) and Deployments (HTTPS)
SESSION_COOKIE_SECURE = not DEBUG
CSRF_COOKIE_SECURE = not DEBUG
SESSION_COOKIE_SAMESITE = 'Lax'
CSRF_COOKIE_SAMESITE = 'Lax'

CSRF_TRUSTED_ORIGINS = [
    "https://netlify.app",
    "http://localhost:3000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
