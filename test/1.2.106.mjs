import {JSOX} from "../lib/jsox.mjs";


describe('Added in 1.2.106', function () {



	it( 'spaces around colons?', function() {
		expect( JSOX.parse( '{"a" : "b", "c" : "d" }' ) )
                       .to.deep.equal( {a:"b",c:"d"} );
//		console.log( "Fail:", obj );
        } )
} )
