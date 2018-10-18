

var JSOX = require( "../.." )

var stringifier = JSOX.stringifier();

var obj = { author: "sam", Title : "All good books" };
var obj2 = { isle: 33, shelf : 4 };

stringifier.defineClass("card",obj);
stringifier.defineClass("stk",obj2);

var testArray = [obj,obj,obj,obj];

var r;

r = stringifier.stringify( testArray );
console.log( r );

r = stringifier.stringify( testArray, null, 3 );
console.log( r );
