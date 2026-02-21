FROM node:24.13.1-alpine AS base

LABEL maintainer="Jozsef Gal"

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /var/www/html/frontend

COPY package.json yarn.lock* ./
RUN yarn install

FROM base AS builder
WORKDIR /var/www/html/frontend
COPY . .
COPY --from=deps /var/www/html/frontend/node_modules ./node_modules

EXPOSE 3000

CMD ["yarn", "dev"]