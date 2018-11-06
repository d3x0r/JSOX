
const JSOX=require('..');

var s;

s = JSOX.stringify(JSOX.parse( '{ a:1 , b:3 , c:[1,3,] , }' ));
console.log( s );

s = JSOX.stringify(JSOX.parse( '{ a:1 , b:3 , c:[1,3,,] , }' ));
console.log( s );

s = JSOX.stringify(JSOX.parse( '{ ,,, a:1,,,,b:3,,, }' ));
console.log( s );
