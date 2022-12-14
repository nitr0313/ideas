# *New Idea App*
> *для изучения react JS*

Место для хранения приходящих идей (Еще один клон трелло). С переходом в работу или в архив.

## TODO:
* Добавлять идеи (*выполнено*)
* Изменять название, описание (*выполнено*)
* Изменять "важность" идеи добавляя или уменьшая ее индекс (сортировка по индексу) (*выполнено*)
* Удалять идеи (*выполнено*)
* Переносить идеи между столбцами (из новых в работу и тд) (*выполнено*)
* Скидывать идеи в архив (*выполнено*)
* Добавить комментарии к идеям, возможно файлы и изображения 
* Периодическое оповещение пользователя об случайных идеях с высоким индексом или о залежавшихся в работе



## Для первого запуска:

### Установите зависимости из каталога requirements:
* `base.txt` - Общие зависимости
* `dev.txt` - Для разработки
* `prod.txt` - Для публикации сайта

### Переименуйте `.env-dist` в `.env` и заполните необходимые данные:

* DATABASE_URL: 
* * postgres://user:pass@localhost:port/dbname
* * sqlite:///db.sqlite3
* SECRET_KEY: сгенерируйте свой секретный ключ 
* CELERY_BROKER_URL:
* * amqp://guest:*@localhost//
* * amqp://username:password@host:port/vhost
* CELERY_RESULT_BACKEND:
* * 'rpc://localhost'
```
from django.core.management.utils import get_random_secret_key 
get_random_secret_key()
```

### Задайте переменную окружения 
`DJANGO_SETTINGS_MODULE=core.settings.dev` (*core.settings.prod ДЛЯ PRODUCTION!!!!*)
* Linux: `export DJANGO_SETTINGS_MODULE=core.settings.dev`
* Windows: `set DJANGO_SETTINGS_MODULE=core.settings.dev`
* С помощью django: `python manage.py runserver --settings core.settings.dev`
* C помощью PyCharm: [PyCharm EditConfiguration](https://stackoverflow.com/a/42708480/16184934)

* В Heroku `heroku config:set DJANGO_SETTINGS_MODULE=core.settings.prod`

### Запустите Celery
```cmd
celery -A core.celery worker -l info
```
Для запуска под Windows добавьте ключ `--pool=solo` или `-P solo`
```cmd
celery -A core.celery worker -l info -P solo
```

Так же Celery для запуска периодических задач
```
celery -A core beat -l info
```

### Запуск тестов
```cmd
py .\manage.py test --settings core.settings.tests
```