# syntax=docker/dockerfile:1

FROM node:24-alpine

WORKDIR /app/src

ENV NODE_ENV=development \
    HOST=0.0.0.0 \
    PORT=3003

COPY src/package.json src/package-lock.json ./
RUN npm ci

COPY src/ .

EXPOSE 3003

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3003"]

