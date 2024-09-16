export THREATMAPPER_VERSION?="2.3.1"
export TM_CONSOLE_HELM_CHART_VERSION?="2.3.1"
export TM_ROUTER_HELM_CHART_VERSION?="2.3.1"
export TM_AGENT_HELM_CHART_VERSION?="2.3.1"
export THREATSTRYKER_VERSION?="2.3.1"
export TS_CONSOLE_HELM_CHART_VERSION?="2.3.2"
export TS_ROUTER_HELM_CHART_VERSION?="2.3.1"
export TS_AGENT_HELM_CHART_VERSION?="2.3.1"
export CLOUD_SCANNER_HELM_CHART_VERSION?="2.3.1"
export DF_IMG_TAG?="2.3.1"

.PHONY: bootstrap build push push-latest

all: bootstrap build

bootstrap:
	./bootstrap.sh

build:
	docker build \
		--build-arg THREATMAPPER_VERSION=$(THREATMAPPER_VERSION) \
		--build-arg TM_CONSOLE_HELM_CHART_VERSION=$(TM_CONSOLE_HELM_CHART_VERSION) \
		--build-arg TM_ROUTER_HELM_CHART_VERSION=$(TM_ROUTER_HELM_CHART_VERSION) \
		--build-arg TM_AGENT_HELM_CHART_VERSION=$(TM_AGENT_HELM_CHART_VERSION) \
		--build-arg THREATSTRYKER_VERSION=$(THREATSTRYKER_VERSION) \
		--build-arg TS_CONSOLE_HELM_CHART_VERSION=$(TS_CONSOLE_HELM_CHART_VERSION) \
		--build-arg TS_ROUTER_HELM_CHART_VERSION=$(TS_ROUTER_HELM_CHART_VERSION) \
		--build-arg TS_AGENT_HELM_CHART_VERSION=$(TS_AGENT_HELM_CHART_VERSION) \
		--build-arg CLOUD_SCANNER_HELM_CHART_VERSION=$(CLOUD_SCANNER_HELM_CHART_VERSION) \
		-f Dockerfile \
		-t quay.io/deepfenceio/deepfence_docs:$(DF_IMG_TAG) .

push:
	docker push quay.io/deepfenceio/deepfence_docs:$(DF_IMG_TAG)

push-latest:
	docker tag quay.io/deepfenceio/deepfence_docs:$(DF_IMG_TAG) quay.io/deepfenceio/deepfence_docs:latest
	docker push quay.io/deepfenceio/deepfence_docs:latest
	docker image rm quay.io/deepfenceio/deepfence_docs:latest

push-release:
	docker tag quay.io/deepfenceio/deepfence_docs:$(DF_IMG_TAG) quay.io/deepfenceio/deepfence_docs:$(THREATMAPPER_VERSION)
	docker push quay.io/deepfenceio/deepfence_docs:$(THREATMAPPER_VERSION)
	docker image rm quay.io/deepfenceio/deepfence_docs:$(THREATMAPPER_VERSION)
