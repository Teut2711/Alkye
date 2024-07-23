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

