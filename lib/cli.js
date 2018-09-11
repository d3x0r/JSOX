#!/usr/bin/env node

// cli.js
// JSOX command-line interface.
//
// This is pretty minimal for now; just supports compiling files via `-c`.
// TODO More useful functionality, like output path, watch, etc.?

var FS = require('fs');
var JSOX = require('./jsox');
var Path = require('path');

var USAGE = [
    'Usage: jsox -c path/to/file.jsox ...',
    'Compiles JSOX files into sibling JSON files with the same basenames.',
].join('\n');

// if valid, args look like [node, jsox, -c, file1, file2, ...]
var args = process.argv;

if (args.length < 4 || args[2] !== '-c') {
    console.error(USAGE);
    process.exit(1);
}

var cwd = process.cwd();
var files = args.slice(3);

// iterate over each file and convert JSOX files to JSON:
files.forEach(function (file) {
    var path = Path.resolve(cwd, file);
    var basename = Path.basename(path, '.jsox');
    var dirname = Path.dirname(path);

    var jsox = FS.readFileSync(path, 'utf8');
    var obj = JSOX.parse(jsox);
    var json = JSON.stringify(obj, null, 4); // 4 spaces; TODO configurable?

    path = Path.join(dirname, basename + '.json');
    FS.writeFileSync(path, json, 'utf8');
});
