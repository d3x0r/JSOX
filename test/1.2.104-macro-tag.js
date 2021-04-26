'use strict';
const JSOX = require( ".." );



describe('Added in 1.2.104 Macro Tags', function () {
	it( 'handles macro tags', function() {
                const object = JSOX.parse( "vec{x,y} [vec{0,0}, vec{1,1}]" );
                //console.log( "object is:", object);//[{0,0},{1,1}]
                expect(object).to.deep.equal( [{x:0,y:0},{x:1,y:1}] );

	} );

	it( 'handles macro tags (with space)', function() {
		//console.log( "This is a false success..." );
                expect( function() {
	                const object = JSOX.parse( "vec {x,y} [vec{0,0}, vec{1,1}]" );
                } ).to.throw( Error );
                //console.log( "object is:", object);//[{0,0},{1,1}]
                //expect(object).to.deep.equal( [{x:0,y:0},{x:1,y:1}] );

	} );

	it( 'handles stringifies to macro tags', function() {
        	const objectType = { face:null, suit:null };
                JSOX.defineClass( "card", objectType );

		const str = JSOX.stringify( [{face:0,suit:0},{face:1,suit:1}] ) 
		expect(str).to.equal( "card{face,suit}[card{0,0},card{1,1}]");
		
	} );

	it( 'handles instanced stringifies to macro tags', function() {
		const stringifier = JSOX.stringifier();
        	const objectType = { face:null, suit:null };
                stringifier.defineClass( "card", objectType );

		const str = stringifier.stringify( [{face:0,suit:0},{face:1,suit:1}] ) 
		expect(str).to.equal( "card{face,suit}[card{0,0},card{1,1}]");
	} );



} );
