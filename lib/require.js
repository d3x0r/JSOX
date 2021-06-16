// require.js
// Node.js only: adds a require() hook for .json6 files, just like the native
// hook for .json files.
//
// Usage:
// require('json6/require');
// require('./foo');    // will check foo.json5 after foo.js, foo.json, etc.
// require('./bar.json6');
"use strict";

const FS = require('fs');
const JSOX = require('./jsox.min.js').JSOX;

// Modeled off of (v0.6.18 link; check latest too):
// https://github.com/joyent/node/blob/v0.6.18/lib/module.js#L468-L472
require.extensions['.jsox'] = function (module, filename) {
	const content = FS.readFileSync(filename, 'utf8');
	return module.exports = JSOX.parse(content);
};

const Module = require('module');
const zlib   = require('zlib');

function requireGZ(module,filename) {
	const code = zlib.gunzipSync(FS.readFileSync(filename)).toString();
	const mod  = new Module();

	mod._compile(code, filename);

	return mod.exports;
}

function requireGZx(module,filename) {
	const code = zlib.gunzipSync(FS.readFileSync(filename)).toString();
	return module.exports = JSOX.parse(code);
}

require.extensions['.js.gz'] = requireGZ;
require.extensions['.jsox.gz'] = requireGZx;

// Use:
//let test = requireGZ('./test.js.gz');
