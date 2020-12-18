'use strict';
const JSOX = require( ".." );

describe('Added in 1.2.103', function () {



	it( 'handles fromJSOX per field', function() {
        
        	const content = 'O{a:123,b:345,c:[5,6,7]}'
                const processed = [];
		const array = [];
                class O {
                	a = 0;
                        b = 0;
                        c = array;
                        constructor() {
                        	processed.push( "Constructed O" );
                        }
                }
                function fromJSOX( field, val ) {
			if( field ) {
	                	processed.push( [field, JSON.stringify(val)].join() );
				if( field === "c" ) 
					return this.c;
				else
					return val;
			} else {
	                	processed.push( "Final revive" );
				this.c.push(8);
				return this;
			}

                }
                JSOX.fromJSOX( "O", O, fromJSOX );
                const object = JSOX.parse( content );

		//console.log( "Process:\n", processed.join("\n") );
                                
		expect( processed.join("\n") ).to.equal( `Constructed O
a,123
b,345
c,[]
Final revive` );
		expect( object ).to.deep.equal( { a:123,b:345,c:[5,6,7,8] } );

	} );
        
} );
