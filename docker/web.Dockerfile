FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY apps/web ./apps/web
COPY packages ./packages

RUN npm install

WORKDIR /app/apps/web

RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/apps/web/.next ./.next
COPY --from=builder /app/apps/web/public ./public
COPY --from=builder /app/apps/web/next.config.js ./
COPY --from=builder /app/apps/web/package*.json ./

RUN npm install --production

EXPOSE 3000

CMD ["npm", "run", "start"]
