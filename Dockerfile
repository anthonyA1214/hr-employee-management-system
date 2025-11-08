# Build Frontend
FROM node:20-alpine AS frontend

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all files and build the frontend
COPY . .
RUN npm run build

# Build Backend
FROM php:8.2-fpm-alpine AS backend

# Install dependencies and PHP extensions
RUN apk add --no-cache \
    bash \
    git \
    curl \
    libpng-dev \
    libjpeg-turbo-dev \
    libwebp-dev \
    libzip-dev \
    zip \
    unzip \
    oniguruma-dev \
    icu-dev \
    && docker-php-ext-install pdo pdo_mysql mbstring zip exif pcntl bcmath intl gd

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copy Laravel project files
COPY . .

# Copy built frontend assets
COPY --from=frontend /app/public/build ./public/build

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# Cache config, routes, and views
RUN php artisan config:cache && php artisan route:cache && php artisan view:cache

# Set correct file permissions
RUN chmod -R 755 storage bootstrap/cache

# Expose port 8000
EXPOSE 8000

# Default command to run the application
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]