FROM node:20.11.1
WORKDIR /chat-app-api
ADD . .
RUN npm i -g pnpm
RUN pnpm install
CMD ["pnpm", "start"]
