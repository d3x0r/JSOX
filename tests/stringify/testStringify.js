
var JSOX = require( "../.." )


var stringify = JSOX.stringify;
var parse = JSOX.parse;

var r, r2, r3;
r = stringify( { "true": "simple object", "false":3, "test extra":new Date(), "This+fails":0, "123":123, 124:123 } );
	r2 = stringify( parse( r ) );
	if( r != r2 )
console.log( "identTest:", r );


r = stringify( { a: "simple object", b:3, c:new Date() } );
	r2 = stringify( parse( r ) );
	if( r != r2 )
console.log( "1:", r );

r = stringify( [ "simple array", 3, new Date() ] );
	r2 = stringify( parse( r ) );
	if( r != r2 )
console.log( "2:", r );

if( BigInt ) {
	r = stringify( { a: "simple object", b:3, c:new Date(), d:123n, e:null, f:undefined, g:NaN, h:Infinity, i:-Infinity, j:-0.302 }, null, 3 );
	console.log( "pretty:", r );
	r = stringify( { a: "simple object", b:3, c:new Date(), d:123n, e:null, f:undefined, g:NaN, h:Infinity, i:-Infinity, j:-0.302 } );
	r2 = stringify( parse( r ) );
	if( r != r2 )
	console.log( "3:", r, r2 );

	r = stringify( [ "simple array", 3, new Date(), 123n, null, undefined, ,NaN, Infinity ] );
	r2 = stringify( parse( r ) );
	if( r != r2 )
	
	console.log( "4:", r, r2 );

}

console.log( "Success is no output above this." );