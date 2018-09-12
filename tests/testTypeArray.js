var JSOX=require( ".." );

console.log( "MNOP=", JSOX.parse( '{ab:ab[0,1,2,3,4,5,6,7]}' ) );
console.log( "MNOP=", JSOX.parse( '{ab:u8[0,1,2,3,4,5,6,7]}' ) );
console.log( "MNOP=", JSOX.parse( '{ab:u16[0,1,2,3,4,5,6,7]}' ) );
console.log( "MNOP=", JSOX.parse( '{ab:u32[0,1,2,3,4,5,6,7]}' ) );
console.log( "MNOP=", JSOX.parse( '{ab:s8[0,1,2,3,4,5,6,7]}' ) );
console.log( "MNOP=", JSOX.parse( '{ab:s16[0,1,2,3,4,5,6,7]}' ) );
console.log( "MNOP=", JSOX.parse( '{ab:s32[0,1,2,3,4,5,6,7]}' ) );
console.log( "MNOP=", JSOX.parse( '{ab:f32[0,1,2,3,4,5,6,7]}' ) );
console.log( "MNOP=", JSOX.parse( '{ab:f64[0,1,2,3,4,5,6,7]}' ) );
