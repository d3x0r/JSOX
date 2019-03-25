
var jsox = require( "../.." );
console.log( "JSOX:", jsox, Object.getPrototypeOf(jsox) );

var a = jsox.parse( '[Infinity,NaN,undefined,-Infinity,-123, {a:123}]' );
console.log( "out?", a );
console.log( "out?", JSON.stringify( a ) );


var a = jsox.parse( 'ident{object,field,names}ident{"abc",123,Infinity}' );

console.log( "out?", a );

var a = jsox.parse( 'ident{object,field,names}[ident{"abc",123,Infinity},ident{"abc",123,Infinity},ident{"abc",123,Infinity},ident{"abc",123,Infinity}]' );

console.log( "out?", a );
var a = jsox.parse( '[2018-09-11T09:11:09.011+07:00]' );

console.log( "out?", a );
