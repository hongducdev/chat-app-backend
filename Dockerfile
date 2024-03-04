FROM node:20.11.1
WORKDIR /chat-app-api
ADD . .
RUN npm cache clean --force
RUN npm i -g pnpm
RUN pnpm install
RUN pnpm build
CMD ["pnpm", "start"]
