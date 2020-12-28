import {JSOX} from "../lib/jsox.mjs";


describe('Added in 1.0.1007', function () {



	it( 'spaces around colons?', function() {
		//console.log( "Parsed:", JSOX.parse( '{\n\t"a" : "b", "c" : "d" }' ) )
		//console.log( "Parsed:", JSOX.parse( '{\n\t"a" : "b", "c" : "d" }' ) )
		expect( JSOX.parse( '{"a" : "b", "c" : "d" }' ) )
                       .to.deep.equal( {a:"b",c:"d"} );
//		console.log( "Fail:", obj );
        } )
} )
