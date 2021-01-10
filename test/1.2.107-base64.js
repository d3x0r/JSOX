'use strict';

const JSOX = require( ".." );

describe('Added in 1.2.107 - base64', function () {
	it('quotes numeric base64', function() {
			const ab = JSOX.parse( "ab['3abc']" );
			const str = JSOX.stringify( ab );
			expect( str).to.equal( "ab[\"3abc\"]" );

	} );
	it('skips quotes on alpha base64', function() {
			const ab = JSOX.parse( "ab['a3bc']" );
			const str = JSOX.stringify( ab );
			expect( str).to.equal( "ab[a3bc]" );

	} );
} );
