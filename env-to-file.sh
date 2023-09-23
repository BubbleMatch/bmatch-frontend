#!/bin/sh

echo "VITE_API_URL=$VITE_API_URL" >> ./.env
echo "VITE_WS_GAME_URL=$VITE_WS_GAME_URL" >> ./.env
echo "VITE_WS_LOBBY_URL=$VITE_WS_LOBBY_URL" >> ./.env

npm run start
