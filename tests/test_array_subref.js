const JSOX=require('..' );

const a = {
      	act : {},
        groups:[],
	n: [{
		m :[]
	}]
}
a.groups.push( a.act );
a.n[0].m.push(a.n[0]);


const b = {
        a: [ {}, {
            b: [ { c: []  }]
	}],
};

b.a[1].b[0].c.push( b.a[1].b[0] );

console.log( "No Output is success." );
var out = JSOX.stringify( b, null, "  " );
var decode = JSOX.parse( out );
var out2 = JSOX.stringify( decode, null, "  " );

//	console.log( "out1:", out );
if( out !== out2 )
{
	//console.log( "out1:", out );
	console.log( "out1:", decode );
	console.log( "out1.a[1].b:", decode.a[1].b );
	console.log( "out1:", out2 );
 }

//a.a.act[1].groups[0].activities.push( a.a.act[1] );
var out = JSOX.stringify( a, null, "  " );
var decode = JSOX.parse( out );
var out2 = JSOX.stringify( decode, null, "  " );

//	console.log( "out1:", out );
if( out !== out2 )
{
	//console.log( "out1:", out );
	console.log( "out1:", decode );
	console.log( "out1.a.groups:", decode.groups );
	console.log( "out1:", out2 );
 }
