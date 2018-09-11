
var JSON = require( ".." );
console.log( "excessive minus signs:", JSON.parse( "----1234" ) );
console.log( "excessive minus signs:", JSON.parse( "--++-+-1234" ) );
console.log( "excessive commas:", JSON.parse( "{ a:1234,,,,,b:456 }" ) );

