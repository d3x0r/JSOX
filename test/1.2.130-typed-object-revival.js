'use strict';
const JSOX = require( ".." );

// Registered-class ("typed object") revival, in every position.
//
// These lock down the behaviour a consumer gets from the documented
// `JSOX.addType( name, Class [, to] [, from] )` entry point.  Two faults that
// older builds had are covered here directly, because they were reported from
// a copy of the library old enough to still have them:
//
//   1) a top-level typed object did not survive its own stringify -- `Pt{x:1,y:2}`
//      came back out of stringify and then failed to parse ("excessive commas"),
//      and with four fields the class name itself came back mangled
//      ("Referenced class V has not been defined" for a `V4` tag).  Nested, the
//      same value was emitted in the quoted form `{a:"Pt"{x:1,y:2}}` instead.
//      So: both positions must emit, and both emissions must parse back.
//
//   2) a nested typed object was built as `new Ctor( fields )` -- the whole
//      field bag landed in the first constructor parameter, so a class with a
//      positional constructor got `.x` set to `{x:1,y:2}` and every other field
//      left undefined.  The instance must instead be created empty and have its
//      fields assigned, which is what makes a positional-constructor class like
//      THREE's Vector4 revive with usable methods.
//
// The `from` callback is a per-field reviver, not a one-shot "build the
// instance from these fields" hook -- see the contract tests at the bottom.
// That distinction is the other half of fault 2: a zero-argument `from` that
// returns `new Ctor( this.x, this.y )` is called once per field, and its return
// replaces that field, which reproduces the same symptom on a correct parser.

describe( 'Added in 1.2.130 - typed object (registered class) revival', function () {

	// A plain two-field class.
	class Pt {
		constructor( x, y ) { this.x = x; this.y = y; }
		sum() { return this.x + this.y; }
	}

	// The real-world case: a positional constructor whose methods only work if
	// the fields actually landed on the instance (cf. THREE.Vector4).
	class V4 {
		constructor( x, y, z, w ) { this.x = x; this.y = y; this.z = z; this.w = w; }
		length() { return Math.sqrt( this.x * this.x + this.y * this.y
		                          + this.z * this.z + this.w * this.w ); }
	}

	// ---- no `to`, no `from`: plain field-by-field encoding ------------------
	//
	// This is the whole of what a data-carrying class needs; the converters are
	// only for classes that want a custom payload.

	describe( 'with neither a `to` encoder nor a `from` reviver', function () {

		beforeEach( function () {
			JSOX.reset();
			JSOX.addType( "Pt", Pt );
			JSOX.addType( "V4", V4 );
		} );

		it( 'round-trips a top-level typed object', function () {
			const text = JSOX.stringify( new Pt( 1, 2 ) );
			// the tag is emitted bare at the top level, and must parse as written
			expect( text ).to.equal( 'Pt{x:1,y:2}' );
			const back = JSOX.parse( text );
			expect( back ).to.be.instanceof( Pt );
			expect( back.x ).to.equal( 1 );
			expect( back.y ).to.equal( 2 );
			expect( back.sum() ).to.equal( 3 );
		} );

		it( 'round-trips a nested typed object', function () {
			const text = JSOX.stringify( { a : new Pt( 1, 2 ) } );
			const back = JSOX.parse( text );
			expect( back.a ).to.be.instanceof( Pt );
			expect( back.a.x ).to.equal( 1 );
			expect( back.a.y ).to.equal( 2 );
			expect( back.a.sum() ).to.equal( 3 );
		} );

		it( 'round-trips a typed object in an array', function () {
			const back = JSOX.parse( JSOX.stringify( [ new Pt( 1, 2 ) ] ) );
			expect( back[0] ).to.be.instanceof( Pt );
			expect( back[0].x ).to.equal( 1 );
			expect( back[0].y ).to.equal( 2 );
		} );

		// fault 1's four-field variant: the tag used to come back short a
		// character, so parse complained about a class name nobody wrote.
		it( 'round-trips a four-field tag at the top level without mangling the tag', function () {
			const text = JSOX.stringify( new V4( 1, 2, 3, 4 ) );
			expect( text.slice( 0, 3 ) ).to.equal( 'V4{' );
			const back = JSOX.parse( text );
			expect( back ).to.be.instanceof( V4 );
			expect( back ).to.deep.equal( new V4( 1, 2, 3, 4 ) );
		} );

		// fault 2: a positional constructor must not be handed the field bag.
		it( 'revives a positional-constructor class with its fields on the instance', function () {
			const back = JSOX.parse( JSOX.stringify( { v : new V4( 1, 2, 3, 4 ) } ) );
			expect( back.v ).to.be.instanceof( V4 );
			expect( back.v.x ).to.equal( 1 );
			expect( back.v.y ).to.equal( 2 );
			expect( back.v.z ).to.equal( 3 );
			expect( back.v.w ).to.equal( 4 );
			// the symptom that reported this: the field bag in `.x` made this NaN
			expect( back.v.length() ).to.equal( Math.sqrt( 30 ) );
		} );

		it( 'revives repeated uses of one tag independently', function () {
			const back = JSOX.parse( JSOX.stringify( [ new Pt( 1, 2 ), new Pt( 3, 4 ) ] ) );
			expect( back[0] ).to.be.instanceof( Pt );
			expect( back[1] ).to.be.instanceof( Pt );
			expect( back[0].x ).to.equal( 1 );
			expect( back[1].x ).to.equal( 3 );
		} );

		it( 'revives a typed object nested inside a typed object', function () {
			const outer = new Pt( new Pt( 1, 2 ), 3 );
			const back = JSOX.parse( JSOX.stringify( outer ) );
			expect( back ).to.be.instanceof( Pt );
			expect( back.x ).to.be.instanceof( Pt );
			expect( back.x.y ).to.equal( 2 );
			expect( back.y ).to.equal( 3 );
		} );
	} );

	// ---- an explicit `to` encoder -------------------------------------------
	//
	// `to` is called with the value as `this` and the stringifier as its
	// argument, and returns JSOX text for the tag's payload.  The tag is emitted
	// for it, so a `from` registered for the same name still receives it.

	describe( 'with an explicit `to` encoder', function () {

		beforeEach( function () { JSOX.reset(); } );

		it( 'round-trips an object payload built with the stringifier', function () {
			JSOX.addType( "V4", V4
			            , function ( stringifier ) {
			            	return stringifier.stringify( { x:this.x, y:this.y, z:this.z, w:this.w } );
			            } );
			const text = JSOX.stringify( { v : new V4( 1, 2, 3, 4 ) } );
			const back = JSOX.parse( text );
			expect( back.v ).to.be.instanceof( V4 );
			expect( back.v.length() ).to.equal( Math.sqrt( 30 ) );
		} );

		it( 'round-trips a top-level object payload from a `to` encoder', function () {
			JSOX.addType( "V4", V4
			            , function ( stringifier ) {
			            	return stringifier.stringify( { x:this.x, y:this.y, z:this.z, w:this.w } );
			            } );
			const back = JSOX.parse( JSOX.stringify( new V4( 1, 2, 3, 4 ) ) );
			expect( back ).to.be.instanceof( V4 );
			expect( back.length() ).to.equal( Math.sqrt( 30 ) );
		} );

		it( 'round-trips a string payload through a matching `from`', function () {
			// the typed-string form: `to` emits a quoted payload, and `from` is
			// handed that payload once, with the instance as `this`.
			JSOX.addType( "Pt", Pt
			            , function () { return '"' + this.x + ',' + this.y + '"'; }
			            , function ( field, val ) {
			            	const parts = String( val ).split( ',' );
			            	return new Pt( Number( parts[0] ), Number( parts[1] ) );
			            } );
			const text = JSOX.stringify( { a : new Pt( 1, 2 ) } );
			expect( text ).to.equal( '{a:Pt"1,2"}' );
			const back = JSOX.parse( text );
			expect( back.a ).to.be.instanceof( Pt );
			expect( back.a.x ).to.equal( 1 );
			expect( back.a.y ).to.equal( 2 );
		} );
	} );

	// ---- the `from` reviver contract ----------------------------------------
	//
	// `from(field,val)` is called with the instance as `this`, once per field as
	// it is revived, and finally once with `field === undefined` to settle the
	// object's identity.  Per-field it returns the value to store (or undefined
	// to store nothing, having handled it itself); on the final call it returns
	// `this` or a replacement.
	//
	// These exist because the natural misreading -- a zero-argument callback
	// that builds the instance from `this` -- is called once per field instead,
	// and silently fills each field with a half-built instance.

	describe( 'the `from` reviver contract', function () {

		beforeEach( function () { JSOX.reset(); } );

		it( 'calls `from` once per field and once more to finish', function () {
			const calls = [];
			JSOX.addType( "Pt", Pt, undefined, function ( field, val ) {
				calls.push( [ field, val ] );
				if( field === undefined ) return this;
				return val;
			} );
			const back = JSOX.parse( '{a:Pt{x:1,y:2}}' );
			expect( calls ).to.deep.equal( [ [ 'x', 1 ], [ 'y', 2 ], [ undefined, undefined ] ] );
			expect( back.a ).to.be.instanceof( Pt );
			expect( back.a.x ).to.equal( 1 );
			expect( back.a.y ).to.equal( 2 );
		} );

		it( 'stores the value a per-field `from` returns', function () {
			JSOX.addType( "Pt", Pt, undefined, function ( field, val ) {
				if( field === undefined ) return this;
				return val * 10;
			} );
			const back = JSOX.parse( 'Pt{x:1,y:2}' );
			expect( back.x ).to.equal( 10 );
			expect( back.y ).to.equal( 20 );
		} );

		it( 'lets the final `from` call replace the object', function () {
			JSOX.addType( "Pt", Pt, undefined, function ( field, val ) {
				if( field === undefined ) return { swapped : this.x + this.y };
				return val;
			} );
			expect( JSOX.parse( 'Pt{x:1,y:2}' ) ).to.deep.equal( { swapped : 3 } );
			expect( JSOX.parse( '{a:Pt{x:1,y:2}}' ) ).to.deep.equal( { a : { swapped : 3 } } );
		} );

		// A final call that returns nothing used to leave `undefined` where the
		// object should be, discarding everything parsed; the typed-string path
		// already kept the instance in that case.  Keeping the instance is the
		// only reading that cannot lose data.
		it( 'keeps the instance when the final `from` call returns undefined', function () {
			JSOX.addType( "Pt", Pt, undefined, function ( field, val ) {
				if( field === undefined ) return undefined;
				return val;
			} );
			const top = JSOX.parse( 'Pt{x:1,y:2}' );
			expect( top ).to.be.instanceof( Pt );
			expect( top.x ).to.equal( 1 );

			const nested = JSOX.parse( '{a:Pt{x:1,y:2}}' );
			expect( nested.a ).to.be.instanceof( Pt );
			expect( nested.a.y ).to.equal( 2 );
		} );

		it( 'runs the reviver in array and top-level positions too', function () {
			const seen = [];
			JSOX.addType( "Pt", Pt, undefined, function ( field, val ) {
				if( field === undefined ) { seen.push( 'end' ); return this; }
				return val;
			} );
			JSOX.parse( '[Pt{x:1,y:2},Pt{x:3,y:4}]' );
			expect( seen ).to.deep.equal( [ 'end', 'end' ] );
			seen.length = 0;
			JSOX.parse( 'Pt{x:1,y:2}' );
			expect( seen ).to.deep.equal( [ 'end' ] );
		} );
	} );
} );
