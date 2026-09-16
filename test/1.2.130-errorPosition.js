'use strict';
const JSOX = require( "../lib/jsox.js" );

// Built with fromCharCode so no editor or tool can silently turn an escape into the
// raw character (a raw LS/PS inside a regex literal is a syntax error).
const LS = String.fromCharCode( 0x2028 );
const PS = String.fromCharCode( 0x2029 );
const LINE_BREAK = new RegExp( '\r\n|\r|\n|' + LS + '|' + PS );

// Every error message ends in [line:col].  The error in each case is the first
// closing bracket that does not match the innermost open one (JSOX accepts almost
// any other character as an unquoted string, so a stray bracket is the reliable
// fault).  The expected position is computed from the source text, counting code
// points per column and CR, LF, CRLF, LS and PS as line breaks.  None of the inputs
// put a bracket inside a string or comment.
function strayIndex( src ) {
	const stack = [];
	for( let i = 0; i < src.length; i++ ) {
		const ch = src[i];
		if( ch === '[' || ch === '{' ) stack.push( ch );
		else if( ch === ']' || ch === '}' ) {
			const open = stack.pop();
			if( ( ch === ']' && open !== '[' ) || ( ch === '}' && open !== '{' ) ) return i;
		}
	}
	throw new Error( 'no stray bracket in ' + JSON.stringify( src ) );
}
function position( src ) {
	const lines = src.slice( 0, strayIndex( src ) ).split( LINE_BREAK );
	return `${lines.length}:${[ ...lines[lines.length - 1] ].length + 1}`;
}
function reported( src ) {
	try { JSOX.parse( src ); } catch( e ) {
		const m = /\[(\d+):(\d+)\]$/.exec( e.message );
		return m ? `${m[1]}:${m[2]}` : 'no position in: ' + e.message;
	}
	return 'no error';
}

describe('Added in 1.2.130 - error positions', function () {
	const cases = {
		'plain':                            '[1, }]',
		'after a number':                   '[123 }]',
		'after a number with separators':   '[1_000_000 }]',
		'after a keyword':                  '[true, }]',
		'after a string':                   '["abc", }]',
		'after an unquoted string':         '[abc, }]',
		'after LF':                         '[\n}]',
		'after two LF':                     '[\n\n}]',
		'after CRLF':                       '[\r\n}]',
		'after CR alone':                   '[\r}]',
		'after LS':                         '[' + LS + '}]',
		'after PS':                         '[' + PS + '}]',
		'after a line comment':             '[ // c\n}]',
		'after a hash comment':             '[ # c\n}]',
		'after two line comments':          '[ // a\n// b\n}]',
		'after a one-line block comment':   '[ /* c */ }]',
		'after a two-line block comment':   '[ /* c\n d */ }]',
		'after a three-line block comment': '[ /* c\n d\n e */ }]',
		'after a CRLF block comment':       '[ /* c\r\n d */ }]',
		'after a two-line string':          '["a\nb", }]',
		'after a three-line string':        '["a\nb\nc", }]',
		'after a two-line backtick string': '[`a\nb`, }]',
		'after a CRLF string':              '["a\r\nb", }]',
		'after a backslash-LF continuation': '["a\\\nb", }]',
		'after a backslash-CRLF continuation': '["a\\\r\nb", }]',
		'after a backslash-CR continuation': '["a\\\rb", }]',
		'inside an object after a comment': '{ a: 1, // x\n  b: 2, ] }',
		'nested and indented':              '{\n  a: [\n    1,\n    }\n  ]\n}',
		'after a wide-character string':    '["新年", }]',
		'after an emoji key':               '{ "👍": 1, ] }',
		'after tabs':                       '[\t\t}]',
	};
	for( const [ name, src ] of Object.entries( cases ) ) {
		it( name, function () {
			expect( reported( src ) ).to.equal( position( src ) );
		} );
	}

	it( 'continues counting across streamed writes', function () {
		const parser = JSOX.begin( () => {} );
		parser.write( '[\n 1,\n' );
		let msg = '';
		try { parser.write( '  }' ); } catch( e ) { msg = e.message; }
		expect( msg ).to.match( /\[3:3\]$/ );
	} );
} );
