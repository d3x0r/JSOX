
var JSON = require( ".." )

const s = `
{
    name: "jsox",
    version: "1.1.122",
    description: "Java Script Object eXchange.",
    keywords: [
        "jsox","json",
	"macro","template","class","recursive","circular","cyclic"
    ],
    author: "d3x0r <d3x0r@github.com>",
    contributors: [
    ],
    "@std/esm": "cjs",
    module: "lib/jsox.mjs",
    main: "lib/jsox.js",
    browser: "lib/jsox.es6.js.gz",
    bin: "lib/cli.js",
    files: [
        "lib/"
    ],
    dependencies: {},

    devDependencies: {
        core-js: "latest",
        rollup: "^1.20",
        eslint: "latest",
        nyc: "latest",
        mocha: "^3",
        chai: "^3",
        acorn: "^6",
        lint-staged: "^10.2.2",
	// '/' is a comment character, and needs quotes
        "@rollup/plugin-buble": "latest",
        "@rollup/plugin-commonjs": "latest",
        "@rollup/plugin-node-resolve": "latest",
        "@rollup/plugin-strip": "latest",
        rollup-plugin-terser: "latest"
    },
}
`


 describe( "Parse some live data", function() {
	it( "Works", function() {
		expect( JSON.parse(s) ).to.deep.equal( 

{
    name: "jsox",
    version: "1.1.122",
    description: "Java Script Object eXchange.",
    keywords: [
        "jsox","json",
	"macro","template","class","recursive","circular","cyclic"
    ],
    author: "d3x0r <d3x0r@github.com>",
    contributors: [
    ],
    "@std/esm": "cjs",
    module: "lib/jsox.mjs",
    main: "lib/jsox.js",
    browser: "lib/jsox.es6.js.gz",
    bin: "lib/cli.js",
    files: [
        "lib/"
    ],
    dependencies: {},

    devDependencies: {
        "core-js": "latest",
        rollup: "^1.20",
        eslint: "latest",
        nyc: "latest",
        mocha: "^3",
        chai: "^3",
        acorn: "^6",
        "lint-staged": "^10.2.2",
	// '/' is a comment character, and needs quotes
        "@rollup/plugin-buble": "latest",
        "@rollup/plugin-commonjs": "latest",
        "@rollup/plugin-node-resolve": "latest",
        "@rollup/plugin-strip": "latest",
        "rollup-plugin-terser": "latest"
    },
}
 ) 
	});
 
});

