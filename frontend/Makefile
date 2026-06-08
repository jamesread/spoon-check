ci: npmci build

npmci:
	npm ci

build:
	npx vite build --base ./
	cp -r data dist/
	cp sw.js dist/

.PHONY: ci npmci build
