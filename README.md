# SysǪube Blog

SysǪube Blog is a full-stack blog application built with Laravel and React, providing basic CRUD functionality for
managing blog posts related to technology.

## Features

- **Admin Dashboard:**
    - User authentication and authorization.
    - CRUD operations for blog posts.
    - Blocking user after three failed login attempts.
    - Data validation and sanitization.

- **Frontend (Landing Page):**
    - Displaying blogs with status published blog posts.
    - Detail page for each article.

- **Blog Post Page:**
    - Form fields for creating and editing posts:
        - Title
        - Slug
        - Description
        - Status (Published or Draft)
        - Blog Image upload
- **Login Credentials:**
    - Name: Admin
    - Email: admin@gmail.com
    - Password: admin

## Installation

To run SysǪube Blog locally, follow these steps:

### Prerequisites

- PHP >= 7.3
- Composer
- Node.js and npm
- MySQL

### Clone the repository

```bash
git clone https://github.com/NIKO455/sysqube-blog.git
```

```bash
cd sysqube-blog
```

### Install dependencies

```bash
composer install
```

```bash
npm install
```

# Edit .env, set your database connection details and other configuration

```bash
cp .env.example .env
```

```bash
php artisan key:generate
```

```bash
php artisan migrate --seed
```

```bash
php artisan storage:link
```

### Running the application

#### Backend (Laravel)

```bash
php artisan serve
```

#### Frontend (React)

```bash
npm run dev
```

Visit `http://127.0.0.1:8000` in your browser to see the SysǪube Blog application.


---
