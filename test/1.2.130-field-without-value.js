'use strict';
const JSOX = require( "../lib/jsox.js" );

// A field name inside an object that is never followed by ':' used to be stored
// under the key "null" ( '{a}' became {"null":"a"} ).
describe('Added in 1.2.130 - object field name with no value', function () {

	for( const src of [ '{a}', '{"a"}', '{a }', '{a:1,b}', '{a:1,"b"}', '{a:{},b}' ] ) {
		it( `rejects ${JSON.stringify( src )}`, function () {
			expect( () => JSOX.parse( src ) ).to.throw( Error, /field name with no value/ );
		} );
	}

	it( 'still accepts empty objects, trailing commas, and unquoted string values', function () {
		expect( JSOX.parse( '{}' ) ).to.deep.equal( {} );
		expect( JSOX.parse( '{a:1,}' ) ).to.deep.equal( { a: 1 } );
		expect( JSOX.parse( '{a:x}' ) ).to.deep.equal( { a: 'x' } );
		expect( JSOX.parse( '{a:{},b:[]}' ) ).to.deep.equal( { a: {}, b: [] } );
	} );

	it( 'still accepts class-tagged bodies, which supply their own field names', function () {
		expect( JSOX.parse( 'au{n,a} au{1,2}' ) ).to.deep.equal( { n: 1, a: 2 } );
		expect( JSOX.parse( 'v{x,y} {a:v{1,2}}' ) ).to.deep.equal( { a: { x: 1, y: 2 } } );
	} );

	it( 'requires a callback before write() can deliver values', function () {
		const parser = JSOX.begin();
		expect( () => parser.write( '1 ' ) ).to.throw( Error, /Callback function must be passed to begin/ );
	} );
} );
