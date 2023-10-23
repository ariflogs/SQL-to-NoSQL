#!/bin/bash

echo "Running unit test on: $(date)"

echo "installing dependencies"
npm i -g pnpm
pnpm i

echo "running tests"
npx vitest run unit # will run all test files containing unit in their name