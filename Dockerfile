FROM node:20-slim
RUN apt-get update -y && apt-get install -y openssl
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
RUN npm run db:generate
COPY prisma ./prisma

EXPOSE 8082
CMD ["node", "server.js"]
