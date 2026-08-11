'use strict';
const JSOX = require( ".." );

// Contracts around class tags:
//
//  A) An unregistered tag must not break a round trip with no reviver registered --
//     that is exactly what tests/data/rawtest.mjs does (parse/stringify/parse/
//     stringify/compare). The tag name itself is intentionally dropped on output:
//     inbound types are not auto-registered as stringifiers, so a leaf consumer
//     without supporting code can't become a schema source for anyone else.
//     What must hold is that the data survives and the output is stable.
//
//  B) A registered tag must call its reviver. This works for the `Tag{...}` form
//     and not yet for the `Tag[...]` form, which sack.JSOX revives in every
//     position (top level, object field, array element).
//
//  C) A reference may point at an object still being parsed, including the one
//     enclosing it. That object's identity is not settled until its final revive,
//     which may return something other than the accumulator values were collected
//     into; the reference must end up holding the final object.
//     `ref[]` (empty path) is the root object.

describe( 'Added in 1.2.126 - class tags and cyclic references', function () {

	// ---- A: unregistered tags round-trip without revivers -------------------

	function roundTrip( text ) {
		JSOX.reset();
		const once  = JSOX.stringify( JSOX.parse( text ) );
		const twice = JSOX.stringify( JSOX.parse( once ) );
		return { once, twice };
	}

	it( 'round-trips an unregistered tagged object with no reviver', function () {
		const { once, twice } = roundTrip( '{x:Tag{a:1,b:2}}' );
		expect( twice ).to.equal( once );
		expect( JSOX.parse( once ) ).to.deep.equal( { x : { a : 1, b : 2 } } );
	} );

	it( 'round-trips an unregistered tagged array with no reviver', function () {
		const { once, twice } = roundTrip( '{x:Tag[1,2,3]}' );
		expect( twice ).to.equal( once );
		expect( JSOX.parse( once ) ).to.deep.equal( { x : [ 1, 2, 3 ] } );
	} );

	it( 'round-trips a punctuation-named unregistered tagged array', function () {
		// the shape flatland emits (~S[...]); must degrade, not throw
		const { once, twice } = roundTrip( '{x:~S[1,2,3]}' );
		expect( twice ).to.equal( once );
		expect( JSOX.parse( once ) ).to.deep.equal( { x : [ 1, 2, 3 ] } );
	} );

	// ---- B: registered tags call their reviver ------------------------------

	class T {
		constructor( src ) { this.data = src ? Array.from( src ) : []; }
	}

	function parseWithT( text ) {
		JSOX.reset();
		let result, called = false;
		const parser = JSOX.begin( o => { result = o; } );
		parser.fromJSOX( "T", T, function ( field, val ) {
			if( field ) return val;
			called = true;
			return new T( this );
		} );
		parser.write( text );
		return { result, called };
	}

	it( 'revives a registered tagged object', function () {
		const { result, called } = parseWithT( 'T{a:1}' );
		expect( called ).to.equal( true );
		expect( result ).to.be.an.instanceof( T );
	} );

	it( 'revives a registered tagged array as an object field', function () {
		const { result, called } = parseWithT( '{x:T[1,2,3]}' );
		expect( called ).to.equal( true );
		expect( result.x ).to.be.an.instanceof( T );
	} );

	it( 'revives a registered tagged array as an array element', function () {
		const { result, called } = parseWithT( '[T[1,2,3]]' );
		expect( called ).to.equal( true );
		expect( result[0] ).to.be.an.instanceof( T );
	} );

	it( 'revives a registered tagged array at top level', function () {
		const { result, called } = parseWithT( 'T[1,2,3]' );
		expect( called ).to.equal( true );
		expect( result ).to.be.an.instanceof( T );
	} );

	// ---- C: references into objects that are still being parsed -------------

	// A's final revive deliberately returns a different object than the one values
	// were accumulated into -- that substitution is the whole point of these tests.
	class A { a = 0; b = null; c = 0; }
	class B { b = 0; c = null; }

	// always returns a NEW object rather than the accumulator, so the tests are
	// actually checking that references end up holding the substituted instance
	function reviveAs( Klass, fields ) {
		return function ( field, val ) {
			if( field ) return val;                       // accumulate
			const out = new Klass();
			if( Array.isArray( this ) )                   // tagged array: positional
				fields.forEach( ( f, i ) => { out[f] = this[i]; } );
			else                                          // tagged object: by name
				Object.assign( out, this );
			return out;
		};
	}

	function parseAB( text ) {
		JSOX.reset();
		let result;
		const parser = JSOX.begin( o => { result = o; } );
		parser.fromJSOX( "A", A, reviveAs( A, [ "a", "b", "c" ] ) );
		parser.fromJSOX( "B", B, reviveAs( B, [ "b", "c" ] ) );
		parser.write( text );
		return result;
	}

	it( 'resolves a ref to the enclosing object (tagged object form)', function () {
		const result = parseAB( 'A{a:1,b:B{b:2,c:ref[]},c:3}' );

		expect( result ).to.be.an.instanceof( A );
		expect( result.a ).to.equal( 1 );
		expect( result.c ).to.equal( 3 );
		expect( result.b ).to.be.an.instanceof( B );
		expect( result.b.b ).to.equal( 2 );

		// must be the revived A, not the accumulator it replaced
		expect( result.b.c ).to.equal( result );
	} );

	it( 'resolves a ref to the enclosing object (tagged array form)', function () {
		const result = parseAB( '{root:A[1,B[2,ref["root"]],3]}' );

		expect( result.root ).to.be.an.instanceof( A );
		expect( result.root.b ).to.be.an.instanceof( B );
		expect( result.root.b.c ).to.equal( result.root );
	} );

	it( 'still resolves a ref to an already-completed sibling', function () {
		// backward reference: target is closed before the ref is read, so this path
		// must keep working untouched.
		const result = parseAB( 'A{a:1,b:B{b:2,c:0},c:ref["b"]}' );

		expect( result.c ).to.equal( result.b );
		expect( result.c ).to.be.an.instanceof( B );
	} );

	it( 'keeps the element that follows a reference in an array', function () {
		// resolving a reference used to leave the "already placed" flag set, so the
		// next element was silently dropped -- shortening the array and throwing off
		// every index a later reference path depended on.
		JSOX.reset();
		const o = JSOX.parse( '{a:1,b:[0,ref["a"],null,2,ref["a"],false]}' );
		expect( o.b.length ).to.equal( 6 );
		expect( o.b ).to.deep.equal( [ 0, 1, null, 2, 1, false ] );
	} );

	it( 'resolves references through nested containers', function () {
		JSOX.reset();
		const o = JSOX.parse( '{ a: { a: {}, b: ref["a","a"], c:{ a:[1,2,ref["a","b"],ref["a","c","a",0]] } } }' );

		expect( o.a.b ).to.equal( o.a.a );          // b -> the {} at a.a
		expect( o.a.c.a[2] ).to.equal( o.a.b );     // through b, already resolved
		expect( o.a.c.a[2] ).to.equal( o.a.a );
		expect( o.a.c.a[3] ).to.equal( 1 );         // back into its own enclosing array
	} );

	// ---- D: a custom toJSOX re-enters the stringifier -----------------------

	it( 'keeps reference paths rooted at the document from a custom toJSOX', function () {
		// A custom toJSOX returns stringifier.stringify(mirror), which re-enters.
		// That nested call used to reset the shared path and fieldMap, so references
		// inside the mirror came out rooted at the mirror -- and worse, the outer
		// walk resumed with every previously recorded path forgotten.
		JSOX.reset();
		class Leaf { constructor( v ) { this.v = v; } }
		class Holder { constructor( a, b ) { this.a = a; this.b = b; } }

		const shared = new Leaf( 1 );
		const doc = { first : shared, holder : new Holder( shared, 2 ), last : shared };

		const s = JSOX.stringifier();
		s.toJSOX( "H", Holder, function ( stringifier ) {
			return stringifier.stringify( { a : this.a, b : this.b } );
		} );
		const text = s.stringify( doc );

		// inside the mirror: must point at where `shared` was emitted in the document
		expect( text ).to.contain( 'ref["first"]' );
		// after the mirror: the outer walk must still know `first` was emitted
		expect( ( text.match( /ref\["first"\]/g ) || [] ).length ).to.equal( 2 );
	} );

	it( 'round-trips shared identity through a custom toJSOX', function () {
		JSOX.reset();
		class Holder { constructor( a ) { this.a = a; } }

		const shared = { v : 1 };
		const doc = { first : shared, holder : new Holder( shared ) };

		const s = JSOX.stringifier();
		s.toJSOX( "H", Holder, function ( stringifier ) {
			return stringifier.stringify( { a : this.a } );
		} );

		const back = JSOX.parse( s.stringify( doc ) );
		expect( back.holder.a ).to.equal( back.first );
	} );

	it( 'resolves a deferred ref a reviver stored on an object of its own', function () {
		// A reviver commonly keeps values on an instance it allocated rather than on
		// the accumulator it was handed (flatland's WallMsg holds a pooled Wall this
		// way). That instance is reachable only from the accumulator, not from the
		// document root -- the root may expose its contents through getters -- so the
		// second pass scans from the accumulator the reviver was called on.
		//
		// Note the limit: a value put in a genuinely private (#) field cannot be
		// substituted by any outside walk. That case needs the reviver to be told,
		// not searched for.
		JSOX.reset();
		class Node { peer = null; }
		class NodeMsg { node = new Node(); }

		let out;
		const p = JSOX.begin( o => { out = o; } );
		p.fromJSOX( "Nd", NodeMsg, function ( field, val ) {
			if( !field ) return this.node;
			if( field === "peer" ) { this.node.peer = val; return undefined; }
			return val;
		} );
		p.write( '{a:Nd{peer:ref[]},b:1}' );

		expect( out.a ).to.be.an.instanceof( Node );
		expect( out.a.peer ).to.equal( out );      // the document root, fully revived
	} );

	it( 'stores a falsy value returned by a field reviver', function () {
		// `undefined` means the reviver handled the field itself; 0, false, null and ""
		// are values it asked to have stored. They used to be dropped, so an id of 0
		// (or any false flag) never reached the object being revived.
		JSOX.reset();
		let out;
		const p = JSOX.begin( o => { out = o; } );
		p.fromJSOX( "Rec", Object, function ( field, val ) {
			if( field ) return val;   // ask for every field to be stored as-is
			return this;
		} );
		p.write( 'Rec{id:0,flag:false,name:"",zero:0.0,nil:null,keep:7}' );

		expect( out.id ).to.equal( 0 );
		expect( out.flag ).to.equal( false );
		expect( out.name ).to.equal( "" );
		expect( out.nil ).to.equal( null );
		expect( out.keep ).to.equal( 7 );
	} );

	// ---- E: field ordering ---------------------------------------------------

	it( 'sorts object fields by default and keeps insertion order with sort off', function () {
		JSOX.reset();
		expect( JSOX.stringify( { zebra:1, alpha:2, middle:3 } ) )
			.to.equal( '{alpha:2,middle:3,zebra:1}' );
		expect( JSOX.stringify( { zebra:1, alpha:2, middle:3 }, { sort:false } ) )
			.to.equal( '{zebra:1,alpha:2,middle:3}' );
	} );

	it( 'keeps class-matched objects normalized even with sort off', function () {
		// the compact form emits values positionally against the class's normalized
		// field list, so unsorted keys there would silently transpose the values
		JSOX.reset();
		const emit = ( sort ) => {
			const s = JSOX.stringifier();
			s.defineClass( "rec", { alpha:0, zebra:0 } );
			s.sort = sort;
			return s.stringify( [ { zebra:1, alpha:2 } ] );
		};
		expect( emit( false ) ).to.equal( emit( true ) );
		expect( JSOX.parse( emit( false ) ) ).to.deep.equal( [ { alpha:2, zebra:1 } ] );
	} );

	it( 'takes an options object in the replacer slot', function () {
		JSOX.reset();
		// { pretty } instead of the (value, null, '\t') dance
		expect( JSOX.stringify( { b:1, a:2 }, { pretty:'\t' } ) )
			.to.equal( JSOX.stringify( { b:1, a:2 }, null, '\t' ) );
		// a real replacer still works in the same slot
		expect( JSOX.stringify( { b:1, a:2 }, [ "a" ] ) ).to.contain( "a" );
	} );

	it( 'takes a per-call quote, and restores the stringifier default after', function () {
		JSOX.reset();
		expect( JSOX.stringify( { a:"x y" }, { quote:"'" } ) ).to.equal( "{a:'x y'}" );
		expect( JSOX.stringify( { a:"x y" }, { quote:"`" } ) ).to.equal( "{a:`x y`}" );
		// default is unchanged for a call that does not ask
		expect( JSOX.stringify( { a:"x y" } ) ).to.equal( '{a:"x y"}' );
		// and a per-call quote does not stick to the stringifier it ran on
		const s = JSOX.stringifier();
		s.stringify( { a:"x y" }, { quote:"'" } );
		expect( s.quote ).to.equal( '"' );
		expect( s.stringify( { a:"x y" } ) ).to.equal( '{a:"x y"}' );
	} );

	it( 'quotes only the delimiter, leaving escape() to cover all three', function () {
		// a foreign quote parses unescaped, so escaping it is conservative, not
		// required -- but escape() cannot know which quote wraps its result.
		JSOX.reset();
		const out = JSOX.stringify( { a:"x'y" }, { quote:"`" } );
		expect( JSOX.parse( out ).a ).to.equal( "x'y" );
	} );

	it( 'exposes sort and quote as properties on a stringifier', function () {
		const s = JSOX.stringifier();
		expect( s.sort ).to.equal( true );
		expect( s.quote ).to.equal( '"' );
		s.quote = "'";
		expect( s.stringify( { a:"x y" } ) ).to.equal( "{a:'x y'}" );
	} );

	it( 'scopes a per-call sort to that call, even nested inside a toJSOX', function () {
		// the idiom for emitting a mirror id-first: nested calls share the stringifier
		// instance, so setting .sort on it would leak to the rest of the document --
		// passing it per call must not.
		JSOX.reset();
		class Thing { constructor( id, b, a ) { this.id = id; this.bbb = b; this.aaa = a; } }
		const s = JSOX.stringifier();
		s.toJSOX( "T", Thing, function ( stringifier ) {
			return stringifier.stringify( { id:this.id, bbb:this.bbb, aaa:this.aaa }
			                            , { sort:false } );
		} );

		const out = s.stringify( { zoo:1, apple:2, thing:new Thing( 7, "B", "A" ) } );
		expect( out ).to.equal( "{apple:2,thing:T{id:7,bbb:B,aaa:A},zoo:1}" );
		expect( s.sort ).to.equal( true );
	} );

	it( 'throws rather than hanging on a reference that cannot resolve', function () {
		// forward reference into a slot that does not exist; must terminate.
		expect( () => parseAB( 'A{a:1,b:B{b:2,c:ref["z","z","z"]},c:3}' ) ).to.throw();
	} );

	it( 'throws on a reference that points at the slot holding it', function () {
		// A reference names something that already exists -- and only objects ever
		// become references, since a primitive is not unique enough to be worth one.
		// So a reference can name an enclosing container (still open, but it exists),
		// and cannot name the slot it is itself about to be stored in: `{a:ref["a"]}`
		// is the same mistake as `const o = { a: o.a }`.
		//
		// The array form always failed this way, because elements are not pushed until
		// the array closes. The object form linked the field when the reference opened,
		// so the path quietly resolved to the reference's own path array and that array
		// came back as the value -- `{a:ref["a"]}` parsed to `{a:['a']}`.
		JSOX.reset();
		expect( () => JSOX.parse( '{a:ref["a"]}' ) ).to.throw();
		expect( () => JSOX.parse( '{a:1,b:ref["b"]}' ) ).to.throw();
		expect( () => JSOX.parse( '{a:{b:ref["a","b"]}}' ) ).to.throw();
		expect( () => JSOX.parse( '[ref[0]]' ) ).to.throw();
		expect( () => JSOX.parse( '[1,ref[1]]' ) ).to.throw();
	} );

	it( 'still allows a reference to an enclosing container', function () {
		// the neighbouring case that must keep working: the enclosing object does
		// exist when the reference is read, it just is not finished yet.
		JSOX.reset();
		const o = JSOX.parse( '{a:ref[]}' );
		expect( o.a ).to.equal( o );
		const p = JSOX.parse( '{a:[1,ref["a"],3]}' );
		expect( p.a[1] ).to.equal( p.a );
		expect( p.a.length ).to.equal( 3 );
	} );

	// ---- F: typed-array payloads --------------------------------------------

	it( 'decodes an empty typed array as zero bytes', function () {
		// `ab[]` used to segfault: the base64 decoder read buf[-1] looking for '='
		// padding, and buf is NULL when there was no payload at all.
		JSOX.reset();
		expect( JSOX.parse( 'ab[]' ).byteLength ).to.equal( 0 );
		expect( JSOX.parse( 'u8[]' ).length ).to.equal( 0 );
		expect( JSOX.parse( '{x:ab[]}' ).x.byteLength ).to.equal( 0 );
	} );

	it( 'rejects an unquoted base64 payload that lexes as a number', function () {
		// A payload is a string token, and a loose string cannot start with a digit --
		// that lexes as a number -- so the stringifier quotes any payload that does.
		// Arriving as a number means the input is not something JSOX emits: `ab[0123]`
		// is already 123 by then, the leading zero (a real base64 digit) destroyed.
		// jsox sized the output from NaN and returned zero bytes; sack decoded the
		// decimal text and invented three.
		JSOX.reset();
		expect( () => JSOX.parse( 'ab[1234]' ) ).to.throw();
		expect( () => JSOX.parse( 'ab[0123]' ) ).to.throw();
		expect( () => JSOX.parse( '{x:ab[1234]}' ) ).to.throw();
		expect( () => JSOX.parse( '[ab[1234]]' ) ).to.throw();
	} );

	it( 'decodes the quoted form the stringifier emits for those', function () {
		JSOX.reset();
		expect( Array.from( new Uint8Array( JSOX.parse( 'ab["1234"]' ) ) ) )
			.to.deep.equal( [ 215, 109, 248 ] );
		expect( Array.from( new Uint8Array( JSOX.parse( 'ab["0123"]' ) ) ) )
			.to.deep.equal( [ 211, 93, 183 ] );
	} );

	it( 'keeps a top-level typed array free of its own payload text', function () {
		// Only objects and arrays get built into. A typed array carries its payload in
		// `contains` too, so a top-level one was walked as if it were a container and
		// the raw token was assigned as property '0' -- which on a real typed array
		// coerced to a number and silently overwrote element 0.
		JSOX.reset();
		expect( Array.from( JSOX.parse( 'u8[$_$_]' ) ) ).to.deep.equal( [ 251, 255, 191 ] );
		expect( Array.from( JSOX.parse( 's8[$_$_]' ) ) ).to.deep.equal( [ -5, -1, -65 ] );
		// the stringifier's own output for Float32Array([1.5,0]); a leading 1.5 is
		// exactly what the stray property destroyed -- it coerced to NaN
		expect( Array.from( JSOX.parse( 'f32[AADAPwAAAAA=]' ) ) ).to.deep.equal( [ 1.5, 0 ] );
		expect( Object.getOwnPropertyNames( JSOX.parse( 'ab[$_$_]' ) ) ).to.deep.equal( [] );
		// and the nested form, which always worked, must still agree
		expect( Array.from( JSOX.parse( '{x:u8[$_$_]}' ).x ) )
			.to.deep.equal( Array.from( JSOX.parse( 'u8[$_$_]' ) ) );
	} );

	it( 'round-trips every byte pattern through stringify', function () {
		JSOX.reset();
		for( let i = 0; i < 300; i++ ) {
			const n = 1 + ( i % 11 );
			const u = new Uint8Array( n );
			for( let k = 0; k < n; k++ ) u[k] = ( i * 37 + k * 101 + 7 ) & 0xff;
			const back = JSOX.parse( JSOX.stringify( u ) );
			expect( Array.from( new Uint8Array( back.buffer || back ) ) )
				.to.deep.equal( Array.from( u ) );
		}
	} );

	it( 'rejects a payload that is not a whole number of elements', function () {
		// `f32[AAAAAAAA]` decodes to 6 bytes and 6 is not a multiple of 4. sack built a
		// 1-element view over the first 4 and dropped the other 2 without a word, which
		// turns damaged input into plausible-looking data; jsox threw, but with the
		// constructor's own message, which never mentions the payload. Anything that
		// emitted an f32 emitted a multiple of 4, so a remainder means damage.
		JSOX.reset();
		expect( () => JSOX.parse( 'f32[AAAAAAAA]' ) ).to.throw();
		expect( () => JSOX.parse( 'f64[AAAAAAAA]' ) ).to.throw();
		expect( () => JSOX.parse( 'u32[AAAAAAAA]' ) ).to.throw();
		expect( () => JSOX.parse( '{x:f32[AAAAAAAA]}' ) ).to.throw();
		expect( () => JSOX.parse( '[f32[AAAAAAAA]]' ) ).to.throw();

		// one-byte elements have no such constraint, and neither does a raw buffer
		expect( JSOX.parse( 'u8[AAAAAAAA]' ).length ).to.equal( 6 );
		expect( JSOX.parse( 'ab[AAAAAAAA]' ).byteLength ).to.equal( 6 );
		expect( JSOX.parse( 'u16[AAAAAAAA]' ).length ).to.equal( 3 );

		// and the well-formed payload still decodes
		expect( Array.from( JSOX.parse( 'f32[AADAPwAAAAA=]' ) ) ).to.deep.equal( [ 1.5, 0 ] );
	} );

	// ---- G: radix literals ---------------------------------------------------

	it( 'parses hex literals containing hex letters', function () {
		// sack's number lexer took only decimal digits after `0x`, so `0x10` parsed and
		// `0xff` faulted on the 'f'. Worse, `0xe` fell into the exponent branch, since
		// 'e' is an exponent marker in decimal but an ordinary digit in hex. The
		// converter had always decoded a-f; only the lexer was missing them.
		JSOX.reset();
		expect( JSOX.parse( '[0x1f]' )[0] ).to.equal( 31 );
		expect( JSOX.parse( '[0X1F]' )[0] ).to.equal( 31 );
		expect( JSOX.parse( '[0xff]' )[0] ).to.equal( 255 );
		expect( JSOX.parse( '[0xe]' )[0] ).to.equal( 14 );
		expect( JSOX.parse( '[0xE]' )[0] ).to.equal( 14 );
		expect( JSOX.parse( '[0x10]' )[0] ).to.equal( 16 );
		expect( JSOX.parse( '[-0x10]' )[0] ).to.equal( -16 );
		expect( JSOX.parse( '[0x1_f]' )[0] ).to.equal( 31 );
	} );

	it( 'rejects a digit that is not legal in the radix written', function () {
		// Both silently produced a value: jsox let a-f through after any radix prefix
		// (`0o1f` reached Number() and came back NaN), and sack's converter stopped at
		// the first bad digit (`0b12` became 1). A typo has to be an error, not a value.
		JSOX.reset();
		expect( () => JSOX.parse( '[0o1f]' ) ).to.throw();
		expect( () => JSOX.parse( '[0o18]' ) ).to.throw();
		expect( () => JSOX.parse( '[0b12]' ) ).to.throw();
		expect( () => JSOX.parse( '[0b19]' ) ).to.throw();
		expect( () => JSOX.parse( '[0xg]' ) ).to.throw();

		// and the legal ones keep working, in either prefix case
		expect( JSOX.parse( '[0b101]' )[0] ).to.equal( 5 );
		expect( JSOX.parse( '[0B101]' )[0] ).to.equal( 5 );
		expect( JSOX.parse( '[0o17]' )[0] ).to.equal( 15 );
		expect( JSOX.parse( '[0O17]' )[0] ).to.equal( 15 );
	} );

	it( 'treats a leading zero as decimal, not octal', function () {
		// matches Number('0123') and post-ES5 parseInt; legacy octal-by-leading-zero is
		// deliberately not implemented, `0o123` is the supported spelling
		JSOX.reset();
		expect( JSOX.parse( '[0123]' )[0] ).to.equal( 123 );
		expect( JSOX.parse( '[08]' )[0] ).to.equal( 8 );
		expect( JSOX.parse( '[0o123]' )[0] ).to.equal( 83 );
	} );

	it( 'does not let a completing sibling overwrite a slot that referenced the parent', function () {
		// sack carried a per-stack-member list of slots that had captured that member,
		// replayed after its revive returned a replacement. It read the wrong list: the
		// object's own member was popped and deleted before the pass ran, so PeekLink
		// returned the ENCLOSING member and wrote the just-revived nested object into
		// slots that had captured the enclosing one. Here `a` referenced `outer`, then
		// sibling `b` finished reviving and landed in `a` -- `outer.a` came out holding
		// the B. Deferred references repoint those slots from the finished document
		// instead, so that earlier mechanism is gone.
		const r = parseAB( '{outer:A{a:ref["outer"],b:B{b:2,c:0},c:3}}' );
		expect( r.outer ).to.be.an.instanceof( A );
		expect( r.outer.a ).to.equal( r.outer );
		expect( r.outer.b ).to.be.an.instanceof( B );
		expect( r.outer.c ).to.equal( 3 );

		// same shape with the nested object read before the reference
		const r2 = parseAB( '{outer:A{a:B{b:2,c:0},b:ref["outer"],c:3}}' );
		expect( r2.outer.b ).to.equal( r2.outer );
		expect( r2.outer.a ).to.be.an.instanceof( B );
	} );

	// ---- H: two values with no separator -------------------------------------

	it( 'rejects adjacent values inside a container', function () {
		// These all parsed, silently and wrongly, in both implementations: the second
		// value overwrote the first rather than erroring. `[8 8]` dropped one, `[1,2 3]`
		// REPLACED the 2 with the 3, and `[true false]` produced the string "false".
		// number-number is not a valid construct and is not going to become one.
		JSOX.reset();
		expect( () => JSOX.parse( '[8 8]' ) ).to.throw();
		expect( () => JSOX.parse( '{a:8 8}' ) ).to.throw();
		expect( () => JSOX.parse( '[1,2 3]' ) ).to.throw();
		expect( () => JSOX.parse( '{a:1,b:2 3}' ) ).to.throw();
		expect( () => JSOX.parse( '[1 2 3]' ) ).to.throw();
		expect( () => JSOX.parse( '{a:1 2}' ) ).to.throw();
		expect( () => JSOX.parse( '[1.5 2.5]' ) ).to.throw();
		expect( () => JSOX.parse( '[0x10 0x20]' ) ).to.throw();
	} );

	it( 'rejects a number touching a container', function () {
		// the other direction: a number can neither name a class nor carry one, so it
		// can never sit against a `{` or `[` the way a class tag does
		JSOX.reset();
		expect( () => JSOX.parse( '[8 {}]' ) ).to.throw();
		expect( () => JSOX.parse( '[8 []]' ) ).to.throw();
		expect( () => JSOX.parse( '[{} 8]' ) ).to.throw();
		expect( () => JSOX.parse( '[[] 8]' ) ).to.throw();
	} );

	it( 'rejects adjacent keyword values', function () {
		// A keyword is not an identifier: it cannot name a class, and nothing can tag it.
		// So `true false` inside a container is two values with nothing between them.
		// It used to come out as the *string* "false" -- the second value replaced the
		// first, and the keyword it replaced was re-read as text on the way past.
		JSOX.reset();
		expect( () => JSOX.parse( '[true false]' ) ).to.throw();
		expect( () => JSOX.parse( '[false true]' ) ).to.throw();
		expect( () => JSOX.parse( '[null null]' ) ).to.throw();
		expect( () => JSOX.parse( '[NaN NaN]' ) ).to.throw();
		expect( () => JSOX.parse( '[undefined null]' ) ).to.throw();
		expect( () => JSOX.parse( '[Infinity 1]' ) ).to.throw();
		expect( () => JSOX.parse( '[1 true]' ) ).to.throw();
		expect( () => JSOX.parse( '[true 1]' ) ).to.throw();
		expect( () => JSOX.parse( '[1,true false]' ) ).to.throw();
		expect( () => JSOX.parse( '{a:true false}' ) ).to.throw();
		expect( () => JSOX.parse( '{a:1,b:true false}' ) ).to.throw();
	} );

	it( 'rejects a keyword touching a container or a string', function () {
		// same rule from the other side: `Tag{...}` / `Tag[...]` / `Tag"..."` need an
		// identifier or quoted string as the tag, and a closed container can no more
		// carry one than a keyword can be one
		JSOX.reset();
		expect( () => JSOX.parse( '[true {}]' ) ).to.throw();
		expect( () => JSOX.parse( '[true{}]' ) ).to.throw();
		expect( () => JSOX.parse( '[true []]' ) ).to.throw();
		expect( () => JSOX.parse( '[true "x"]' ) ).to.throw();
		expect( () => JSOX.parse( '[true"x"]' ) ).to.throw();
		expect( () => JSOX.parse( '[{} true]' ) ).to.throw();
		expect( () => JSOX.parse( '[[] true]' ) ).to.throw();
	} );

	it( 'still lets an unquoted keyword recover into an identifier', function () {
		// with no whitespace the token is still being collected, so `truefalse` is one
		// identifier -- the recovery path the keyword guard must not disturb
		JSOX.reset();
		expect( JSOX.parse( '[truefalse]' ) ).to.deep.equal( [ 'truefalse' ] );
		expect( JSOX.parse( '[true,false]' ) ).to.deep.equal( [ true, false ] );
		expect( JSOX.parse( '[ true , false ]' ) ).to.deep.equal( [ true, false ] );
		expect( JSOX.parse( '{a:true,b:false}' ) ).to.deep.equal( { a : true, b : false } );
	} );

	it( 'still accepts separated values and class tags', function () {
		// the neighbours that must keep working -- the guard keys on the held value being
		// unable to tag or be tagged, precisely so class tags are untouched
		JSOX.reset();
		expect( JSOX.parse( '[8,8]' ) ).to.deep.equal( [ 8, 8 ] );
		expect( JSOX.parse( '[1,2,3]' ) ).to.deep.equal( [ 1, 2, 3 ] );
		expect( JSOX.parse( '[-1,+2,.5]' ) ).to.deep.equal( [ -1, 2, 0.5 ] );
		expect( JSOX.parse( '[[1],[2]]' ) ).to.deep.equal( [ [ 1 ], [ 2 ] ] );
		expect( JSOX.parse( '[{a:1},{b:2}]' ) ).to.deep.equal( [ { a : 1 }, { b : 2 } ] );
		expect( JSOX.parse( '[Tag{a:1}]' ) ).to.deep.equal( [ { a : 1 } ] );
		expect( JSOX.parse( '[Tag[1,2]]' ) ).to.deep.equal( [ [ 1, 2 ] ] );
	} );

	it( 'keeps a sequence of values legal at the root', function () {
		// the root is a stream: `8 8` there is two whole messages, not a run-on, and
		// parse() returns the first. Only a container forbids the adjacency.
		JSOX.reset();
		expect( JSOX.parse( '8 8' ) ).to.equal( 8 );
		expect( JSOX.parse( '{a:1} {b:2}' ) ).to.deep.equal( { a : 1 } );

		const seen = [];
		const p = JSOX.begin( o => { seen.push( o ); } );
		p.write( '8 8 ' );                       // trailing space terminates the second
		expect( seen ).to.deep.equal( [ 8, 8 ] );
	} );

	// ---- an unquoted keyword continued into an identifier --------------------

	it( 'recovers a keyword-prefixed identifier in every context', function () {
		// A completed keyword carries no text -- it is only a value_type -- so a character
		// that continues it has to spell it back out first. jsox appended straight onto
		// the (empty) string in three of the four contexts, keeping the keyword's value
		// and losing the character: `[nullx]` parsed as [null] and `nullx` at the root as
		// null. In an object field value it recovered and then appended the character a
		// second time, so `{a:nullx}` came out as "nullxx". sack was correct throughout.
		JSOX.reset();
		expect( JSOX.parse( '[nullx]' ) ).to.deep.equal( [ 'nullx' ] );
		expect( JSOX.parse( '[truex]' ) ).to.deep.equal( [ 'truex' ] );
		expect( JSOX.parse( '[falsex]' ) ).to.deep.equal( [ 'falsex' ] );
		expect( JSOX.parse( '[undefinedx]' ) ).to.deep.equal( [ 'undefinedx' ] );
		expect( JSOX.parse( '[NaNx]' ) ).to.deep.equal( [ 'NaNx' ] );
		expect( JSOX.parse( '[Infinityx]' ) ).to.deep.equal( [ 'Infinityx' ] );
		expect( JSOX.parse( '[null1]' ) ).to.deep.equal( [ 'null1' ] );   // a digit continues it too
		expect( JSOX.parse( '[nullx,1]' ) ).to.deep.equal( [ 'nullx', 1 ] );
		expect( JSOX.parse( '[[nullx]]' ) ).to.deep.equal( [ [ 'nullx' ] ] );
		expect( JSOX.parse( 'nullx' ) ).to.equal( 'nullx' );              // root
		expect( JSOX.parse( '{a:nullx}' ) ).to.deep.equal( { a : 'nullx' } );        // field value
		expect( JSOX.parse( '{a:nullx,b:2}' ) ).to.deep.equal( { a : 'nullx', b : 2 } );
		expect( JSOX.parse( '{a:{b:nullx}}' ) ).to.deep.equal( { a : { b : 'nullx' } } );
		expect( JSOX.parse( '{nullx:1}' ) ).to.deep.equal( { nullx : 1 } );          // field name
	} );

	it( 'still reads the keywords themselves', function () {
		// the values the recovery must not swallow
		JSOX.reset();
		expect( JSOX.parse( '[null,true,false]' ) ).to.deep.equal( [ null, true, false ] );
		expect( JSOX.parse( '{a:null,b:undefined}' ) ).to.deep.equal( { a : null, b : undefined } );
		expect( JSOX.parse( '[Infinity]' )[0] ).to.equal( Infinity );
		expect( JSOX.parse( '[-Infinity]' )[0] ).to.equal( -Infinity );
		expect( JSOX.parse( '[NaN]' )[0] ).to.be.NaN;
		// partial keywords are identifiers, and were already handled
		expect( JSOX.parse( '[tru]' ) ).to.deep.equal( [ 'tru' ] );
		expect( JSOX.parse( '[fal,1]' ) ).to.deep.equal( [ 'fal', 1 ] );
	} );

	// ---- class definitions and the records that follow them ------------------
	//
	// `author{name,age}` declares a shape; `author{"bob",44}` is then an instance whose
	// values are matched to it positionally. The definition is not itself a value, and
	// each record after it is its own message in the stream.

	function records( text ) {
		JSOX.reset();
		const seen = [];
		const p = JSOX.begin( o => seen.push( o ) );
		p.write( text );
		return seen;
	}

	it( 'reads a positional record against its definition', function () {
		expect( records( 'author{name,age} author{"bob",44} ' ) )
			.to.deep.equal( [ { name : "bob", age : 44 } ] );
		expect( records( 'author{name,age} book{title,year} author{"bob",44} book{"t",2001} ' ) )
			.to.deep.equal( [ { name : "bob", age : 44 }, { title : "t", year : 2001 } ] );
	} );

	it( 'keeps every character of an unquoted value in a record', function () {
		// jsox had no branch for CONTEXT_CLASS_VALUE in the character collector, so a
		// character arriving while a string was already being gathered was discarded --
		// only letters with their own `case` in that switch survived, because those route
		// through recoverIdent, which appends. `author{xyz}` came out as "xy",
		// `author{abcdef}` as "adef", `author{name}` as "nae".
		expect( records( 'idA{a} idA{xyz} ' ) ).to.deep.equal( [ { a : "xyz" } ] );
		expect( records( 'idB{a} idB{abcdef} ' ) ).to.deep.equal( [ { a : "abcdef" } ] );
		expect( records( 'idC{name} idC{name} ' ) ).to.deep.equal( [ { name : "name" } ] );
		expect( records( 'idD{a,b} idD{xyz,pqr} ' ) ).to.deep.equal( [ { a : "xyz", b : "pqr" } ] );
		// and a keyword inside a record still recovers, or stays a keyword
		expect( records( 'idE{a} idE{nullx} ' ) ).to.deep.equal( [ { a : "nullx" } ] );
		expect( records( 'idF{a} idF{true} ' ) ).to.deep.equal( [ { a : true } ] );
	} );

	it( 'rejects a record with more values than the definition has fields', function () {
		// positional values are matched by index, and running off the end of the field
		// list segfaulted sack outright (GetLink returns NULL, and `field->name` followed
		// it) while jsox produced a field literally named "undefined"
		JSOX.reset();
		JSOX.reset();
		expect( () => JSOX.parse( 'ovA{name} ovA{1,2} ' ) ).to.throw();
		JSOX.reset();
		expect( () => JSOX.parse( 'ovB{a,b} ovB{1,2,3} ' ) ).to.throw();
		JSOX.reset();
		expect( () => JSOX.parse( 'ovC{a} ovC{1,2,3} ' ) ).to.throw();
		// the matching counts still work
		expect( records( 'ovD{name} ovD{1} ' ) ).to.deep.equal( [ { name : 1 } ] );
		expect( records( 'ovE{a,b} ovE{1,2} ' ) ).to.deep.equal( [ { a : 1, b : 2 } ] );
	} );

	it( 'delivers every record in a buffer, and a definition as none', function () {
		// sack gated "a value completed" on there being no current_class, which is set
		// while *instantiating* a class as much as while defining one -- so a tagged
		// record at the root never completed as its own message and the next one replaced
		// it: three records in one buffer delivered only the third, and
		// `author{a} author{1} 8` delivered only the 8.
		expect( records( 'mA{a} mA{1} mA{2} mA{3} ' ) )
			.to.deep.equal( [ { a : 1 }, { a : 2 }, { a : 3 } ] );
		expect( records( 'mB{a} mB{1} 8 ' ) ).to.deep.equal( [ { a : 1 }, 8 ] );
		expect( records( '8 mC{a} mC{1} mC{2} ' ) ).to.deep.equal( [ 8, { a : 1 }, { a : 2 } ] );

		// a definition declares a shape and completes nothing; jsox delivered a spurious
		// `null` message for one, since the value type restored on its close was the
		// enclosing context's leftover
		expect( records( 'mD{a} ' ) ).to.deep.equal( [] );
		expect( records( 'mD{a} ', ) ).to.have.lengthOf( 0 );
		// ...which must not swallow a real null
		expect( records( 'null ' ) ).to.deep.equal( [ null ] );
		expect( records( 'null null ' ) ).to.deep.equal( [ null, null ] );

		// parse() returns the first message, as it does for any stream
		JSOX.reset();
		expect( JSOX.parse( 'pA{name,age} pA{"bob",44} pA{"jo",30}' ) )
			.to.deep.equal( { name : "bob", age : 44 } );
	} );

	// ---- string adjacency: a class tag and its payload -----------------------
	//
	// `Tag"payload"` is a valid construct even when nobody registered `Tag`; it just
	// cannot be given any special treatment, so it degrades to its payload. At most two
	// strings may be adjacent -- the tag and the payload -- in any mix of quoted and
	// unquoted. A third has nothing it could be.

	it( 'degrades an unregistered tagged string to its payload', function () {
		JSOX.reset();
		expect( JSOX.parse( 'Tag"x"' ) ).to.equal( 'x' );
		expect( JSOX.parse( '[Tag"x"]' ) ).to.deep.equal( [ 'x' ] );
		expect( JSOX.parse( '{a:Tag"x"}' ) ).to.deep.equal( { a : 'x' } );
		expect( JSOX.parse( '["a" "b"]' ) ).to.deep.equal( [ 'b' ] );   // quoted tag
		expect( JSOX.parse( '[a "b"]' ) ).to.deep.equal( [ 'b' ] );     // unquoted tag
		expect( JSOX.parse( '["a" b]' ) ).to.deep.equal( [ 'b' ] );     // unquoted payload
		expect( JSOX.parse( '[a b]' ) ).to.deep.equal( [ 'b' ] );       // both unquoted
		expect( JSOX.parse( '{a:b c}' ) ).to.deep.equal( { a : 'c' } ); // and in a field value
		// String({}) is "[object Object]", which is exactly this form
		expect( JSOX.parse( '[object Object]' ) ).to.deep.equal( [ 'Object' ] );
	} );

	it( 'rejects a third adjacent string', function () {
		JSOX.reset();
		for( const s of [ '["a" "b" "c"]', '{a:"a" "b" "c"}', '[a b c]', '{a:a b c}',
		                  '[a "b" "c"]', '["a" b c]' ] )
			expect( function () { JSOX.parse( s ); }, s ).to.throw( Error );
	} );

	it( 'revives an unknown tagged object anywhere, including alone', function () {
		// the whole-document form used to throw "Cannot read properties of undefined
		// (reading 'constructor')": the recovery that notices a tag is really a tagged
		// object built its placeholder prototype from `()=>{}`, and an arrow function has
		// no .prototype. Nested and field-value positions take other paths, which hid it.
		JSOX.reset();
		expect( JSOX.parse( 'Tag{a:1}' ) ).to.deep.equal( { a : 1 } );
		expect( JSOX.parse( '[Tag{a:1}]' ) ).to.deep.equal( [ { a : 1 } ] );
		expect( JSOX.parse( '{x:Tag{a:1}}' ) ).to.deep.equal( { x : { a : 1 } } );
		// ...and it is not a plain object: the tag gets a prototype of its own, so methods
		// can be attached to it later
		expect( Object.getPrototypeOf( JSOX.parse( 'Tag{a:1}' ) ) ).to.not.equal( Object.prototype );
	} );

	// ---- a class body is all-named or all-positional --------------------------

	it( 'rejects a class body that mixes named and positional values', function () {
		// Mixing has no reading: the loose values would have to go somewhere -- first?
		// last? into whatever slots the named fields left unclaimed? -- so it fails
		// instead. All three orders used to parse into something arbitrary.
		JSOX.reset();
		expect( () => JSOX.parse( 'mx{n,a} mx{name:1,2}' ) ).to.throw( Error );   // named, then loose
		expect( () => JSOX.parse( 'my{n,a} my{1,age:2}' ) ).to.throw( Error );    // loose, then named
		expect( () => JSOX.parse( 'mz{name,age:2}' ) ).to.throw( Error );         // in the definition itself
	} );

	it( 'still takes an all-named or all-positional body', function () {
		JSOX.reset();
		// all named -- the definition's field list simply is not used
		expect( JSOX.parse( 'na{n,a} na{name:1,age:2}' ) ).to.deep.equal( { name : 1, age : 2 } );
		// all positional -- matched to the definition in order
		expect( JSOX.parse( 'pa{n,a} pa{1,2}' ) ).to.deep.equal( { n : 1, a : 2 } );
		expect( JSOX.parse( 'pb{name,age} pb{"bob",44}' ) ).to.deep.equal( { name : 'bob', age : 44 } );
	} );

} );
