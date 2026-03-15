#!/bin/bash

# build-docker-image.sh
# This script builds the Docker image for wellness-core-backend
# while excluding other applications in the monorepo to simplify the build context.

IMAGE_NAME="wellness-core-backend"
# Navigate to the root of the repository
ROOT_DIR=$(git rev-parse --show-toplevel)
cd "$ROOT_DIR" || exit 1

echo "Building Docker image for $IMAGE_NAME..."

# Create a temporary directory for the build context
TEMP_CONTEXT=$(mktemp -d)
echo "Created temporary build context at $TEMP_CONTEXT"

# Copy root configurations required for the build
cp package.json "$TEMP_CONTEXT/"
cp package-lock.json "$TEMP_CONTEXT/"

# Copy shared packages directory
cp -R packages "$TEMP_CONTEXT/"

# Copy ONLY the wellness-core-backend app
mkdir -p "$TEMP_CONTEXT/apps"
cp -R apps/wellness-core-backend "$TEMP_CONTEXT/apps/"

# Build the Docker image from the temporary context
# Pointing to the Dockerfile inside the backend app folder
docker build -t "$IMAGE_NAME" -f "$TEMP_CONTEXT/apps/wellness-core-backend/Dockerfile" "$TEMP_CONTEXT"

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
