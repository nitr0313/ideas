from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Idea(models.Model):
    class StatusIdea(models.TextChoices):
        new = 'NW', 'Новая'
        in_work = 'IW', 'В работе'
        success = 'SC', 'Выполнена'
        archive = 'AR', 'Архивирована'
    user = models.ForeignKey(
        User, verbose_name='Пользователь', on_delete=models.CASCADE)
    title = models.CharField('Название', max_length=250)
    description = models.CharField('Описание', max_length=2000, null=True, blank=True)
    status = models.CharField(
        'Статус идеи', max_length=2,
        choices=StatusIdea.choices,
        default=StatusIdea.new)
    idea_index = models.PositiveSmallIntegerField(default=0)
    created_at = models.DateTimeField('Время создания', auto_now_add=True)
    updated_at = models.DateTimeField('Время обновления', auto_now=True)

    class Meta:
        verbose_name = 'Идея'
        verbose_name_plural = 'Идеи'
        ordering = ('idea_index', '-updated_at')

    def __str__(self):
        return f"{self.title}"

    def add_index(self):
        self.idea_index += 1
        self.save()

    # def get_absolute_url(self):
    #     return reverse("model_detail", kwargs={"pk": self.pk})
    
