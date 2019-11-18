const JSOX = require(".." );

console.log( "Iso", new Date().toISOString() );
console.log( "jsox", JSOX.stringify( new Date() ) );