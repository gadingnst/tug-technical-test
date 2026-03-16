#!/bin/bash

# build-docker-image.sh
# This script builds the Docker image for backend
# while excluding other applications in the monorepo to simplify the build context.

IMAGE_NAME="backend"
# Navigate to the root of the repository
ROOT_DIR=$(git rev-parse --show-toplevel)
cd "$ROOT_DIR" || exit 1
ENV_FILE="$ROOT_DIR/apps/backend/.env"

echo "Building Docker image for $IMAGE_NAME..."

if [ ! -f "$ENV_FILE" ]; then
    echo "Missing env file: $ENV_FILE"
    exit 1
fi

echo "Syncing database schema and seeding wellness packages..."
docker run --rm \
    --env-file "$ENV_FILE" \
    -v "$ROOT_DIR:/usr/src/app" \
    -v backend_build_node_modules:/usr/src/app/node_modules \
    -w /usr/src/app \
    node:22-alpine \
    sh -lc "npm ci && npm run drizzle:push --workspace=backend && npm run seed:wellness-packages --workspace=backend"

SYNC_EXIT_CODE=$?
if [ $SYNC_EXIT_CODE -ne 0 ]; then
    echo "Database sync/seed failed."
    exit $SYNC_EXIT_CODE
fi

# Create a temporary directory for the build context
TEMP_CONTEXT=$(mktemp -d)
echo "Created temporary build context at $TEMP_CONTEXT"

# Copy root configurations required for the build
cp package.json "$TEMP_CONTEXT/"
cp package-lock.json "$TEMP_CONTEXT/"

# Copy shared packages directory
cp -R packages "$TEMP_CONTEXT/"

# Copy ONLY the backend app
mkdir -p "$TEMP_CONTEXT/apps"
cp -R apps/backend "$TEMP_CONTEXT/apps/"

# Build the Docker image from the temporary context
# Pointing to the Dockerfile inside the backend app folder
docker build -t "$IMAGE_NAME" -f "$TEMP_CONTEXT/apps/backend/Dockerfile" "$TEMP_CONTEXT"

BUILD_EXIT_CODE=$?

# Clean up
echo "Cleaning up temporary context..."
rm -rf "$TEMP_CONTEXT"

if [ $BUILD_EXIT_CODE -eq 0 ]; then
    echo "Docker image '$IMAGE_NAME' built successfully."
else
    echo "Docker build failed."
    exit $BUILD_EXIT_CODE
fi
