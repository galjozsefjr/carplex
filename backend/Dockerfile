FROM php:7.4.33-fpm-alpine as backend-stage

LABEL maintainer="Jozsef Gal"

RUN docker-php-ext-install pdo_mysql sockets
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer \
  && composer install --no-dev --optimize-autoloader --no-interaction --no-progress --prefer-dist

RUN apk add --no-cache $PHPIZE_DEPS
##    && pecl install xdebug-2.9.7 \
##    && docker-php-ext-enable xdebug

WORKDIR /var/www/html/backend
COPY . .
