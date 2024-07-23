# Dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
COPY entrypoint.sh .

RUN pip install -r requirements.txt

COPY . .
EXPOSE 8000
ENTRYPOINT [ "./entrypoint.sh" ]