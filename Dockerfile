FROM crowdin/cli:3.9.1 AS build

RUN set -eux \
    & apk add \
        --no-cache \
        nodejs \
        yarn
ADD . /root
ENV NPM_CONFIG_LOGLEVEL=warn NPM_CONFIG_PROGRESS=false NODE_OPTIONS="--max_old_space_size=4096"
RUN cd /root/docs/ \
    && apk update \
    && apk add --no-cache git bash make g++ perl automake autoconf \
    && chmod +x import.pl \
    && yarn add docusaurus \
    && crowdin download \
    && cp -R docs/threatmapper/img zh-CN/threatmapper/img \
    && cp -R docs/threatmapper/img es-ES/threatmapper/img \
    && mkdir -p i18n/zh-CN/docusaurus-plugin-content-docs/current/ \
    && mkdir -p i18n/es-ES/docusaurus-plugin-content-docs/current/ \
    && mv zh-CN/threatmapper i18n/zh-CN/docusaurus-plugin-content-docs/current/threatmapper \
    && mv es-ES/threatmapper i18n/es-ES/docusaurus-plugin-content-docs/current/threatmapper\
    && make \
    && make build

FROM nginx:1.23-alpine
MAINTAINER Deepfence Inc
LABEL deepfence.role=system

COPY --from=build /root/docs/build /var/www/html

ADD community.deepfence.io.conf /etc/nginx/conf.d/community.deepfence.io.conf.template
ADD docs.deepfence.io.conf /etc/nginx/conf.d/docs.deepfence.io.conf.template
ADD docker-entrypoint.sh /docker-entrypoint.d/docker-entrypoint.sh
RUN apk update \
    && rm /etc/nginx/conf.d/default.conf  \
    && mkdir -p /var/www/html \
    && chmod +x /docker-entrypoint.d/docker-entrypoint.sh
