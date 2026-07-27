FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY services/socket ./services/socket

RUN npm install

WORKDIR /app/services/socket

RUN npm run build

EXPOSE 3002

CMD ["npm", "run", "start"]
