default:
	parcel build src/index.pug --public-url '.' --no-content-hash
	cp package.json dist/
	cp node-http-server.js dist/
