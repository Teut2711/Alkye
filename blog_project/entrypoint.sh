#!/bin/sh

# Exit immediately if a command exits with a non-zero status.
set -e

# Navigate to the project directory
cd blog_project


python manage.py makemigrations
python manage.py migrate
python manage.py createcachetable

python manage.py test
if [ "$DJANGO_SUPERUSER_USERNAME" ]; then
    (
        python manage.py createsuperuser \
            --noinput \
            --username "$DJANGO_SUPERUSER_USERNAME" \
            --email "$DJANGO_SUPERUSER_EMAIL" \
        || true
    )
fi

$@

# Start the Django server
python manage.py runserver 0.0.0.0:8000
