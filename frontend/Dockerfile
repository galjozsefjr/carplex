FROM node:24.13.1-alpine AS base

LABEL maintainer="Jozsef Gal"

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /var/www/html/frontend

COPY package.json yarn.lock* ./
RUN --mount=type=cache,target=/usr/local/share/.cache/yarn\
  yarn install --production=false

FROM base AS builder
WORKDIR /var/www/html/frontend

COPY --from=deps /var/www/html/frontend/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production

RUN --mount=type=cache,target=/app/.next/cache \
  yarn build

FROM base AS runner
WORKDIR /var/www/html/frontend

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

COPY --from=builder --chown=node:node /var/www/html/frontend/public ./public
COPY --from=builder --chown=node:node /var/www/html/frontend/.next/standalone ./
COPY --from=builder --chown=node:node /var/www/html/frontend/.next/static ./.next/static

USER node

EXPOSE 3000

CMD ["node", "server.js"]
