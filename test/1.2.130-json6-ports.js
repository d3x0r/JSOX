'use strict';
const JSOX = require( "../lib/jsox.js" );

// Ports of JSON6 fixes #62, #64 and #65 (October 2026).
describe('Added in 1.2.130 - ports of JSON6 fixes', function () {

	describe( 'stringify replacer (#62)', function () {
		it( 'passes the raw string to the replacer, not a quoted one', function () {
			const seen = [];
			JSOX.stringify( { name:'old', items:[ 'a"b' ] }, ( k, v ) => { if( typeof v === 'string' ) seen.push( v ); return v; } );
			expect( seen ).to.deep.equal( [ 'a"b', 'old' ] );
		} );
		it( 'quotes a string returned by the replacer so it parses back', function () {
			const text = JSOX.stringify( { name:1, items:[ 2 ] }, ( k, v ) => typeof v === 'number' ? 'ready' : v );
			expect( JSOX.parse( text ) ).to.deep.equal( { name:'ready', items:[ 'ready' ] } );
			expect( JSOX.parse( JSOX.stringify( { a:'x' }, ( k, v ) => typeof v === 'string' ? v + '!' : v ) ) ).to.deep.equal( { a:'x!' } );
		} );
		it( 'still emits converter output as encoded text', function () {
			// a registered toJSOX returns pre-formatted text, which must stay unquoted
			expect( JSOX.stringify( new Date( 0 ) ) ).to.match( /^\d{4}-\d\d-\d\dT/ ); // unquoted date text, local offset
			expect( JSOX.stringify( /a+/ ) ).to.equal( "regex'a+'" );
		} );
	} );

	describe( 'block comment with consecutive asterisks (#64)', function () {
		it( 'closes after repeated asterisks', function () {
			expect( JSOX.parse( '/***/ {a:1}' ) ).to.deep.equal( { a:1 } );
			expect( JSOX.parse( '{a:/** comment ***/1}' ) ).to.deep.equal( { a:1 } );
		} );
		it( 'closes when the asterisks and slash arrive in separate chunks', function () {
			const values = [];
			const parser = JSOX.begin( v => values.push( v ) );
			parser.write( '/**' );
			parser.write( '*' );
			parser.write( '/ {a:1/* units **' );
			parser.write( '*/}' );
			expect( values ).to.deep.equal( [ { a:1 } ] );
		} );
	} );

	describe( 'root string split across writes (#65)', function () {
		it( 'delivers the split string and the value that follows in the same chunk', function () {
			const values = [];
			const parser = JSOX.begin( v => values.push( v ) );
			parser.write( '"hel' );
			parser.write( 'lo" 123 ' );
			expect( values ).to.deep.equal( [ 'hello', 123 ] );
		} );
		it( 'delivers subsequent string and keyword values', function () {
			const values = [];
			const parser = JSOX.begin( v => values.push( v ) );
			parser.write( "'hel" );
			parser.write( "lo' 'world' true " );
			expect( values ).to.deep.equal( [ 'hello', 'world', true ] );
		} );
		it( 'still handles split strings inside arrays and as object keys', function () {
			const values = [];
			const parser = JSOX.begin( v => values.push( v ) );
			parser.write( '["hel' );
			parser.write( 'lo",2] {"na' );
			parser.write( 'me":"hel' );
			parser.write( 'lo"}' );
			expect( values ).to.deep.equal( [ [ 'hello', 2 ], { name:'hello' } ] );
		} );
		it( 'still handles a split tagged string', function () {
			const values = [];
			const parser = JSOX.begin( v => values.push( v ) );
			parser.write( 'regex"a' );
			parser.write( '+" 1 ' );
			expect( values[0] ).to.be.instanceOf( RegExp );
			expect( values[1] ).to.equal( 1 );
		} );
	} );
} );
