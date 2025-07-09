#!/usr/bin/env node

const PORT = process.env.PORT || 8080

const connect = require("connect");
const serveStatic = require("serve-static")

const staticDir = __dirname + "/dist/";

console.log("Starting HTTP server in dir: " + staticDir);

connect().use(serveStatic(staticDir)).listen(PORT, () => {
	console.log("Running on port " + PORT)
})
