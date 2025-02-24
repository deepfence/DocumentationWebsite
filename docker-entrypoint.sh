#!/bin/sh
# vim:sw=4:ts=4:et

set -e

if [ -f "/etc/nginx/conf.d/community.deepfence.io.conf.template" ]; then
  export GITHUB_BASIC_AUTH=$(echo "${GITHUB_USER}:${GITHUB_ACCESS_TOKEN}" | base64)
  envsubst '${GITHUB_BASIC_AUTH}' </etc/nginx/conf.d/community.deepfence.io.conf.template >/etc/nginx/conf.d/community.deepfence.io.conf
  envsubst '${GITHUB_BASIC_AUTH}' </etc/nginx/conf.d/docs.deepfence.io.conf.template >/etc/nginx/conf.d/docs.deepfence.io.conf
  envsubst '${GITHUB_BASIC_AUTH}' </etc/nginx/conf.d/threatmapper.org.conf.template >/etc/nginx/conf.d/threatmapper.org.conf
  rm -f /etc/nginx/conf.d/community.deepfence.io.conf.template /etc/nginx/conf.d/docs.deepfence.io.conf.template /etc/nginx/conf.d/threatmapper.org.conf.template
fi
