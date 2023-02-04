
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


describe('Added in 1.2.117', function () {



	it( 'recovers 0 reference', function() {
		const string = '[{self:ref[0]}]';
		const expects = JSOX.parse(string);
		const recurs = [{self:null}];
		recurs[0].self = recurs[0];
		//console.log( "Expects to not be an error:", expects );
		expect( expects ).to.deep.equal( recurs );

	} );
        
} );
