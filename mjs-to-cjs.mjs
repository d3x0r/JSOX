// Generate lib/jsox.js (CJS) from lib/jsox.mjs (ESM).
// The two sources are identical except for how the module is opened and closed;
// this toggles those three blocks and nothing else.
//
//   node mjs-to-cjs.mjs             write lib/jsox.js
//   node mjs-to-cjs.mjs --check     exit 1 if lib/jsox.js is stale (no write)
//   node mjs-to-cjs.mjs --out FILE  write somewhere else (preview/diff)

import FS from "fs";

const SRC = "lib/jsox.mjs";
const DST = "lib/jsox.js";

// [ description, what it looks like in the .mjs, what it becomes in the .js ]
const blocks = [
	[ "exports guard",
`//if( "undefined" === typeof exports )
//	var exports = {};`,
`if( "undefined" === typeof exports )
	var exports = {};` ],

	[ "module open",
`const JSOX = {};
//const JSOX = (function ( JSOX ) {`,
`const JSOX = (function ( JSOX ) {` ],

	[ "module close",
`//return JSOX;
//})(exports || {})
export {JSOX}
export default JSOX;`,
`return JSOX;
})(exports || {})
//export {JSOX}
//export default JSOX;` ],
];

const src = FS.readFileSync( SRC, "utf8" );
const nl  = src.includes( "\r\n" ) ? "\r\n" : "\n";

let out = src;
for( const [ name, from, to ] of blocks ) {
	const needle = from.replace( /\n/g, nl );
	const parts  = out.split( needle );
	if( parts.length !== 2 )
		throw new Error( `${SRC}: expected exactly one '${name}' block, found ${parts.length - 1}.`
		               + ` The two sources have drifted -- reconcile by hand before generating.` );
	out = parts.join( to.replace( /\n/g, nl ) );
}

const debugOn = [ ...src.matchAll( /^const (_DEBUG_\w+)\s*=\s*true/gm ) ].map( m => m[1] );
if( debugOn.length )
	console.warn( `WARNING: ${SRC} has debug logging enabled, and it will be mirrored`
	            + ` into ${DST}:\n  ` + debugOn.join( "\n  " ) );

if( process.argv.includes( "--check" ) ) {
	const cur = FS.existsSync( DST ) ? FS.readFileSync( DST, "utf8" ) : null;
	if( cur === out ) { console.log( `${DST} is up to date.` ); process.exit( 0 ); }
	console.error( `${DST} is STALE -- run: node mjs-to-cjs.mjs` );
	process.exit( 1 );
}

const outIdx = process.argv.indexOf( "--out" );
const target = outIdx > 0 ? process.argv[ outIdx + 1 ] : DST;
FS.writeFileSync( target, out );
console.log( `wrote ${target} from ${SRC}` );
