FROM node:20.11.1-alpine as builder

WORKDIR /app

COPY . /app

RUN npm ci && \
    npm run build

FROM node:20.11.1-alpine

WORKDIR /app

COPY --from=builder /app/.output /app/.output/

CMD ["node",".output/server/index.mjs"]

EXPOSE 3000