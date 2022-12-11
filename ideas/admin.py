from django.contrib import admin
from .models import Idea


@admin.register(Idea)
class IdeaAdmin(admin.ModelAdmin):
    list_display = ('created_at', 'title', 'status', 'user')
    list_display_links = ('title',)
    fields = (
        'title', 'status',
        'description', 'user',
        'idea_index')
    list_filter = ('user', 'status')
