dist-dev: clean
	parcel build src/index.pug --public-url '.' --no-content-hash

dist-prod: clean
	parcel build src/index.pug --public-url '.' --no-content-hash --no-source-maps

clean:
	rm -rf dist/
	mkdir -p dist/data
	cp src/data/icons.json dist/data/

buildah:
	podman stop -i spoon-check
	podman rm -i spoon-check
	podman rmi -i spoon-check:latest
	buildah bud -t spoon-check:latest .
	podman create --name spoon-check -p 3000:3000 spoon-check:latest
	podman start spoon-check

lint:
	stylelint src/main.css
	eslint src/*.js
	eslint src/modules/*.js
