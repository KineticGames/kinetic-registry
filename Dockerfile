FROM node:18-alpine as base

ENV PNPM_VERSION 7.30.0
RUN npm i -g pnpm

FROM base AS dependencies

WORKDIR /app
COPY package.json .
RUN pnpm install

FROM base AS build

WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN pnpm build
RUN pnpm prune --prod

FROM base AS deploy

WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules

CMD ["pnpm", "start:prod"]