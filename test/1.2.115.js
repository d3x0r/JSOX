
'use strict';
const JSOX = require( ".." );

describe('Added in 1.2.115', function () {



	it( 'recovers partial strings right', function() {
		const strings = ['Nbt'];
                const expects = strings.map( s=>JSOX.parse(s) );
                for( let s=0; s < strings.length; s++ ) {
                    	if( strings[s] !== expects[s] ) throw new Error ( "Strings Should Match" );
                }
		expect( "A" ).to.equal( "A" );

	} );
        
} );
