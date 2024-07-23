# Django Blog with Next.js Frontend

## Overview

This project is a blogging application with a Django backend and a Next.js frontend. The application allows users to view, create, update, and delete blog posts. Users can also log in to manage their posts.

## Technologies Used

- **Backend:** Django, Django REST Framework, Django CORS Headers, `rest_framework_simplejwt` for JWT authentication
- **Frontend:** Next.js, Tailwind CSS
- **Database:** PostgreSQL
- **Docker:** For containerization

## Features

- **Django Backend:**

  - API endpoints for managing posts and comments.
  - JWT authentication for secure access.
  - CORS configuration to allow requests from the Next.js frontend.

- **Next.js Frontend:**
  - Pages to list all posts, view individual post details, and create/update/delete posts.
  - Client-side data fetching and form handling.
  - Tailwind CSS for responsive and modern design.

## Installation Issues

entrypoint.sh not found in backend logs
Solution
https://stackoverflow.com/questions/38905135/why-wont-my-docker-entrypoint-sh-execute

## Installation

### Backend

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Teut2711/Alkye
   cd Alkye
   docker compose up
   ```

## Backend Endpoints

- **Authentication:**

  - `POST /api/v1/token/` - Obtain JWT token

- **Posts:**

  - `GET /api/v1/post/` - List all posts
  - `POST /api/v1/post/` - Create a new post
  - `GET /api/v1/post/{id}/` - Retrieve a specific post
  - `PUT /api/v1/post/{id}/` - Update a specific post
  - `DELETE /api/v1/post/{id}/` - Delete a specific post

- **Comments:**
  - `GET /api/v1/post/{post_id}/comment/` - List all comments for a specific post
  - `POST /api/v1/post/{post_id}/comment/` - Create a new comment for a specific post

## Frontend Endpoints

- **Login Page:**

  - `/login` - Allows users to log in and obtain a JWT token.

- **Home Page:**

  - `/` - Displays all posts and provides links to individual post details.

- **Post Detail Page:**

  - `/post/detail/[id]` - Displays details of a specific post and allows updating or deleting the post (if logged in).

- **Create Post Page:**

  - `/post/create` - Allows logged-in users to create new posts.

- **Update Post Page:**
  - `/post/update/[id]` - Allows logged-in users to update existing posts.
