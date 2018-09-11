
var JSON = require( ".." );

var buf1 = new Buffer( "{op:'json'}" );
console.log( buf1 );

console.log( JSON.parse( buf1 ) );
