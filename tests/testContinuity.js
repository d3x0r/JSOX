var JSOX=require( ".." );
console.log( "{data:0,classTest:{b:1,c:2,d:3}}=", JSOX.parse( 'abc{b,c,d}{data:0,classTest:abc{1,2,3}}' ) );
