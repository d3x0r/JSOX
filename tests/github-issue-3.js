
var JSOX = require( ".." );
var input = "{use:[['less',{includePath:['$PWD/packages/ufc-host-app/src']}]]}"

console.log( "object:", JSOX.parse( input ) );

console.log( "Test Output1 : \n", JSON.stringify( JSOX.parse( input ) ), "\n", input );

