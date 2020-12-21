FROM node:15.0.1-alpine3.12 as development

ENV NODE_ENV=development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN set -xe \
   && apk add --no-cache --purge -uU \
        curl icu-libs unzip zlib-dev musl \
        mesa-gl mesa-dri-swrast \
        openjdk8 \
        libreoffice libreoffice-base libreoffice-lang-uk \
        ttf-freefont ttf-opensans ttf-ubuntu-font-family ttf-inconsolata \
	ttf-liberation ttf-dejavu \
        libstdc++ dbus-x11 \
    && echo "http://dl-cdn.alpinelinux.org/alpine/edge/main" >> /etc/apk/repositories \
    && echo "http://dl-cdn.alpinelinux.org/alpine/edge/community" >> /etc/apk/repositories \
    && echo "http://dl-cdn.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories \
    && apk add --no-cache -U \
	ttf-font-awesome ttf-mononoki ttf-hack \
        zip \
    && rm -rf /var/cache/apk/* /tmp/*

FROM node:15.0.1-alpine3.12 AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

COPY --from=development /usr/src/app/dist ./dist

RUN set -xe \
    && apk add --no-cache --purge -uU \
        curl icu-libs unzip zlib-dev musl \
        mesa-gl mesa-dri-swrast \
        openjdk8 \
        libreoffice libreoffice-base libreoffice-lang-uk \
        ttf-freefont ttf-opensans ttf-ubuntu-font-family ttf-inconsolata \
	ttf-liberation ttf-dejavu \
        libstdc++ dbus-x11 \
    && echo "http://dl-cdn.alpinelinux.org/alpine/edge/main" >> /etc/apk/repositories \
    && echo "http://dl-cdn.alpinelinux.org/alpine/edge/community" >> /etc/apk/repositories \
    && echo "http://dl-cdn.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories \
    && apk add --no-cache -U \
	ttf-font-awesome ttf-mononoki ttf-hack \
        zip \
    && rm -rf /var/cache/apk/* /tmp/*

USER node

ENTRYPOINT ["/usr/bin/libreoffice"]
CMD ["node", "dist/main"]
