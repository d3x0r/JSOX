'use strict';
require( ".." );
//require( "../lib/require.js" );

describe('Added in 1.2.106 - require(cjs)', function () {
	
	it('allows using require on extension', function () {
		const config = require( "./1.2.106-require.jsox" );
		expect( config ).to.deep.equal( {
			   desc: "configuration file to read",
				date : new Date( "2021-01-02T00:00:00Z" ),
		   value:123}
		 );
	} );
} );
