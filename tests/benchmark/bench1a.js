var JSOX=require("../.." );

function runParser( l, p ) {
	const s = p.stringify;
        const parse = p.parse;
        
        var n;
        var o1 = { a: 123, b:467, c:"1234", d:35.1, e:new Date() };
        var s1;
        var start;
	var result = { s:0,sn:0,p:0,pn:0};        

        start = Date.now();
        
        for( n = 0; ((n%1000)!=999) || ((Date.now()-start) < 5000 ); n++ ) {
        	s1 = s(o1);
        }
        console.log( l,"String Did", result.sn =n, "in", result.s =Date.now()-start );
        
	return result;
}


var x = runParser( "JSOX", JSOX );
var n = runParser( "JSON", JSON );

console.log( x.sn/n.sn);
//console.log( x.pn/n.pn);
console.log( n.sn/x.sn);
//console.log( n.pn/x.pn);
