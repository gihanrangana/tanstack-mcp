FROM node:22-slim

RUN corepack enable pnpm && corepack prepare pnpm@10.32.1 --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod=false

COPY tsdown.config.ts tsconfig.json ./
COPY src ./src/
RUN pnpm build

ENTRYPOINT ["node", "dist/index.mjs"]
