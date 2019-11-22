var JSOX=require( ".." );

console.log( "MNOP=", JSOX.parse( '{ab:ab["0123456"]}' ) );
console.log( "MNOP=", JSOX.parse( '{ab:u8["0123456789012345"]}' ) );
console.log( "MNOP=", JSOX.parse( '{ab:u16["01234565345"]}' ) );
console.log( "MNOP=", JSOX.parse( '{ab:u32["0123456789012345"]}' ) );
console.log( "MNOP=", JSOX.parse( '{ab:s8["0123456789012345"]}' ) );
console.log( "MNOP=", JSOX.parse( '{ab:s16["0123456789012345"]}' ) );
console.log( "MNOP=", JSOX.parse( '{ab:s32["0123456789012345"]}' ) );
console.log( "MNOP=", JSOX.parse( '{ab:f32["0123456789012345"]}' ) );
console.log( "MNOP=", JSOX.parse( '{ab:f64["00123456789012345123456789012345"]}' ) );
