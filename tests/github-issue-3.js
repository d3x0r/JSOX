
var JSOX = require( ".." );
var input = "{use:[['less',{includePath:['$PWD/packages/ufc-host-app/src']}]]}"

console.log( "Test Output1 : ", JSON.stringify( JSOX.parse( input ), null, '\t' ) );

