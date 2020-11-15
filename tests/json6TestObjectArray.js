

var JSON6 = require('..')
var d = '[ {a: "", b: ""}, {a: "", b: ""} ]';
console.log( JSON6.parse( d ) );

var arr2 = "[1,[2,[3,[4,5]]]]";
console.log( JSON6.parse( arr2 ) );


var d = '[ {a: "", b: ""}, [1,2], {a: "", b: ""} ]';
console.log( JSON6.parse( d ) );

var d = '{ a:{a: "", b: ""}, b:[{d:"",e:""},{f:"",g:""}], c:{a: "", b: ""} }';
console.log( JSON6.parse( d ) );
