var JSOX=require("../../lib/jsox.js" );
var JSON5
try {
JSON5=require("json5" );
}catch(err){}
var JSON6;
try {
JSON6=require("json6" );
}catch(err){}
//var JSOX=require("../../lib/jsox.es6.pretty.js" );
var sf = JSOX.stringifier();

function runParser( l, p ) {
	const s = p === JSOX?sf.stringify:p.stringify;
        const parse = p.parse;
        
        var n;
        var o1 = { a: 123, b:467, c:"1234", d:35.1, e:new Date() };
        var s1;
        var start;
	var result = { s:0,sn:0,p:0,pn:0};        

        start = Date.now();
        
        for( n = 0; ((n%3000)!=0) || ((Date.now()-start) < 2000 ); n++ ) {
        	s1 = s(o1);
        }
        console.log( l,"String Did", result.sn =n, "in", result.s =Date.now()-start, s1 );
        
        start = Date.now();
        for( n = 0; ((n%3000)!=0) || ((Date.now()-start) < 2000 ); n++ ) {
        	parse(s1);
        }
        console.log( l,"Parse  Did", result.pn =n, "in", result.p =Date.now()-start );
	return result;
}


var x = runParser( "JSOX", JSOX );
var n = runParser( "JSON", JSON );
if( JSON5 )
var n5 = runParser( "JSON5", JSON5 );
if( JSON6 )
var n6 = runParser( "JSON5", JSON6 );

console.log( "Node JSON v JSOX" );
console.log( "stringify", n.sn/x.sn);
console.log( "parse    ", n.pn/x.pn);

if( JSON5 ) {
console.log( "Node JSON v JSON5" );
console.log( "stringify", n.sn/n5.sn);
console.log( "parse    ", n.pn/n5.pn);
}

if( JSON6 ) {
console.log( "Node JSON v JSON6" );
console.log( "stringify", n.sn/n6.sn);
console.log( "parse    ", n.pn/n6.pn);
}

if( JSON5 ) {
console.log( "JSON5 v JSOX" );
console.log( "stringify", n5.sn/x.sn);
console.log( "parse    ", n5.pn/x.pn);
}

if( JSON5 && JSON6 ) {
console.log( "JSON5 v JSON6" );
console.log( "stringify", n5.sn/n6.sn);
console.log( "parse    ", n5.pn/n6.pn);
}


if( JSON6 ) {
console.log( "JSON6 v JSONX" );
console.log( "stringify", n6.sn/x.sn);
console.log( "parse    ", n6.pn/x.pn);
}