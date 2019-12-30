FROM node:10.15.0-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .

RUN apk add --virtual .gyp \
      python \
      make \
      g++ \
      curl \
      git \
    && npm config set unsafe-perm true && npm install --production && npm cache clean --force

EXPOSE 3000

CMD npm run migrate && npm run start
