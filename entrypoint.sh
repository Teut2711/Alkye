#!/bin/sh

# Exit immediately if a command exits with a non-zero status.
set -e

# Navigate to the project directory
cd blog_project

# Apply database migrations
python manage.py makemigrations
python manage.py migrate

# Start the Django server
python manage.py runserver 0.0.0.0:8000
