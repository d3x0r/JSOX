'use strict';
const JSOX = require( "../lib/jsox.js" );

const parse = JSOX.parse;

// ECMAScript WhiteSpace and LineTerminator characters accepted between tokens.
// VT and FF are new in 1.2.130; the rest are regression coverage.
const WS = {
	'space': ' ', 'tab': '\t', 'LF': '\n', 'CR': '\r',
	'VT': '', 'FF': '', 'ZWNBSP': '﻿',
	'LS': ' ', 'PS': ' ',
};

describe('Added in 1.2.130 - whitespace', function () {
	for( const [ name, ch ] of Object.entries( WS ) ) {
		describe( name, function () {
			it( 'terminates a number', function () {
				expect( parse( '1' + ch ) ).to.equal( 1 );
				expect( parse( '[1' + ch + ',2]' ) ).to.deep.equal( [ 1, 2 ] );
			} );
			it( 'terminates a keyword', function () {
				expect( parse( 'true' + ch ) ).to.equal( true );
				expect( parse( '[null' + ch + ']' ) ).to.deep.equal( [ null ] );
			} );
			it( 'is skipped around structure and field names', function () {
				expect( parse( ch + '[' + ch + '1' + ch + ']' + ch ) ).to.deep.equal( [ 1 ] );
				expect( parse( '{' + ch + 'a' + ch + ':' + ch + 'true' + ch + '}' ) ).to.deep.equal( { a: true } );
			} );
			it( 'is kept literally inside a string', function () {
				expect( parse( '"a' + ch + 'b"' ) ).to.equal( 'a' + ch + 'b' );
			} );
		} );
	}
} );
