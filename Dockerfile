FROM crowdin/cli:3.11.1 AS build

ARG CROWDIN_PERSONAL_TOKEN
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
    && make \
#    && sed -i "s/CROWDIN_PERSONAL_TOKEN/${CROWDIN_PERSONAL_TOKEN}/g" crowdin.yml \
#    && crowdin download \
#    && cd /root/product-docs/ThreatMapper/docs \
#    && cp -R docs/img zh-CN/threatmapper/img \
#    && cp -R docs/img zh-TW/threatmapper/img \
#    && mkdir -p i18n/zh-CN/docusaurus-plugin-content-docs/ \
#    && mkdir -p i18n/zh-TW/docusaurus-plugin-content-docs/ \
#    && mv zh-CN/threatmapper/ i18n/zh-CN/docusaurus-plugin-content-docs/current/ \
#    && mv zh-TW/threatmapper/ i18n/zh-TW/docusaurus-plugin-content-docs/current/ \
#    && cd /root/docs/ \
    && make build

FROM nginx:1.24-alpine
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
