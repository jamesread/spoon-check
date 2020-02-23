#!/usr/bin/env node

const PORT = process.env.PORT || 8080

var connect = require("connect");
var serveStatic = require("serve-static")

connect().use(serveStatic(__dirname)).listen(PORT, () => {
	console.log("Running on port " + PORT)
})
