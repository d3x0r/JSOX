
const JSOX = require( "../.." );

var jsox = `
  cls{ author, title }
  cls2{ object,color}
  [cls{"bob","book"},
   cls{"tom","moon"},
   cls{"ted","mule"},
   cls2{"apple","red"},
   cls2{"orange","orange"}
  ]
`;

var arr = JSOX.parse( jsox );

Object.getPrototypeOf( arr[0] ).toString = function(){ return this.author + " wrote " + this.title };
Object.getPrototypeOf( arr[3] ).toString = function(){ return this.object + "s are " + this.color };

//console.log( "Test:", Object.getPrototypeOf( arr[0] ), Object.getPrototypeOf( Object.getPrototypeOf( arr[0] ) ) );

console.log( "object toString():" + {}.toString() );
console.log( "arr[2].toString(cls):" + arr[2].toString() );
console.log( "arr[4].toString(cls2):" + arr[3].toString() );
