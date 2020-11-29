var JSOX=require( "../.." );

var m = new Map();
var o = {keys:m};

m.set( "asdf", {obj1:0} );

console.log( "map only", JSOX.stringify( m ) );
console.log( "object", JSOX.stringify( o ) );
