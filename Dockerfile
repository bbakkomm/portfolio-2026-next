FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Enable pnpm
RUN corepack enable pnpm

# Copy package files
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml* ./
COPY patches ./patches
RUN pnpm install --frozen-lockfile
# RUN pnpm install --no-frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
RUN corepack enable pnpm
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable telemetry during build
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ARG NEXT_PUBLIC_IMAGE_URL
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_API_MOCKING
ARG ADMIN_EMAIL

ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV NEXT_PUBLIC_IMAGE_URL=$NEXT_PUBLIC_IMAGE_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_API_MOCKING=$NEXT_PUBLIC_API_MOCKING
ENV ADMIN_EMAIL=$ADMIN_EMAIL

RUN pnpm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/.env* ./

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# server.js is created by next build from the standalone output
CMD ["node", "server.js"]
