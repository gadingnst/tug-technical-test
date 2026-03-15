FROM node:22-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./
COPY packages ./packages
COPY apps/wellness-core-backend ./apps/wellness-core-backend

# Install dependencies for the whole workspace
RUN npm ci

# Build the shared packages if needed
RUN npm run build:shared

# Build the backend application
RUN npm run build:backend

# ---

FROM node:22-alpine AS runner

WORKDIR /usr/src/app

ENV NODE_ENV=production

# Copy package files
COPY package*.json ./
COPY packages ./packages
COPY apps/wellness-core-backend/package.json ./apps/wellness-core-backend/

# Install only production dependencies
RUN npm ci --omit=dev

# Copy the built artifacts from the builder
COPY --from=builder /usr/src/app/packages ./packages
COPY --from=builder /usr/src/app/apps/wellness-core-backend/dist ./apps/wellness-core-backend/dist

WORKDIR /usr/src/app/apps/wellness-core-backend

EXPOSE 9100

CMD ["node", "dist/main.js"]
