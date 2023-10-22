#!/bin/bash

echo "Started: $(date)"

echo "waking docker containers"
docker compose -f ./docker/docker-compose.yml up -d

echo "installing dependencies"
npm i -g pnpm
pnpm i

echo "running tests"
npx vitest run