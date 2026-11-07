'use strict';
const JSOX = require( "../lib/jsox.js" );

describe('Added in 1.2.130 - a literal __proto__ key is data, not a prototype', function () {

	// `elements[name] = value` reached the accessor Object.prototype carries for
	// '__proto__' instead of making an own property, so a document could set the
	// prototype of the object it parsed to: the value disappeared from Object.keys(),
	// from JSOX.stringify() and from any schema check, while a plain read of the field
	// still returned it.  JSON.parse() makes an own property of it; so does this now.

	describe( 'the parsed object keeps its own prototype', function () {
		it( 'does not let an object value become the prototype', function () {
			const o = JSOX.parse( '{"__proto__":{"x":1}}' );
			expect( Object.getPrototypeOf( o ) ).to.equal( Object.prototype );
			expect( Object.keys( o ) ).to.deep.equal( [ '__proto__' ] );
			expect( o.__proto__ ).to.deep.equal( { x:1 } );
		} );
		it( 'keeps the field visible to every reader', function () {
			// the reported shape: a validator saw {} while o.isAdmin read true
			const o = JSOX.parse( '{"__proto__":{"isAdmin":true},"user":"bob"}' );
			expect( Object.keys( o ) ).to.deep.equal( [ '__proto__', 'user' ] );
			expect( o.isAdmin ).to.equal( undefined );
			expect( Object.prototype.hasOwnProperty.call( o, '__proto__' ) ).to.equal( true );
		} );
		it( 'does not drop a primitive there', function () {
			// assignment through the setter ignores a non-object outright, so this value
			// used to vanish without a trace
			expect( JSOX.parse( '{"__proto__":5}' ).__proto__ ).to.equal( 5 );
			expect( JSOX.parse( '{"__proto__":"s"}' ).__proto__ ).to.equal( "s" );
			expect( JSOX.parse( '{"__proto__":null}' ).__proto__ ).to.equal( null );
			expect( JSOX.parse( '{"__proto__":true}' ).__proto__ ).to.equal( true );
		} );
		it( 'handles it unquoted and nested, and as an array', function () {
			const n = JSOX.parse( '{a:{__proto__:{y:2}}}' );
			expect( Object.getPrototypeOf( n.a ) ).to.equal( Object.prototype );
			expect( n.a.__proto__ ).to.deep.equal( { y:2 } );
			const arr = JSOX.parse( '{"__proto__":[1,2]}' );
			expect( arr.__proto__ ).to.deep.equal( [ 1, 2 ] );
		} );
		it( 'takes it as a class field too', function () {
			const o = JSOX.parse( 'p{__proto__,b}p{{"x":1},2}' );
			// a class instance has a prototype of its own by design, so what matters
			// here is that the field did not replace it
			expect( Object.prototype.hasOwnProperty.call( o, '__proto__' ) ).to.equal( true );
			expect( Object.getPrototypeOf( o ) ).to.not.equal( o.__proto__ );
			expect( o.__proto__ ).to.deep.equal( { x:1 } );
			expect( o.b ).to.equal( 2 );
		} );
	} );

	describe( 'and it survives a round trip', function () {
		it( 'stringifies the field instead of an empty object', function () {
			const o = JSOX.parse( '{"__proto__":{"x":1},"b":2}' );
			// this used to be '{b:2}' -- the data was simply gone
			expect( JSOX.stringify( o ) ).to.contain( '__proto__' );
			const again = JSOX.parse( JSOX.stringify( o ) );
			expect( again.__proto__ ).to.deep.equal( { x:1 } );
			expect( again.b ).to.equal( 2 );
		} );
		it( 'agrees with JSON.parse on the same document', function () {
			const doc = '{"__proto__":{"x":1},"b":2}';
			expect( JSON.stringify( JSOX.parse( doc ) ) ).to.equal( JSON.stringify( JSON.parse( doc ) ) );
		} );
	} );

	describe( 'ordinary inherited names are untouched', function () {
		// these are plain data properties on Object.prototype, so assignment already
		// shadowed them correctly; only '__proto__' has an accessor, which is why there
		// is no list of names to check here
		it( 'stores constructor, toString and hasOwnProperty as own keys', function () {
			const o = JSOX.parse( '{"constructor":1,"toString":2,"hasOwnProperty":3,"valueOf":4}' );
			expect( Object.keys( o ) ).to.deep.equal( [ 'constructor', 'toString', 'hasOwnProperty', 'valueOf' ] );
			expect( o.constructor ).to.equal( 1 );
			expect( o.toString ).to.equal( 2 );
		} );
		it( 'leaves Object.prototype itself alone', function () {
			JSOX.parse( '{"__proto__":{"polluted":"yes"}}' );
			expect( ( {} ).polluted ).to.equal( undefined );
			expect( Object.prototype.polluted ).to.equal( undefined );
		} );
	} );
} );
