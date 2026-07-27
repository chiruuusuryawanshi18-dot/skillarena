FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY apps/admin ./apps/admin
COPY packages ./packages

RUN npm install

WORKDIR /app/apps/admin

RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/apps/admin/.next ./.next
COPY --from=builder /app/apps/admin/public ./public
COPY --from=builder /app/apps/admin/next.config.js ./
COPY --from=builder /app/apps/admin/package*.json ./

RUN npm install --production

EXPOSE 3003

CMD ["npm", "run", "start"]
