
var JSOX = require("..");

try {
	console.log( JSON.stringify( JSOX.parse( " { a : true } " )  ) ) ;
        }catch(err) {
        	console.log( err );
        }
