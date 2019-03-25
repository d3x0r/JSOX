

var JSOX = require( "../.." )

var m= new Map();
m.set( "This", true );
m.set( "Is", 123 );
m.set( "A", "567" );
m.set( "Test", new Date() );

var ms = JSOX.stringify( m );
console.log( "out:", ms );
console.log( "out/in:", JSOX.parse( ms ) );
