var JSOX = require( ".." );

const obj = { '0abc' : true,
   'a3456=' : true,
   'a+b' : true,
   '.abc' : true,
};

console.log( "recode:", JSOX.stringify( JSOX.parse( JSOX.stringify(obj)) ) );
console.log( "output:", JSOX.stringify( obj ) )
