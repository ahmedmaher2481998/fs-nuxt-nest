FROM node:20-alpine
# required for Prisma 
RUN apk add --no-cache openssl libc6-compat

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

RUN npx prisma generate

COPY . .

EXPOSE 3001

CMD ["npm", "run", "start:migrate"]
