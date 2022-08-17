FROM node:16.14.2-alpine3.15 AS build

ADD . /root
ENV NPM_CONFIG_LOGLEVEL=warn NPM_CONFIG_PROGRESS=false NODE_OPTIONS="--max_old_space_size=4096"
RUN cd /root/docs/ \
    && apk update \
    && apk add --no-cache git bash make g++ perl automake autoconf \
    && chmod +x import.pl \
    && yarn add docusaurus \
    && make \
    && make build

FROM nginx:1.23-alpine
LABEL deepfence.role=system

WORKDIR /home/deepfence
ADD nginx.conf /etc/nginx/conf.d/default.conf
RUN mkdir -p /var/www/html
COPY --from=build /root/docs/build /var/www/html
RUN ls -alh /var/www/html