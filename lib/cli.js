#!/usr/bin/env node
"use strict";

// cli.js
// JSOX command-line interface.
//
// This is pretty minimal for now; just supports compiling files via `-c`.
// TODO More useful functionality, like output path, watch, etc.?

const FS = require('fs');
const JSOX = require('./jsox');
const Path = require('path');

const USAGE = [
	'Usage: jsox -c path/to/file.jsox ...',
	'Compiles JSOX files into sibling JSON files with the same basenames.',
].join('\n');

// if valid, args look like [node, jsox, -c, file1, file2, ...]
const args = process.argv;

if (args.length < 4 || args[2] !== '-c') {
	console.error(USAGE);
	process.exit(1);
}

const cwd = process.cwd();
const files = args.slice(3);

// iterate over each file and convert JSOX files to JSON:
files.forEach(function (file) {
	let path = Path.resolve(cwd, file);
	const basename = Path.basename(path, '.jsox');
	const dirname = Path.dirname(path);

	const jsox = FS.readFileSync(path, 'utf8');
	const obj = JSOX.parse(jsox);
	const json = JSON.stringify(obj, null, 4); // 4 spaces; TODO configurable?

	path = Path.join(dirname, basename + '.json');
	FS.writeFileSync(path, json, 'utf8');
});
