
var JSON = require( ".." );

var input = "\0\0\0\0\0\0\0\0\0\0\0\0\0\0";
var output = JSON.escape( input );
console.log( "string:", input, "becomes:", output );

