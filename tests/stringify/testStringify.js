
var JSOX = require( "../.." )


var stringify = JSOX.stringify;
var parse = JSOX.parse;

var r, r2, r3;
r = stringify( { a: "simple object", b:3, c:new Date() } );
	r2 = stringify( parse( r ) );
	if( r != r2 )
console.log( "1:", r );

r = stringify( [ "simple array", 3, new Date() ] );
	r2 = stringify( parse( r ) );
	if( r != r2 )
console.log( "2:", r );

if( BigInt ) {
	r = stringify( { a: "simple object", b:3, c:new Date(), d:123n, e:null, f:undefined, g:NaN, h:Infinity, i:-Infinity, h:-0.302 } );
	r2 = stringify( parse( r ) );
	if( r != r2 )
	console.log( "3:", r, r2 );

	r = stringify( [ "simple array", 3, new Date(), 123n, null, undefined, ,NaN, Infinity ] );
	r2 = stringify( parse( r ) );
	if( r != r2 )
	
	console.log( "4:", r, r2 );

}

console.log( "Success is no output above this." );