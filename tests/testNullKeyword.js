const util = require('util');
const JSOX = require("..");

const obj = JSOX.parse( "[null,null,null, null , null,null ,null]" );
console.log( "object:", obj );
