FROM node:22-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./
COPY packages ./packages
COPY apps/wellness-admin ./apps/wellness-admin

# Install dependencies for the whole workspace
RUN npm ci

# Build the shared packages if needed
RUN npm run build:shared

# Build the admin frontend application
RUN npm run build:admin

# ---

FROM nginx:alpine AS runner

# Copy the built Vite static files into Nginx's HTML directory
COPY --from=builder /usr/src/app/apps/wellness-admin/dist /usr/share/nginx/html

# Expose port 80 (nginx default)
EXPOSE 80

# The default nginx CMD works fine here
CMD ["nginx", "-g", "daemon off;"]
