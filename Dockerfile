FROM node:20.11.1-alpine as builder

WORKDIR /app

COPY . /app

RUN --mount=type=secret,id=SUPABASE_URL \
    --mount=type=secret,id=SUPABASE_KEY \
    --mount=type=secret,id=SUPERJOB_KEY \
    export NUXT_SUPABASE_URL=$(cat /run/secrets/SUPABASE_URL) && \
    export NUXT_SUPABASE_KEY=$(cat /run/secrets/SUPABASE_KEY) && \
    export NUXT_SUPERJOB_KEY=$(cat /run/secrets/SUPERJOB_KEY) && \
    echo NUXT_SUPABASE_URL=$(cat /run/secrets/SUPABASE_URL) >> .env && \
    echo NUXT_SUPABASE_KEY=$(cat /run/secrets/SUPABASE_KEY) >> .env && \
    echo SUPABASE_URL=$(cat /run/secrets/SUPABASE_URL) >> .env && \
    echo SUPABASE_KEY=$(cat /run/secrets/SUPABASE_KEY) >> .env && \
    echo NUXT_SUPERJOB_KEY=$(cat /run/secrets/SUPERJOB_KEY) >> .env && \
    cat .env && \
    npm ci && \
    cat /run/secrets/SUPABASE_URL && \
    npm run build

FROM node:20.11.1-alpine

WORKDIR /app

COPY --from=builder /app/.output /app/.output/

CMD ["node",".output/server/index.mjs"]