#!/bin/bash

echo "Started: $(date)"

echo "waking docker containers"
docker compose -f ./docker/docker-compose.yml up -d

echo "installing dependencies"
pnpm i