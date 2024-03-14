export THREATMAPPER_VERSION?="2.1.1"
export TM_CONSOLE_HELM_CHART_VERSION?="2.1.3"
export TM_ROUTER_HELM_CHART_VERSION?="2.1.1"
export TM_AGENT_HELM_CHART_VERSION?="2.1.1"
export THREATSTRYKER_VERSION?="2.1.1"
export TS_CONSOLE_HELM_CHART_VERSION?="2.1.3"
export TS_ROUTER_HELM_CHART_VERSION?="2.1.1"
export TS_AGENT_HELM_CHART_VERSION?="2.1.2"
export DF_IMG_TAG?="2.1.1"

.PHONY: build push push-latest

all: build

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
		-f Dockerfile \
		-t deepfenceio/deepfence_docs:$(DF_IMG_TAG) .

push:
	docker push deepfenceio/deepfence_docs:$(DF_IMG_TAG)

push-latest:
	docker tag deepfenceio/deepfence_docs:$(DF_IMG_TAG) deepfenceio/deepfence_docs:latest
	docker push deepfenceio/deepfence_docs:latest
	docker image rm deepfenceio/deepfence_docs:latest
