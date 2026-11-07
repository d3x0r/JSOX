'use strict';
const JSOX = require( "../lib/jsox.js" );

describe('Added in 1.2.130 - truncated input, parser pool and buffer views', function () {

	describe( 'truncated documents', function () {
		// These used to come back as `undefined`, which is indistinguishable from the
		// result of a document that legitimately has no value in it ('', '//').
		it( 'throws for an unclosed array', function () {
			expect( () => JSOX.parse( '[' ) ).to.throw( Error, /Unexpected end of document/ );
			expect( () => JSOX.parse( '[1' ) ).to.throw( Error, /Unexpected end of document/ );
			expect( () => JSOX.parse( '[1,' ) ).to.throw( Error, /Unexpected end of document/ );
		} );
		it( 'throws for an unclosed object', function () {
			expect( () => JSOX.parse( '{' ) ).to.throw( Error, /Unexpected end of document/ );
			expect( () => JSOX.parse( '{a:1' ) ).to.throw( Error, /Unexpected end of document/ );
			expect( () => JSOX.parse( '{a:' ) ).to.throw( Error, /Unexpected end of document/ );
		} );
		it( 'names the innermost container that was left open', function () {
			expect( () => JSOX.parse( '{a:[1' ) ).to.throw( Error, /innermost array/ );
			expect( () => JSOX.parse( '[{a:1' ) ).to.throw( Error, /innermost object/ );
			expect( () => JSOX.parse( '[[1,2]' ) ).to.throw( Error, /1 open container/ );
			expect( () => JSOX.parse( '[[1,2' ) ).to.throw( Error, /2 open containers/ );
		} );
		it( 'throws for a blank document, as JSON.parse does', function () {
			// JSON.parse('') is "Unexpected end of JSON input", and sack.vfs's parser
			// throws here too; undefined was indistinguishable from a parsed 'undefined'.
			expect( () => JSOX.parse( '' ) ).to.throw( Error, /No value in document/ );
			expect( () => JSOX.parse( '   ' ) ).to.throw( Error, /No value in document/ );
			expect( () => JSOX.parse( String.fromCharCode( 9, 10 ) ) ).to.throw( Error, /No value in document/ );
		} );
		it( 'still has no value in a comment-only document', function () {
			// unlike a blank one, this said something -- and '//' at the end of a
			// document is deliberately a warning rather than an error
			expect( JSOX.parse( '//' ) ).to.equal( undefined );
			expect( JSOX.parse( '// hi' ) ).to.equal( undefined );
			expect( JSOX.parse( '/* x */' ) ).to.equal( undefined );
		} );
		it( 'still takes a complete document', function () {
			expect( JSOX.parse( '[1,2]' ) ).to.deep.equal( [ 1, 2 ] );
			expect( JSOX.parse( '{a:{b:1}}' ) ).to.deep.equal( { a:{ b:1 } } );
		} );
	} );

	describe( 'parser pool', function () {
		// parse() takes a parser from a pool indexed by re-entrancy level, and only the
		// "returned a value" exit used to put it back; a parse that threw left the level
		// raised, so every later parse() allocated a new parser and the pool grew without
		// bound as bad input arrived.
		it( 'releases the pooled parser after a failed parse', function () {
			for( let i = 0; i < 50; i++ )
				expect( () => JSOX.parse( '[' ) ).to.throw( Error );
			expect( JSOX.parse( '[1]' ) ).to.deep.equal( [ 1 ] );
		} );
		it( 'still nests, so a reviver can parse', function () {
			const r = JSOX.parse( '{a:"[1,2]"}', ( k, v ) =>
				( k === 'a' )?JSOX.parse( v ):v );
			expect( r ).to.deep.equal( { a:[ 1, 2 ] } );
			expect( JSOX.parse( '[3]' ) ).to.deep.equal( [ 3 ] );
		} );
	} );

	describe( 'typed array views', function () {
		// a view can cover part of its backing buffer; the whole buffer used to be emitted
		it( 'serializes only the bytes a Uint8Array view covers', function () {
			const v = new Uint8Array( [ 10, 20, 30, 40 ] ).subarray( 1, 3 );
			const r = JSOX.parse( JSOX.stringify( v ) );
			expect( r ).to.be.instanceof( Uint8Array );
			expect( Array.from( r ) ).to.deep.equal( [ 20, 30 ] );
		} );
		it( 'honours byteOffset for wider element types', function () {
			const v = new Uint16Array( [ 1, 2, 3, 4 ] ).subarray( 1, 3 );
			expect( Array.from( JSOX.parse( JSOX.stringify( v ) ) ) ).to.deep.equal( [ 2, 3 ] );
			const f = new Float64Array( [ 1.5, 2.5, 3.5 ] ).subarray( 1 );
			expect( Array.from( JSOX.parse( JSOX.stringify( f ) ) ) ).to.deep.equal( [ 2.5, 3.5 ] );
			const i = new Int32Array( new ArrayBuffer( 24 ), 8, 2 );
			i[0] = -7; i[1] = 9;
			expect( Array.from( JSOX.parse( JSOX.stringify( i ) ) ) ).to.deep.equal( [ -7, 9 ] );
		} );
		it( 'still round-trips a whole array and a bare buffer', function () {
			expect( Array.from( JSOX.parse( JSOX.stringify( new Uint8Array( [ 1, 2, 3 ] ) ) ) ) )
				.to.deep.equal( [ 1, 2, 3 ] );
			const ab = JSOX.parse( JSOX.stringify( new Uint8Array( [ 4, 5 ] ).buffer ) );
			expect( Array.from( new Uint8Array( ab ) ) ).to.deep.equal( [ 4, 5 ] );
		} );
	} );

	describe( 'class registry lookup cost', function () {
		// Every definition used to scan the list of definitions already seen, so a
		// document of N class definitions cost O(N^2) -- 565KB took over 30 seconds.
		// Timing is the only way to show this, so the bound is loose on purpose.
		it( 'parses many class definitions in linear time', function () {
			const build = ( n ) => {
				const parts = new Array( n );
				for( let i = 0; i < n; i++ ) parts[i] = 'A' + i + '{f}';
				return parts.join( '' );
			};
			const time = ( doc ) => {
				const t = process.hrtime.bigint();
				JSOX.parse( doc );
				return Number( process.hrtime.bigint() - t ) / 1e6;
			};
			time( build( 2000 ) ); // warm up
			const small = Math.max( time( build( 8000 ) ), 1 );
			const large = time( build( 32000 ) );
			// 4x the input; quadratic would be ~16x, and was measured at ~15x
			expect( large / small ).to.be.below( 8 );
		} );
		it( 'takes many positional values in linear time', function () {
			const build = ( n ) => {
				const fields = new Array( n ), vals = new Array( n );
				for( let i = 0; i < n; i++ ) { fields[i] = 'f' + i; vals[i] = i; }
				return 'A{' + fields.join( ',' ) + '}A{' + vals.join( ',' ) + '}';
			};
			const time = ( doc ) => {
				const t = process.hrtime.bigint();
				const r = JSOX.parse( doc );
				return [ Number( process.hrtime.bigint() - t ) / 1e6, r ];
			};
			time( build( 500 ) ); // warm up
			const small = Math.max( time( build( 2000 ) )[0], 1 );
			const [ large, value ] = time( build( 8000 ) );
			expect( value.f7999 ).to.equal( 7999 );
			expect( large / small ).to.be.below( 8 );
		} );
		it( 'still rejects a class body that mixes named and positional values', function () {
			JSOX.reset();
			expect( () => JSOX.parse( 'mx{n,a} mx{name:1,2}' ) ).to.throw( Error );
			expect( () => JSOX.parse( 'my{n,a} my{1,age:2}' ) ).to.throw( Error );
			expect( () => JSOX.parse( 'mz{name,age:2}' ) ).to.throw( Error );
			JSOX.reset();
			expect( JSOX.parse( 'na{n,a} na{name:1,age:2}' ) ).to.deep.equal( { name:1, age:2 } );
			expect( JSOX.parse( 'pa{n,a} pa{1,2}' ) ).to.deep.equal( { n:1, a:2 } );
		} );
		it( 'still finds a class by prototype and by field tag when serializing', function () {
			const s = JSOX.stringifier();
			class Pt { constructor( x, y ) { this.x = x; this.y = y; } }
			s.defineClass( 'Pt', new Pt( 0, 0 ) );
			const text = s.stringify( [ new Pt( 1, 2 ), new Pt( 3, 4 ) ] );
			expect( text ).to.contain( 'Pt{' );
			expect( text ).to.contain( 'Pt{1,2}' );
			expect( text ).to.contain( 'Pt{3,4}' );
		} );
	} );
} );
