ci: npmci build

npmci:
	npm ci

build:
	npx vite build --base ./
	cp -r data dist/
	cp sw.js dist/

lint:
	npx stylelint main.css blat.css
	npx eslint main.js sw.js

.PHONY: ci npmci build lint
