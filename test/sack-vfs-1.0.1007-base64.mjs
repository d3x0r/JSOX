import {JSOX} from "jsox";
/*
process.on("beforeExit", ()=>{ console.log( "EXITING" ) } );
process.on("uncaughtException",(a,b)=>{
	console.log( "test", a, b );
} );

function describe(a,b) { console.log( "doing:", a ); return b() };
function it(a,b) { console.log( "test:", a ); return b() };
let threw = null;
function expect(a) { if( "function" === typeof a ) { try { threw = null; a(); } catch(err){threw=err}; }
					 return ({ to: {deep:{  equal(b) { console.log( "did",a,"=",b);  } }
					, equal(b) { console.log( "did",a,"=",b); }
				  , throw(a) {console.log( "Success:error?", threw ) } } }); }
*/

describe('Added in 1.0.1007 (base64)', function () {



	it( 'Accepts $ and _ for encoding', function() {
		//console.log( "Parsed:", JSOX.parse( '{\n\t"a" : "b", "c" : "d" }' ) )
		//console.log( "Parsed:", JSOX.parse( '{\n\t"a" : "b", "c" : "d" }' ) )
                const buf2 = JSOX.parse( '{buf:ab["+/+/"] }' );
                const buf = JSOX.parse( '{buf:ab[$_$_] }' );
				const outbuf = JSOX.stringify( buf );
                //console.log( 'buf:', outbuf, buf, "B", buf2 );
		expect( JSOX.stringify( buf2 ) )
                       .to.equal( '{buf:ab[$_$_]}' );
		expect( JSOX.stringify( buf ) )
                       .to.equal( '{buf:ab[$_$_]}' );

		expect( JSOX.parse( '{buf:ab["+/+/"] }' ) )
                       .to.deep.equal( buf );
		expect( JSOX.parse( '{buf:ab[$_$_] }' ) )
                       .to.deep.equal( buf2 );
//		console.log( "Fail:", obj );
        } )
} )
