'use strict';
const JSOX = require( ".." );

const parse = JSOX.parse;


/*
process.on("beforeExit", ()=>{ console.log( "EXITING" ) } );
process.on("uncaughtException",(a,b)=>{
	console.log( "test", a, b );
} );

function describe(a,b) { return b() };
function it(a,b) { return b() };
let threw = null;
function expect(a) { if( "function" === typeof a ) { try { threw = null; a(); } catch(err){threw=err}; }
					 return ({ to: {deep:{  equal(a) { } }
				  , throw(a) {console.log( "Success:error?", threw ) } } }); }
*/


describe('Stream testing', function () {
	it('Receives various values via `write`', function () {
		let results = [];
		const parser = JSOX.begin(function (obj) {
			//console.log( "Got value:", typeof obj, ":", obj );
			results.push(obj);
		});

		parser.write( '"This ' );
		parser.write( 'is a Test"' );

		parser.write( '[1234,12');
		parser.write( '34,1234]');

		parser.write( '[123,4');
		parser.write( '56,78');
		parser.write( '9,"abc","de');
		parser.write( 'f","ghi"]');


		parser.write( 'true false null undefined NaN Infinity' );

		parser.write( "1 " );
		parser.write( "123" );
		parser.write( '"1"' );

		parser.write( '{ a:12' );
		parser.write( '34 }' );

		parser.write( '{ long');
		parser.write( 'key:1234 }' );

		parser.write( '{ a:1234 }' );
		//console.log( "4 objects..." );
		parser.write( '{ a:1234 }{ b:34 }{c:1}{d:123}' );
		//console.log( "got 4 objects?" );

		expect(results).to.deep.equal([
			'This is a Test',
			[1234, 1234, 1234],
			[123, 456, 789, 'abc', 'def', 'ghi'],
			true, false, null, undefined, NaN, Infinity,
			1,
			123,
			'1',
			{ a: 1234 },
			{ longkey: 1234 },
			{ a: 1234 },
			{ a: 1234 },
			{ b: 34 },
			{c: 1},
			{d: 123}
		]);

		results = [];
		try {
			
		parser.reset();
}	catch(err ) { console.log("Reset Failed?", err ) };
		parser.write( '1_234 0x55_33_22_11 0x1234 ' );
		expect(results).to.deep.equal([
			1234,
			1429414417,
			4660
		]);

		parser.write( '123');
		parser.write();

		expect( function() {
	
			parser.write( '{a:123');
			parser.write();
		}).to.throw( Error );
		parser.reset();

		parser.write( '{a:"String');
		parser.write( 'split Buffer"}' );

		parser.write( '"String ');
		parser.write( 'coverage');
		parser.write( ' test"' );

		parser.write( '1' );
		parser.write( '2' );
		parser.write( '3' );
		parser.write( '4' );
		parser.write( '5' );
		parser.write( ' ' );

		// this is a test to trigger coverage.
		results = [];
		expect( function() {
			parser.write( '{ this is an error' );
		}). to.throw( Error );

		expect( function() {
			parser.write( '} 0 ' );
		}). to.throw( Error );

		//expect( function() {
		//	parser.write( '} 0 ' );
		//}).to.throw( Error );
		parser.reset( );
		parser.write( '"OK"' );
	});
});

