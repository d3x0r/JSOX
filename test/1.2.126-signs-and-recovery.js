'use strict';
const JSOX = require( ".." );

describe('Added in 1.2.126 - number signs', function () {

	// The sign belongs to the literal.  There is no optional whitespace inside a
	// number -- Number("+ 8") is NaN -- so a detached sign is a sign with no number
	// followed by a second value, which is an expression rather than a JSOX value.
	it( 'takes a leading + attached to its number', function () {
		expect( JSOX.parse( '+8' ) ).to.equal( 8 );
		expect( JSOX.parse( '+.5' ) ).to.equal( 0.5 );
		expect( JSOX.parse( '+Infinity' ) ).to.equal( Infinity );
	} );

	it( 'takes a leading - attached to its number', function () {
		expect( JSOX.parse( '-8' ) ).to.equal( -8 );
		expect( JSOX.parse( '-Infinity' ) ).to.equal( -Infinity );
	} );

	it( 'signs NaN, dropping the sign it cannot represent', function () {
		expect( JSOX.parse( '+NaN' ) ).to.be.NaN;
		expect( JSOX.parse( '-NaN' ) ).to.be.NaN;
	} );

	it( 'rejects a sign detached from its number', function () {
		for( const s of [ '+ 8', '- 8', '+ 1.5', '+ Infinity', '- Infinity' ] )
			expect( function () { JSOX.parse( s ); }, s ).to.throw( Error );
	} );

	// '_' is a digit separator inside a number, but it cannot begin one -- the sign
	// used to be dropped silently and "+_0" came back as the string "_0".
	it( 'rejects a separator or a non-number after a sign', function () {
		for( const s of [ '+_0', '-_3', '+_', '+null', '+true', '--8', '++8', '+-8' ] )
			expect( function () { JSOX.parse( s ); }, s ).to.throw( Error );
	} );

	it( 'still takes a separator inside a number', function () {
		expect( JSOX.parse( '1_000' ) ).to.equal( 1000 );
		expect( JSOX.parse( '+1_0' ) ).to.equal( 10 );
	} );

	it( 'signs values inside containers', function () {
		expect( JSOX.parse( '[1,+2,-3]' ) ).to.deep.equal( [ 1, 2, -3 ] );
		expect( JSOX.parse( '{a:+3,b:-4}' ) ).to.deep.equal( { a:3, b:-4 } );
		expect( function () { JSOX.parse( '[+ 8,1]' ); } ).to.throw( Error );
	} );

	// The date branch of the number scanner used to take '+'/'-' unconditionally,
	// which made the exponent handling below it unreachable -- exponents only worked
	// by falling into the date path, and "123+44" quietly became 12344.
	it( 'keeps exponents working', function () {
		expect( JSOX.parse( '1e+5' ) ).to.equal( 100000 );
		expect( JSOX.parse( '1e-5' ) ).to.equal( 0.00001 );
		expect( JSOX.parse( '1.5e+10' ) ).to.equal( 15000000000 );
	} );

	it( 'keeps ISO dates working, including zone offsets', function () {
		const forms = [ '2011-10-05T14:48:00.000Z'
		              , '2011-10-05T14:48:00+05:00'
		              , '2011-10-05T14:48:00-08:00' ];
		for( const f of forms ) {
			const d = JSOX.parse( f );
			expect( d ).to.be.a( 'date' );
			expect( d.getTime() ).to.equal( Date.parse( f ) );
		}
	} );

	it( 'rejects a sign embedded in a number', function () {
		expect( function () { JSOX.parse( '123+44' ); } ).to.throw( Error );
		expect( function () { JSOX.parse( '123-44' ); } ).to.throw( Error );
	} );

} );

describe('Added in 1.2.126 - partial keyword recovery', function () {

	// A bare word that is a prefix of a keyword reaches the end of input still
	// mid-match, with no following character to trigger the usual recovery.
	it( 'recovers a partial keyword at end of input', function () {
		for( const w of [ 't','tr','tru','f','fa','fal','fals','n','nu','nul'
		                , 'N','Na','I','In','Inf','Infinit','u','un','und','undefine' ] )
			expect( JSOX.parse( w ) ).to.equal( w );
	} );

	// The array branch of ',' turned an unset value into the elided-element default
	// before the partial keyword could be recovered, so [fal,1] became [null,1].
	it( 'recovers a partial keyword ended by a comma in an array', function () {
		expect( JSOX.parse( '[fal,1]' ) ).to.deep.equal( [ 'fal', 1 ] );
		expect( JSOX.parse( '[1,fal]' ) ).to.deep.equal( [ 1, 'fal' ] );
		expect( JSOX.parse( '[fal,tru]' ) ).to.deep.equal( [ 'fal', 'tru' ] );
		expect( JSOX.parse( '[Na,In]' ) ).to.deep.equal( [ 'Na', 'In' ] );
	} );

	it( 'still recovers one ended by a bracket, brace or other character', function () {
		expect( JSOX.parse( '[fal]' ) ).to.deep.equal( [ 'fal' ] );
		expect( JSOX.parse( '{a:fal}' ) ).to.deep.equal( { a:'fal' } );
		expect( JSOX.parse( 'falx' ) ).to.equal( 'falx' );
		expect( JSOX.parse( 'fal ' ) ).to.equal( 'fal' );
	} );

	it( 'refuses to turn a signed token into text', function () {
		// A sign takes the token out of lazy-string territory: `-` is only accepted ahead
		// of a number, Infinity or NaN, so a signed token that cannot finish as one is the
		// same fault as `-123x` -- never a string. A leading `-` does not start an
		// identifier either, so there is no reading under which these are values.
		//
		// sack built strings out of all of them, and inconsistently: `[-Infinit]` kept the
		// sign while `[-Na]` and `[-N]` silently dropped it. jsox threw, but reported it as
		// "Negative outside of quotes, being converted to a string"; both now give the
		// number fault, so `[-Infinityx]` reads exactly like `[-123x]`.
		JSOX.reset();
		for( const s of [ '[-Infinit]', '[-Infinit,1]', '[-Infinit ]', '{a:-Infinit}',
		                  '[-Na]', '[-Na,1]', '[-N]', '[-I]',
		                  '[-Infinityx]', '[-Infinity1]', '[-NaNx]', '-Infinityx' ] )
			expect( function () { JSOX.parse( s ); }, s ).to.throw( Error, /fault while parsing number/ );
	} );

	it( 'still reads a signed keyword that is complete', function () {
		// the values the rule above must not swallow -- the sign is folded into the value
		// and the token simply ends
		JSOX.reset();
		expect( JSOX.parse( '[-Infinity]' )[0] ).to.equal( -Infinity );
		expect( JSOX.parse( '[-Infinity,1]' ) ).to.deep.equal( [ -Infinity, 1 ] );
		expect( JSOX.parse( '[-Infinity ]' )[0] ).to.equal( -Infinity );
		expect( JSOX.parse( '{a:-Infinity}' ).a ).to.equal( -Infinity );
		expect( JSOX.parse( '[-NaN]' )[0] ).to.be.NaN;
		// and an *unsigned* partial keyword is still an ordinary identifier
		expect( JSOX.parse( '[Infinit]' ) ).to.deep.equal( [ 'Infinit' ] );
		expect( JSOX.parse( '[Na]' ) ).to.deep.equal( [ 'Na' ] );
		expect( JSOX.parse( '[Infinityx]' ) ).to.deep.equal( [ 'Infinityx' ] );
	} );

	it( 'leaves whole keywords alone', function () {
		expect( JSOX.parse( 'true' ) ).to.equal( true );
		expect( JSOX.parse( 'false' ) ).to.equal( false );
		expect( JSOX.parse( 'null' ) ).to.equal( null );
		expect( JSOX.parse( 'Infinity' ) ).to.equal( Infinity );
		expect( JSOX.parse( 'undefined' ) ).to.equal( undefined );
		expect( JSOX.parse( '[false,1]' ) ).to.deep.equal( [ false, 1 ] );
	} );

	it( 'assembles a keyword split across writes', function () {
		const out = [];
		const p = JSOX.begin( v => out.push( v ) );
		p.write( '{a:fal' );
		p.write( 'se,b:tru' );
		p.write( 'e}' );
		expect( out ).to.deep.equal( [ { a:false, b:true } ] );
	} );

} );

describe('Added in 1.2.126 - revival errors reach JS', function () {

	// A pending exception raised inside the native callback is not delivered when the
	// callback returns normally; it has to be observed and re-thrown at the boundary.
	// Without that, a bad reference inside a revived type dropped the whole property
	// and reported success.
	it( 'throws for a bad reference inside a revived type', function () {
		JSOX.reset();
		function World() {}
		World.fromString = function ( field, value ) {
			if( field ) return value;
			return this;
		};
		JSOX.addType( "~Wr", World, null, World.fromString );
		expect( function () {
			JSOX.parse( '{op:world,world:~Wr{lines:[{id:0}],names:ref["lines"]}}' );
		} ).to.throw( Error );
		JSOX.reset();
	} );

	it( 'throws for a bad reference without a revived type', function () {
		JSOX.reset();
		expect( function () {
			JSOX.parse( '{op:world,world:{lines:[{id:0}],names:ref["lines"]}}' );
		} ).to.throw( Error );
	} );

	it( 'still resolves a valid back reference', function () {
		JSOX.reset();
		expect( JSOX.parse( '{a:{x:1},b:ref["a"]}' ) ).to.deep.equal( { a:{x:1}, b:{x:1} } );
	} );

} );
