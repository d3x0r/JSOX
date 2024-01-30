'use strict';
// require.js
// Node.js only: adds a import() hook for .jsox files, just like the native
// hook for .json files.
//
// Usage:
// import {default as config} from "config.jsox";

import fs from "fs";
import url from "url";
import path from "path";

const version = process.version.slice(1).split('.'  ).map( a=>Number(a));
// this should maybe be 20.3 instead of 20.6
const Is20Plus = ()=>( version[0] >= 21 || ( version[0] >= 20 && version[1] >= 6 ) ) ;
// less than 20, used globalPreload code... 
const importString = Is20Plus()?"import {JSOX} from 'jsox';":"";

/**
 * @param {string} url
 * @param {Object} context (currently empty)
 * @param {Function} defaultGetFormat
 * @returns {Promise<{ format: string }>}
 */
export async function getFormat(url, context, defaultGetFormat) {
	const exten = path.extname( url );
	//if( exten === '' ) return { format:'module' }
	if( exten === ".jsox" ){
	    return { format: 'module' };
	}
	return defaultGetFormat(url,context );
}

/**
 * @param {string} url
 * @param {{ format: string }} context
 * @param {Function} defaultGetSource
 * @returns {Promise<{ source: !(string | SharedArrayBuffer | Uint8Array) }>}
 */
export async function getSource(urlin, context, defaultGetSource) {
	const exten = path.extname( urlin );
	if( exten === ".jsox" ){
	  	const { format } = context;
		const file = url.fileURLToPath(urlin);
		const result = fs.readFileSync(file).toString("utf8");
   	 return {
   	   source: result,
	    };
	}
  // Defer to Node.js for all other URLs.
  return defaultGetSource(urlin, context, defaultGetSource);
}

/**
 * @param {!(string | SharedArrayBuffer | Uint8Array)} source
 * @param {{
 *   format: string,
 *   url: string,
 * }} context
 * @param {Function} defaultTransformSource
 * @returns {Promise<{ source: !(string | SharedArrayBuffer | Uint8Array) }>}
 */
export async function transformSource(source, context, defaultTransformSource) {
	const exten = path.extname( context.url );
	if( exten === ".jsox" ){
    return {                                                                                       
      source: "const data = JSOX.parse( '" + escape(source) + "'); export default data;",
    };
	}
  return defaultTransformSource(source, context, defaultTransformSource);
}

export async function load(urlin, context, defaultLoad) {
	const { format } = context;
	const exten = path.extname( urlin );
	//console.log( "LOAD:", urlin, exten, context );
	if( exten === ".jsox" ){
	  	const { format } = context;
		const file = url.fileURLToPath(urlin);
		const result = fs.readFileSync(file).toString("utf8");

		if( exten === ".jsox" ){
		    return {
		      format: "module",
				shortCircuit: true,
		      source: importString + "/*console.log( 'JSOX:', JSOX, globalThis.JSOX);*/ const data = JSOX.parse( '" + escape(result) + "'); export default data;",
		    };
		}
	}
	//console.log( "Just relay?" );
	return defaultLoad(urlin, context, defaultLoad);

}

function escape(string) {
	let output = '';
	if( !string ) return string;
	for( let n = 0; n < string.length; n++ ) {
		const ch = string[n];
		if( ch === '\n' ){
			output += "\\n";
		} else if( ch === '\r' ){
			output += "\\r";
		} else {
			if( ( ch === '"' ) || ( ch === '\\' ) || ( ch === '`' )|| ( ch === '\'' )) {
				output += '\\';
			}
			output += ch;
		}
	}
	return output;
};

/**
 * @returns {string} Code to run before application startup
 */
// Preloads JSON6 as a global resource; which is then used in the transformed source above.
export function getGlobalPreloadCode() {
  return `\
const { createRequire } = getBuiltin('module');
const requireJSOX = createRequire('${escape(url.fileURLToPath( import.meta.url ))}');
globalThis.JSOX = requireJSOX( "./jsox.min.js" ).JSOX;
`;

}

export function globalPreload() {
	return getGlobalPreloadCode()
}
