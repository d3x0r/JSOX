var JSOX=require( "../.." );

var ab = new ArrayBuffer(8);
var u8 = new Uint8Array(ab);
for( var n = 0; n < 8; n++ ) u8[n] = "MNOPQURZ".codePointAt(n);


console.log( "MNOP=", JSOX.stringify(JSOX.parse( JSOX.stringify({ab:ab}) )) );
console.log( "MNOP=", JSOX.stringify(JSOX.parse( JSOX.stringify({ab:new Uint8Array(ab)}) )) );
console.log( "MNOP=", JSOX.stringify(JSOX.parse( JSOX.stringify({ab:new Uint16Array(ab)}) )) );
console.log( "MNOP=", JSOX.stringify(JSOX.parse( JSOX.stringify({ab:new Uint32Array(ab)}) )) );
console.log( "MNOP=", JSOX.stringify(JSOX.parse( JSOX.stringify({ab:new Int8Array(ab)}) )) );
console.log( "MNOP=", JSOX.stringify(JSOX.parse( JSOX.stringify({ab:new Int16Array(ab)}) )) );
console.log( "MNOP=", JSOX.stringify(JSOX.parse( JSOX.stringify({ab:new Int32Array(ab)}) )) );
console.log( "MNOP=", JSOX.stringify(JSOX.parse( JSOX.stringify({ab:new Float32Array(ab)}) )) );
console.log( "MNOP=", JSOX.stringify(JSOX.parse( JSOX.stringify({ab:new Float64Array(ab)}) )) );
