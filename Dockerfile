FROM alpine:latest

RUN apk add --update nodejs npm

WORKDIR /app

COPY . /app

RUN npm install

CMD ["node", "index.js"]
