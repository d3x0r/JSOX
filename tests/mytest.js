


var JSOX = require( ".." )


var parse = JSOX.parse;

var o;
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

parse( s );
	
		const results = [];
		o = parse( "{\"a\":{\"b\":{\"c\":{\"d\":123}, e:456}, f:789}, g: 987}", function (a, b) {
			results.push([a, b]);
			return b;
		} );
		console.log( "o is", JSON.stringify( o ) );
                
	console.log( "RESULTS:", results );

/*
	it('Reviver which deletes', function () {
		const results = [];
		// Add temporarily to prototype to check coverage of
		//   `hasOwnProperty` filter
		Object.prototype.ttt = function () {};
		const o = parse('{a: {b: {c: 5}, d: 8}}', function (a, b) {
			results.push([a, b]);
			if (a === 'd') {
				return undefined;
			}
			return b;
		} );
		//console.log( "o is", JSON.stringify( o ) );
		delete Object.prototype.ttt;

		expect(o).to.deep.equal({
			a: {b: {c: 5}}
		});

		expect(results).to.deep.equal([
			['', {
				a: {
					b: {
						c: 5
					}
				}
			}],
			['c', 5],
			['b', {
				c: 5
			}],
			['d', 8],
			['a', {
				b: {
					c: 5
				}
			}],
		]);
	});
});
*/