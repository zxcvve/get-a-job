FROM node:20.11.1-alpine as builder

WORKDIR /app

COPY . /app

RUN --mount=type=secret,id=supabase_url \
    --mount=type=secret,id=supabase_key \
    --mount=type=secret,id=superjob_key \
    export SUPABASE_URL=$(cat /run/secrets/supabase_url) && \
    export SUPABASE_KEY=$(cat /run/secrets/supabase_key) && \
    export SUPERJOB_KEY=$(cat /run/secrets/superjob_key) && \
    npm ci && \
    npm run build

FROM node:20.11.1-alpine

WORKDIR /app

COPY --from=builder /app/.output /app/.output/

CMD ["node",".output/server/index.mjs"]