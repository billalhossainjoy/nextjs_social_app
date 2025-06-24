# Base: Install dependencies
FROM node:22-alpine AS deps

WORKDIR /app

# Prisma needs openssl for engine binaries
RUN apk add --no-cache openssl

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Development Stage
FROM node:22-alpine AS dev

WORKDIR /app
ENV NODE_ENV=development

# Install openssl (needed by Prisma)
RUN apk add --no-cache openssl

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Expose dev port
EXPOSE 3000

CMD ["npm", "run", "dev"]

# Build Stage
FROM node:22-alpine AS builder

WORKDIR /app
ENV NODE_ENV=production

RUN apk add --no-cache openssl

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma Client for production
RUN npx prisma generate

# Build the Next.js app
RUN npm run build

# Production Stage
FROM node:22-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

RUN apk add --no-cache openssl

# Copy built app & only what's needed
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

# Ensure Prisma Client is ready (safety net)
RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "start"]
