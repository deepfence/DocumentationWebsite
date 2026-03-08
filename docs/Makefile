# Product Docs are imported using git submodules in /product-docs.  These can be updated using `git submodule update –remote`
# or `make pull`
#
# We need to copy these into the docusaurus tree before building the docs website.  Note that we can't simply symlink them
# because (a) the request router uses the realpath, which lies outside the /docs tree, and (b) there are some additions to
# the frontmatter we want to make for the docs site 
#
# This makefile only needs to be run when the product docs submodules are updated, either because of a submodule update,
# or because of a local edit.  Note that local edits to the submodule documentation are not reflected in the documentation 
# site until make is run

.PHONY: docs sidebars build

SED := $(shell command -v gsed >/dev/null 2>&1 && echo gsed || echo sed)
SED_INPLACE := -i

ifeq ($(shell uname),Darwin)
ifneq ($(SED),gsed)
SED_INPLACE := -i ''
endif
endif

all: pull docs sidebars extras

threatmapper-build:
	@echo Building ThreatMapper
	cd ../product-docs/ThreatMapper/docs \
    && find . -type f -name '*.md' -exec $(SED) $(SED_INPLACE) 's/THREATMAPPER_VERSION/${THREATMAPPER_VERSION}/g' {} + \
    && find . -type f -name '*.md' -exec $(SED) $(SED_INPLACE) 's/TM_CONSOLE_HELM_CHART_VERSION/${TM_CONSOLE_HELM_CHART_VERSION}/g' {} + \
    && find . -type f -name '*.md' -exec $(SED) $(SED_INPLACE) 's/TM_ROUTER_HELM_CHART_VERSION/${TM_ROUTER_HELM_CHART_VERSION}/g' {} + \
    && find . -type f -name '*.md' -exec $(SED) $(SED_INPLACE) 's/TM_AGENT_HELM_CHART_VERSION/${TM_AGENT_HELM_CHART_VERSION}/g' {} + \
    && find . -type f -name '*.md' -exec $(SED) $(SED_INPLACE) 's/CLOUD_SCANNER_HELM_CHART_VERSION/${CLOUD_SCANNER_HELM_CHART_VERSION}/g' {} + \
    && yarn && yarn build

build: threatmapper-build
	@echo Building Documentation Website
	yarn install
	yarn build
	mv ../product-docs/ThreatMapper/docs/build build/threatmapper

run: build
	npm run serve

docs:
	@echo Importing docs to ./docs
	./import.pl secretscanner  --from ../product-docs/SecretScanner/docs/docs --to docs
	./import.pl packetstreamer --from ../product-docs/PacketStreamer/docs/docs --to docs
	./import.pl flowmeter      --from ../product-docs/FlowMeter/docs/docs --to docs
	./import.pl yarahunter     --from ../product-docs/YaraHunter/docs/docs --to docs
	./import.pl ebpfguard      --from ../product-docs/ebpfguard/docs/docs --to docs

sidebars: 
	@echo Copying sidebars to ./sidebars
	cp ../product-docs/SecretScanner/docs/sidebars.js      sidebars/secretscanner.js
	cp ../product-docs/PacketStreamer/docs/sidebars.js     sidebars/packetstreamer.js
	cp ../product-docs/FlowMeter/docs/sidebars.js          sidebars/flowmeter.js
	cp ../product-docs/YaraHunter/docs/sidebars.js         sidebars/yarahunter.js
	cp ../product-docs/ebpfguard/docs/sidebars.js          sidebars/ebpfguard.js

extras:
	@echo Copying additional resources
	#cp ../product-docs/ThreatMapper/docs/static/img/threatmapper-intro.mp4 static/img

pull:
	@echo Updating product repos
	@echo "  To force update, run 'git reset --hard HEAD; git pull' in each submodule repo"
	(cd .. && bash bootstrap.sh)

clean:
	-@rm sidebars/*.js
	-@rm -rf docs/threatmapper docs/secretscanner docs/packetstreamer docs/flowmeter docs/yarahunter docs/ebpfguard
	-@rm -rf build
