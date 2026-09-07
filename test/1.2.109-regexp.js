'use strict';
const JSOX = require( "../lib/jsox.js" );


describe('Added in 1.2.109 (regexp)', function () {

	it( 'handles stringify', function() {
		// 1.2.129: encoded as source and flags between slashes, so flags survive.
		const obj = /a+/;
		const strObj = JSOX.stringify( obj );
		expect( strObj ).to.equal( "regex'/a+/'" );
	});

	it( 'handles stringify with flags', function() {
		expect( JSOX.stringify( /a+/gi ) ).to.equal( "regex'/a+/gi'" );
	});

	it( 'handles parse', function() {
		const str = "regex'/a+/'";
		const objStr = JSOX.parse( str );
		expect( objStr).to.deep.equal( /a+/ );
	} );

	it( 'handles parse with flags', function() {
		const objStr = JSOX.parse( "regex'/a+/gi'" );
		expect( objStr ).to.be.instanceOf( RegExp );
		expect( objStr.source ).to.equal( "a+" );
		expect( objStr.flags ).to.equal( "gi" );
	} );

	it( 'round trips a pattern containing an escaped slash', function() {
		const obj = /a\/b/m;
		const back = JSOX.parse( JSOX.stringify( obj ) );
		expect( back.source ).to.equal( obj.source );
		expect( back.flags ).to.equal( obj.flags );
	} );

	it( 'still parses the pre-1.2.129 bare-pattern encoding', function() {
		// no surrounding slashes: the whole string is the pattern, no flags.
		const objStr = JSOX.parse( "regex'a+'" );
		expect( objStr ).to.deep.equal( /a+/ );
	} );

} );
