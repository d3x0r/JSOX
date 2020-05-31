
const JSON6 = require( ".." );
const JSOX = JSON6
const parse = JSOX.parse;

	describe('Carriage return escape', function () {
		it( "drops", function() {
			expect( parse( "{ 'my  \\\r  key':3}" ) ).to.deep.equal( {'my    key':3} );
		});
	});

	describe('Unicode escape', function () {
		it('escapes unicode whitespace', function () {
			expect( parse( "'\\\u2028'" ).length ).to.equal( 0 );
		} );
		it('escapes unicode whitespace', function () {
			expect( parse( "'\\\u2029'" ).length ).to.equal( 0 );
		} );
	} );