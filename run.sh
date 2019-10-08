#!/bin/bash

vuepress build

pushd .vuepress/dist
python3 -m http.server 8080
popd
