#!/usr/bin/env bash

git pull
slc build -p
slc deploy -s InteractAI http://0.0.0.0:7705
