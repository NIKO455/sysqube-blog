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

```bash
cp .env.example .env
```

# Edit .env and set your database connection details

```bash
php artisan key:generate
```

```bash
php artisan migrate --seed
```

#### Frontend (React)


### Running the application

#### Backend (Laravel)

```bash
php artisan serve
```

#### Frontend (React)

```bash
npm start
```

Visit `http://127.0.0.1:8000` in your browser to see the SysǪube Blog application.


---
