FROM node:20.11.1-alpine as builder

WORKDIR /app

COPY . /app

RUN --mount=type=secret,id=SUPABASE_URL \
    --mount=type=secret,id=SUPABASE_KEY \
    --mount=type=secret,id=SUPERJOB_KEY \
    export SUPABASE_URL=$(cat /run/secrets/SUPABASE_URL) && \
    export SUPABASE_KEY=$(cat /run/secrets/SUPABASE_KEY) && \
    export SUPERJOB_KEY=$(cat /run/secrets/SUPERJOB_KEY) && \
    npm ci && \
    npm run build

FROM node:20.11.1-alpine

WORKDIR /app

COPY --from=builder /app/.output /app/.output/

CMD ["node",".output/server/index.mjs"]