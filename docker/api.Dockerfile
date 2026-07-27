FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY packages ./packages
COPY services/api ./services/api
COPY database ./database

RUN npm install
RUN npm run db:migrate

WORKDIR /app/services/api

RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "start:prod"]
