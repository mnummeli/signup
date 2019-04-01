#!/usr/bin/env sh

rm -rf **/*~ node_modules/ public/bundle.js README.html
git gc --aggressive --prune=now
