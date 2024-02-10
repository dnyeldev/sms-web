# syntax=docker/dockerfile:1

FROM node:16-alpine
WORKDIR /app
COPY . .

RUN apk add --no-cache git openssh
RUN yarn install && yarn build

CMD ["yarn", "start-server"]