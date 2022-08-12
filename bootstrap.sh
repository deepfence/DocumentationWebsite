#!/bin/bash

git submodule update --init --remote --recursive product-docs/ThreatMapper
git submodule update --init --remote --recursive product-docs/SecretScanner
git submodule update --init --remote --recursive product-docs/PacketStreamer
git submodule update --init --remote --recursive product-docs/FlowMeter
git submodule update --init --remote --recursive product-docs/ThreatStryker-docs
git submodule update --init --remote --recursive product-docs/YaraHunter
exit 0
