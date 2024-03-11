FROM node:20.11.1-alpine as builder

WORKDIR /app

COPY . /app

ARG SUPABASE_URL
ENV SUPABASE_URL $SUPABASE_URL

ARG SUPABASE_KEY
ENV SUPABASE_KEY $SUPABASE_KEY

ARG SUPERJOB_KEY
ENV SUPERJOB_KEY $SUPERJOB_KEY

RUN npm ci && \
    npm run build

FROM node:20.11.1-alpine

WORKDIR /app

COPY --from=builder /app/.output /app/.output/

ENV NITRO_PORT=443

CMD ["node",".output/server/index.mjs"]

EXPOSE 443