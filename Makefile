dist-dev: clean
	parcel build src/index.pug --public-url '.' --no-content-hash

dist-prod: clean
	parcel build src/index.pug --public-url '.' --no-content-hash --no-source-maps

clean:
	rm -rf dist/
	mkdir dist/

buildah:
	podman stop -i spoon-check
	podman rm -i spoon-check
	podman rmi -i spoon-check:latest
	buildah bud -t spoon-check:latest .
	podman create --name spoon-check -p 8080:8080 spoon-check:latest

lint:
	stylelint src/main.css
	eslint src/*.js
	eslint src/modules/*.js
