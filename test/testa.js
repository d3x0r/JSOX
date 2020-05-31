
var JSON6 = require( ".." )

    var result = JSON6.parse( "{ 'my  \\\r  key':3}" );

    console.log( "result:", result );

console.log( JSON6.parse( "'\\\u07ec'" ).length );

