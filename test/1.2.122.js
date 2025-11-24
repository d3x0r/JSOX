'use strict';
const JSOX = require( ".." );

/*
process.on("beforeExit", ()=>{ console.log( "EXITING" ) } );
process.on("uncaughtException",(a,b)=>{
	console.log( "test", a, b );
} );

function describe(a,b) { return b() };
function it(a,b) { return b() };
let threw = null;
function expect(a) { if( "function" === typeof a ) { try { threw = null; a(); } catch(err){threw=err}; }
					 return ({ to: {deep:{  equal(b) { console.log( "did",a,"=",b);  } }
					, equal(b) { console.log( "did",a,"=",b); }
				  , throw(a) {console.log( "Success:error?", threw ) } } }); }
*/


describe('Added in 1.2.122', function () {

	it( 'handles keyword at end of object', function() {
		const string = '{op:f}';
		const expects = JSOX.parse(string);

		expect( expects ).to.deep.equal(  {op:"f"} );

	} );

	it( 'handles keyword at end of array', function() {
		const string = '[a,f]';
		const expects = JSOX.parse(string);

		expect( expects ).to.deep.equal(  ["a","f"] );

	} );
        
} );



