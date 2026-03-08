export THREATMAPPER_VERSION?=2.5.8
export TM_CONSOLE_HELM_CHART_VERSION?=2.5.8
export TM_ROUTER_HELM_CHART_VERSION?=2.5.8
export TM_AGENT_HELM_CHART_VERSION?=2.5.8
export CLOUD_SCANNER_HELM_CHART_VERSION?=2.5.8
export DOCKER_IMAGE?=node:20-bookworm
export DOCKER_YARN_VERSION?=1.22.22
HOST_UID := $(shell id -u)
HOST_GID := $(shell id -g)

.PHONY: all bootstrap sync sync-local build build-local build-docker run run-local clean

all: build

bootstrap:
	./bootstrap.sh

sync: sync-local

sync-local: bootstrap
	$(MAKE) -C docs docs sidebars extras

build: build-docker

build-local: sync-local
	$(MAKE) -C docs build

build-docker:
	docker run --rm -t \
		-e HOST_UID=$(HOST_UID) \
		-e HOST_GID=$(HOST_GID) \
		-e COREPACK_ENABLE_DOWNLOAD_PROMPT=0 \
		-v "$(CURDIR):/workspace" \
		-w /workspace \
		$(DOCKER_IMAGE) bash -lc "\
			set -euo pipefail; \
			apt-get update; \
			apt-get install -y --no-install-recommends git make perl ca-certificates passwd; \
			rm -rf /var/lib/apt/lists/*; \
			corepack enable; \
			corepack prepare yarn@$(DOCKER_YARN_VERSION) --activate; \
			if ! getent group \"\$$HOST_GID\" >/dev/null 2>&1; then groupadd -g \"\$$HOST_GID\" hostgroup; fi; \
			if ! getent passwd \"\$$HOST_UID\" >/dev/null 2>&1; then useradd -m -u \"\$$HOST_UID\" -g \"\$$HOST_GID\" -s /bin/bash hostuser; fi; \
			BUILD_USER=\$$(getent passwd \"\$$HOST_UID\" | cut -d: -f1); \
			su \"\$$BUILD_USER\" -s /bin/bash -c 'make sync-local build-local'"

run: run-local

run-local: sync-local
	$(MAKE) -C docs run

clean:
	$(MAKE) -C docs clean
