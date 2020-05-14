#!/bin/bash

# color codes for output formatting
GREEN="\033[0;32m"
NO_COLOR="\033[0m"

CURR_DIR=$(pwd)
$(mkdir -p -- "$CURR_DIR/build")
BUILD_DIR="$CURR_DIR/build"

echo -e "${GREEN}Removing old client container...${NO_COLOR}"
docker rm -f client
echo -e "${GREEN}Removing old client images...${NO_COLOR}"
docker rmi -f kethansrinivas9/image_repository_client:latest

echo -e "${GREEN}Preparing files for building Client image...${NO_COLOR}"
echo $CURR_DIR
cp "$CURR_DIR/dockerfiles/client.dockerfile" "$BUILD_DIR/"
cp "$CURR_DIR/app.js" "$CURR_DIR/angular.js" "$CURR_DIR/jquery-3.5.1.min.js" "$CURR_DIR/ng-file-upload.min.js" "$CURR_DIR/ng-infinite-scroll.min.js" "$BUILD_DIR/"
cp "$CURR_DIR/main.html" "$BUILD_DIR/"
cp "$CURR_DIR/package.json" "$CURR_DIR/package-lock.json" "$BUILD_DIR/"
cp -a "$CURR_DIR/Client/." "$BUILD_DIR/Client"
cd "$BUILD_DIR"

echo -e "${GREEN}Building client image...${NO_COLOR}"
docker build -t kethansrinivas9/image_repository_client:latest -f ./client.dockerfile .
cd ..
rm -r "$BUILD_DIR/"

$(mkdir -p -- "$CURR_DIR/build")
#
# echo -e "${GREEN}Running the client container...${NO_COLOR}"
# docker run -d --name client -p 3000:3000 kethansrinivas9/image_repository_client

# echo -e "${GREEN}Removing old server container...${NO_COLOR}"
# docker rm -f server
# echo -e "${GREEN}Removing old server images...${NO_COLOR}"
# docker rmi -f kethansrinivas9/image_repository_server:latest
#
# echo -e "${GREEN}Preparing files for building server image...${NO_COLOR}"
# cd "$CURR_DIR"
# cp "$CURR_DIR/dockerfiles/server.dockerfile" "$CURR_DIR/server/"
# cd "$CURR_DIR/server"
#
# echo -e "${GREEN}Building Server image...${NO_COLOR}"
# docker build -t kethansrinivas9/image_repository_server:latest -f ./server.dockerfile .
# cd ..
# rm "$CURR_DIR/server/server.dockerfile"
#
# echo -e "${GREEN}Running the Server container...${NO_COLOR}"
# docker run -d --name server -p 5000:5000 kethansrinivas9/image_repository_server
#
# echo -e "${GREEN}Pushing the images to Docker Hub...${NO_COLOR}"
# docker push kethansrinivas9/image_repository_client:latest
# docker push kethansrinivas9/image_repository_server:latest
