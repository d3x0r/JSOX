// jsox.js
// JSOX JavaScript Object eXchange. Inherits human features of comments
// and extended formatting from JSON6; adds macros, big number and date
// support.  See README.md for details.
//
// This file is based off of https://github.com/JSON6/  ./lib/json6.js
// which is based off of https://github.com/d3x0r/sack  ./src/netlib/html5.websocket/json6_parser.c
//
"use strict";

const _DEBUG_LL = false;
const _DEBUG_PARSING = false;
const _DEBUG_STRINGIFY = false;
const _DEBUG_PARSING_STACK = false;
const SUPPORT_LEAD_ZERO_OCTAL = true;

const VALUE_UNDEFINED = -1
const VALUE_UNSET = 0
const VALUE_NULL = 1
const VALUE_TRUE = 2
const VALUE_FALSE = 3
const VALUE_STRING = 4
const VALUE_NUMBER = 5
const VALUE_OBJECT = 6
const VALUE_NEG_NAN = 7
const VALUE_NAN = 8
const VALUE_NEG_INFINITY = 9
const VALUE_INFINITY = 10
const VALUE_DATE = 11  // unused yet
const VALUE_EMPTY = 12 // [,] makes an array with 'empty item'
const VALUE_ARRAY = 13 //
const knownArrayTypeNames = ["ab","u8","cu8","s8","u16","s16","u32","s32","u64","s64","f32","f64"];
const knownArrayTypes = [ArrayBuffer
                        ,Uint8Array,Uint8ClampedArray,Int8Array
                        ,Uint16Array,Int16Array
                        ,Uint32Array,Int32Array
                        ,null,null//,Uint64Array,Int64Array
                        ,Float32Array,Float32Array];
const VALUE_ARRAY_MAX = VALUE_ARRAY + knownArrayTypes.length + 1; // 1 type is not typed; just an array.
const VALUE_BINARY = VALUE_ARRAY_MAX+1 //

const WORD_POS_RESET = 0;
const WORD_POS_TRUE_1 = 1;
const WORD_POS_TRUE_2 = 2;
const WORD_POS_TRUE_3 = 3;
const WORD_POS_FALSE_1 = 5;
const WORD_POS_FALSE_2 = 6;
const WORD_POS_FALSE_3 = 7;
const WORD_POS_FALSE_4 = 8;
const WORD_POS_NULL_1 = 9;
const WORD_POS_NULL_2 = 10;
const WORD_POS_NULL_3 = 11;
const WORD_POS_UNDEFINED_1 = 12;
const WORD_POS_UNDEFINED_2 = 13;
const WORD_POS_UNDEFINED_3 = 14;
const WORD_POS_UNDEFINED_4 = 15;
const WORD_POS_UNDEFINED_5 = 16;
const WORD_POS_UNDEFINED_6 = 17;
const WORD_POS_UNDEFINED_7 = 18;
const WORD_POS_UNDEFINED_8 = 19;
const WORD_POS_NAN_1 = 20;
const WORD_POS_NAN_2 = 21;
const WORD_POS_INFINITY_1 = 22;
const WORD_POS_INFINITY_2 = 23;
const WORD_POS_INFINITY_3 = 24;
const WORD_POS_INFINITY_4 = 25;
const WORD_POS_INFINITY_5 = 26;
const WORD_POS_INFINITY_6 = 27;
const WORD_POS_INFINITY_7 = 28;

const WORD_POS_FIELD = 29;
const WORD_POS_AFTER_FIELD = 30;
const WORD_POS_END = 31;
//const WORD_POS_BINARY = 32;

const CONTEXT_UNKNOWN = 0
const CONTEXT_IN_ARRAY = 1
const CONTEXT_IN_OBJECT = 2
const CONTEXT_OBJECT_FIELD = 3
const CONTEXT_OBJECT_FIELD_VALUE = 4
const CONTEXT_CLASS_FIELD = 5
const CONTEXT_CLASS_VALUE = 6
const CONTEXT_IN_TYPED_ARRAY = 7

const contexts = [];
function getContext() {
	var ctx = contexts.pop();
	if( !ctx )
		ctx = { context : CONTEXT_UNKNOWN
		      , current_class : null
		      , current_class_field : 0
		      , arrayType : -1
		      , elements : null
		      , element_array : null };
	return ctx;
}
function dropContext(ctx) { contexts.push( ctx ) }

const buffers = [];
function getBuffer() { var buf = buffers.pop(); if( !buf ) buf = { buf:null, n:0 }; else buf.n = 0; return buf; }
function dropBuffer(buf) { buffers.push( buf ); }

var JSOX = (typeof exports === 'object' ? exports : {});

JSOX.escape = function(string) {
	var n;
	var m = 0;
	var output = '';
	if( !string ) return string;
	for( n = 0; n < string.length; n++ ) {
		if( ( string[n] == '"' ) || ( string[n] == '\\' ) || ( string[n] == '`' )|| ( string[n] == '\'' )) {
			output += '\\';
		}
		output += string[n];
	}
	return output;
}


JSOX.begin = function( cb, reviver ) {

	const val = { name : null,	  // name of this value (if it's contained in an object)
			value_type: VALUE_UNSET, // value from above indiciating the type of this value
			string : '',   // the string value of this value (strings and number types only)
			contains : null,
		};

	const pos = { line:1, col:1 };
	let	n = 0;
	let     str;
	var	word = WORD_POS_RESET,
		status = true,
		negative = false,
		result = null,
		elements = undefined,
		element_array = [],
		context_stack = {
			first : null,
			last : null,
			saved : null,
			push(node) {
				var recover = this.saved;
				if( recover ) { this.saved = recover.next; recover.node = node; recover.next = null; recover.prior = this.last; }
				else { recover = { node : node, next : null, prior : this.last }; }
				if( !this.last ) this.first = recover;
				this.last = recover;
				this.length++;
			},
			pop() {
				var result = this.last;
				if( !result ) return null;
				if( !(this.last = result.prior ) ) this.first = null;
				result.next = this.saved; this.saved = result;
				this.length--;
				return result.node;
			},
			length : 0,

		},
		classes = [],  // class templates that have been defined.
		current_class = null,  // the current class being defined or being referenced.
		current_class_field = 0,
		arrayType = -1,  // the current class being defined or being referenced.
		parse_context = CONTEXT_UNKNOWN,
		comment = 0,
		fromHex = false,
		decimal = false,
		exponent = false,
		exponent_sign = false,
		exponent_number = false,
		exponent_digit = false,
		inQueue = {
			first : null,
			last : null,
			saved : null,
			push(node) {
				var recover = this.saved;
				if( recover ) { this.saved = recover.next; recover.node = node; recover.next = null; recover.prior = this.last; }
				else { recover = { node : node, next : null, prior : this.last }; }
				if( !this.last ) this.first = recover;
				this.last = recover;
			},
			shift() {
				var result = this.first;
				if( !result ) return null;
				if( !(this.first = result.next ) ) this.last = null;
				result.next = this.saved; this.saved = result;
				return result.node;
			},
			unshift(node) {
				var recover = this.saved;
				if( recover ) { this.saved = recover.next; recover.node = node; recover.next = this.first; recover.prior = null; }
				else { recover = { node : node, next : this.first, prior : null }; }
				if( !this.first ) this.last = recover;
				this.first = recover;
			}
		},
		gatheringStringFirstChar = null,
		gatheringString = false,
		gatheringNumber = false,
		stringEscape = false,
		cr_escaped = false,
		unicodeWide = false,
		stringUnicode = false,
		stringHex = false,
		hex_char = 0,
		hex_char_len = 0,
		stringOct = false,
		completed = false,
		date_format = false,
		isBigInt = false
		;

	return {
		value() {
			var r = result;
			result = undefined;
			return r;
		},
		reset() {
			word = WORD_POS_RESET;
			status = true;
			if( inQueue.last ) inQueue.last.next = inQueue.save;
			inQueue.save = inQueue.first;
			inQueue.first = inQueue.last = null;
			if( context_stack.last ) context_stack.last.next = context_stack.save;
			context_stack.save = inQueue.first;
			context_stack.first = context_stack.last = null;//= [];
			element_array = null;
			elements = undefined;
			parse_context = CONTEXT_UNKNOWN;
			classes = [];
			current_class = null;
			current_class_field = 0;
			val.value_type = VALUE_UNSET;
			val.name = null;
			val.string = '';
			pos.line = 1;
			pos.col = 1;
			negative = false;
			comment = 0;
			completed = false;
			gatheringString = false;
			stringEscape = false;  // string stringEscape intro
			cr_escaped = false;   // carraige return escaped

			//stringUnicode = false;  // reading \u
			//unicodeWide = false;  // reading \u{} in string
			//stringHex = false;  // reading \x in string
			//stringOct = false;  // reading \[0-3]xx in string
		},
		write(msg) {
			var retcode;
			if (typeof msg !== "string") msg = String(msg);
			for( retcode = this._write(msg,false); retcode > 0; retcode = this._write() ) {
				if( result ) {
					if( typeof reviver === 'function' ) (function walk(holder, key) {
						var k, v, value = holder[key];
						if (value && typeof value === 'object') {
							for (k in value) {
								if (Object.prototype.hasOwnProperty.call(value, k)) {
									v = walk(value, k);
									if (v !== undefined) {
										value[k] = v;
									} else {
										delete value[k];
									}
								}
							}
						}
						return reviver.call(holder, key, value);
					}({'': result}, ''));
					cb( result );
					result = undefined;
				}
				if( retcode < 2 )
					break;
			}
		},
		_write(msg,complete_at_end) {
			var cInt;
			var input;
			var buf;
			var output;
			var retval = 0;

			function throwError( leader, c ) {
				throw new Error( `${leader} '${String.fromCodePoint( c )}' unexpected at ${n} (near '${buf.substr(n>4?(n-4):0,n>4?3:(n-1))}[${String.fromCodePoint( c )}]${buf.substr(n, 10)}') [${pos.line}:${pos.col}]`);
			}

			function RESET_VAL()  {
				val.value_type = VALUE_UNSET;
				val.string = '';
			}

			function numberConvert( string ) {
				if( isBigInt ) return BigInt(string);
				if( date_format ) return new Date( string );
				if( string.length > 1 ) {
					if( !fromHex && !decimal && !exponent ) {
						if( string.charCodeAt(0) === 48/*'0'*/ )
							return (negative?-1:1) * Number( "0o" + string );
					}
				}
				return (negative?-1:1) * Number( string );
			}

			function arrayPush() {
				_DEBUG_PARSING && console.log( "PUSH TO ARRAY:", val );
				switch( val.value_type ){
				case VALUE_NUMBER:
					if( isBigInt ) { element_array.push( BigInt(val.string) ); return; }
					if( date_format ) { element_array.push( new Date( val.string ) ); return; }
					element_array.push( SUPPORT_LEAD_ZERO_OCTAL?numberConvert(val.string):((negative?-1:1) * Number( val.string )) );//(negative?-1:1) * Number( val.string ) );
					break;
				case VALUE_STRING:
					element_array.push( val.string );
					break;
				case VALUE_TRUE:
					element_array.push( true );
					break;
				case VALUE_FALSE:
					element_array.push( false );
					break;
				case VALUE_NEG_NAN:
					element_array.push( -NaN );
					break;
				case VALUE_NAN:
					element_array.push( NaN );
					break;
				case VALUE_NEG_INFINITY:
					element_array.push( -Infinity );
					break;
				case VALUE_INFINITY:
					element_array.push( Infinity );
					break;
				case VALUE_NULL:
					element_array.push( null );
					break;
				case VALUE_UNDEFINED:
					element_array.push( undefined );
					break;
				case VALUE_EMPTY:
					element_array.push( undefined );
					delete element_array[element_array.length-1];
					break;
				case VALUE_OBJECT:
					element_array.push( val.contains );
					break;
				case VALUE_ARRAY:
					if( arrayType >= 0 ) {
						var ab = DecodeBase64( val.string );
						if( arrayType === 0 ) element_array.push( ab );
						else element_array.push( new knownArrayTypes[arrayType]( ab ) );
					} else {
						element_array.push( val.contains );
					}
					break;
				default:
					console.log( "Unhandled array push." );
					break;
				}
			}
			function objectPush() {
				switch( val.value_type ){
				case VALUE_NUMBER:
					if( isBigInt ) { elements[val.name] = BigInt(val.string); return; }
					if( date_format ) { elements[val.name] = new Date( val.string ); return; }
					elements[val.name] = SUPPORT_LEAD_ZERO_OCTAL?numberConvert(val.string):((negative?-1:1) * Number( val.string ));//(negative?-1:1) * Number( val.string );
					break;
				case VALUE_STRING:
					elements[val.name] = ( val.string );
					break;
				case VALUE_TRUE:
					elements[val.name] = ( true );
					break;
				case VALUE_FALSE:
					elements[val.name] = ( false );
					break;
				case VALUE_NEG_NAN:
					elements[val.name] = ( -NaN );
					break;
				case VALUE_NAN:
					elements[val.name] = ( NaN );
					break;
				case VALUE_NEG_INFINITY:
					elements[val.name] = ( -Infinity );
					break;
				case VALUE_INFINITY:
					elements[val.name] = ( Infinity );
					break;
				case VALUE_NULL:
					elements[val.name] = ( null );
					break;
				case VALUE_UNDEFINED:
					elements[val.name] = ( undefined );
					break;
				case VALUE_OBJECT:
					elements[val.name] = val.contains;
					break;
				case VALUE_ARRAY:
					if( arrayType >= 0 ) {
						var ab = DecodeBase64( val.string );
						if( arrayType === 0 ) elements[val.name] = ab;
						else elements[val.name] = new knownArrayTypes[arrayType]( ab );
					} else {
						elements[val.name] = val.contains;
					}
					break;
				}
			}
			function recoverIdent(cInt) {
				if( negative ) { valstring += "-"; negative = false; }
				switch( word ) {
				case WORD_POS_END:
					switch( val.value_type ) {
					case VALUE_TRUE:  val.string += "true"; break
					case VALUE_FALSE:  val.string += "false"; break
					case VALUE_NULL:  val.string += "null"; break
					case VALUE_INFINITY:  val.string += "Infinity"; break
					case VALUE_NEG_INFINITY:  val.string += "-Infinity"; break
					case VALUE_NAN:  val.string += "NaN"; break
					case VALUE_NAN:  val.string += "NaN"; break
					case VALUE_UNDEFINED:  val.string += "undefined"; break
					default:
						console.log( "Value of type " + val.value_type + " is not restored..." );
					}
				case WORD_POS_TRUE_1 :  val.string += "t"; break;
				case WORD_POS_TRUE_2 :  val.string += "tr"; break;
				case WORD_POS_TRUE_3 : val.string += "tru"; break;
				case WORD_POS_FALSE_1 : val.string += "f"; break;
				case WORD_POS_FALSE_2 : val.string += "fa"; break;
				case WORD_POS_FALSE_3 : val.string += "fal"; break;
				case WORD_POS_FALSE_4 : val.string += "fals"; break;
				case WORD_POS_NULL_1 : val.string += "n"; break;
				case WORD_POS_NULL_2 : val.string += "nu"; break;
				case WORD_POS_NULL_3 : val.string += "nul"; break;
				case WORD_POS_UNDEFINED_1 : val.string += "u"; break;
				case WORD_POS_UNDEFINED_2 : val.string += "un"; break;
				case WORD_POS_UNDEFINED_3 : val.string += "und"; break;
				case WORD_POS_UNDEFINED_4 : val.string += "unde"; break;
				case WORD_POS_UNDEFINED_5 : val.string += "undef"; break;
				case WORD_POS_UNDEFINED_6 : val.string += "undefi"; break;
				case WORD_POS_UNDEFINED_7 : val.string += "undefin"; break;
				case WORD_POS_UNDEFINED_8 : val.string += "undefine"; break;
				case WORD_POS_NAN_1 : val.string += "Ma"; break;
				case WORD_POS_NAN_2 : val.string += "NaN"; break;
				case WORD_POS_INFINITY_1 : val.string += "I"; break;
				case WORD_POS_INFINITY_2 : val.string += "In"; break;
				case WORD_POS_INFINITY_3 : val.string += "Inf"; break;
				case WORD_POS_INFINITY_4 : val.string += "Infi"; break;
				case WORD_POS_INFINITY_5 : val.string += "Infin"; break;
				case WORD_POS_INFINITY_6 : val.string += "Infini"; break;
				case WORD_POS_INFINITY_7 : val.string += "Infinit"; break;
				case WORD_POS_RESET : break;
				case WORD_POS_FIELD : break;
				default:
					//console.log( "Word context: " + word + " unhandled" );
				}
				word = WORD_POS_FIELD;
				if( cInt == 123/*'{'*/ )
					openObject();
				else if( cInt == 91/*'['*/ )
					openArray();
				else {
					// ignore white space.
					if( cInt == 32/*' '*/ || cInt == 13 || cInt == 10 || cInt == 9 || cInt == 0xFEFF )
						return;

					if( cInt == 44/*','*/ || cInt == 125/*'}'*/ || cInt == 93/*']'*/ || cInt == 58/*':'*/ )
						throwError( "Invalid character near identifier", cInt );
					else
						val.string += str;
				}
			}

			function gatherString( start_c ) {
				let retval = 0;
				while( retval == 0 && ( n < buf.length ) )
				{
					str = buf.charAt(n);
					let cInt = buf.codePointAt(n++);
					if( cInt >= 0x10000 ) { str += buf.charAt(n); n++; }
					//console.log( "gathering....", stringEscape, str, cInt, unicodeWide, stringHex, stringUnicode, hex_char_len );
					pos.col++;
					if( cInt == start_c )//( cInt == 34/*'"'*/ ) || ( cInt == 39/*'\''*/ ) || ( cInt == 96/*'`'*/ ) )
					{
						if( stringEscape ) { val.string += str; stringEscape = false; }
						else {
							retval = -1;
							if( stringOct )
								throwError( "Incomplete Octal sequence", cInt );
							else if( stringHex )
								throwError( "Incomplete hexidecimal sequence", cInt );
							else if( stringUnicode )
								throwError( "Incomplete unicode sequence", cInt );
							else if( unicodeWide )
								throwError( "Incomplete long unicode sequence", cInt );
							retval = 1;
						}
					}

					else if( stringEscape ) {
						if( stringOct ) {
							if( hex_char_len < 3 && cInt >= 48/*'0'*/ && cInt <= 57/*'9'*/ ) {
								hex_char *= 8;
								hex_char += cInt - 0x30;
								hex_char_len++;
								if( hex_char_len === 3 ) {
									val.string += String.fromCodePoint( hex_char );
									stringOct = false;
									stringEscape = false;
									continue;
								}
								continue;
							} else {
								if( hex_char > 255 ) {
									throwError( "(escaped character, parsing octal escape val=%d) fault while parsing", cInt );
									retval = -1;
									break;
								}
								val.string += String.fromCodePoint( hex_char );
								stringOct = false;
								stringEscape = false;
								continue;
							}
						}
						else if( unicodeWide ) {
							if( cInt == 125/*'}'*/ ) {
								val.string += String.fromCodePoint( hex_char );
								unicodeWide = false;
								stringUnicode = false;
								stringEscape = false;
								continue;
							}
							hex_char *= 16;
							if( cInt >= 48/*'0'*/ && cInt <= 57/*'9'*/ )      hex_char += cInt - 0x30;
							else if( cInt >= 65/*'A'*/ && cInt <= 70/*'F'*/ ) hex_char += ( cInt - 65 ) + 10;
							else if( cInt >= 97/*'a'*/ && cInt <= 102/*'f'*/ ) hex_char += ( cInt - 97 ) + 10;
							else {
								throwError( "(escaped character, parsing hex of \\u)", cInt );
								retval = -1;
								unicodeWide = false;
								stringEscape = false;
								continue;
							}
							continue;
						}
						else if( stringHex || stringUnicode ) {
							if( hex_char_len === 0 && cInt === 123/*'{'*/ ) {
								unicodeWide = true;
								continue;
							}
							if( hex_char_len < 2 || ( stringUnicode && hex_char_len < 4 ) ) {
								hex_char *= 16;
								if( cInt >= 48/*'0'*/ && cInt <= 57/*'9'*/ )      hex_char += cInt - 0x30;
								else if( cInt >= 65/*'A'*/ && cInt <= 70/*'F'*/ ) hex_char += ( cInt - 65 ) + 10;
								else if( cInt >= 97/*'a'*/ && cInt <= 102/*'f'*/ ) hex_char += ( cInt - 97 ) + 10;
								else {
									throwError( stringUnicode?"(escaped character, parsing hex of \\u)":"(escaped character, parsing hex of \\x)", cInt );
									retval = -1;
									stringHex = false;
									stringEscape = false;
									continue;
								}
								hex_char_len++;
								if( stringUnicode ) {
									if( hex_char_len == 4 ) {
										val.string += String.fromCodePoint( hex_char );
										stringUnicode = false;
										stringEscape = false;
									}
								}
								else if( hex_char_len == 2 ) {
									val.string += String.fromCodePoint( hex_char );
									stringHex = false;
									stringEscape = false;
								}
								continue;
							}
						}
						switch( cInt )
						{
						case 13/*'\r'*/:
							cr_escaped = true;
							pos.col = 1;
							continue;
						case 10/*'\n'*/:
						case 2028: // LS (Line separator)
						case 2029: // PS (paragraph separate)
							pos.line++;
							break;
						case 116/*'t'*/:
							val.string += '\t';
							break;
						case 98/*'b'*/:
							val.string += '\b';
							break;
						case 110/*'n'*/:
							val.string += '\n';
							break;
						case 114/*'r'*/:
							val.string += '\r';
							break;
						case 102/*'f'*/:
							val.string += '\f';
							break;
						case 48/*'0'*/: case 49/*'1'*/: case 50/*'2'*/: case 51/*'3'*/:
							stringOct = true;
							hex_char = cInt - 48;
							hex_char_len = 1;
							continue;
						case 120/*'x'*/:
							stringHex = true;
							hex_char_len = 0;
							hex_char = 0;
							continue;
						case 117/*'u'*/:
							stringUnicode = true;
							hex_char_len = 0;
							hex_char = 0;
							continue;
						//case 47/*'/'*/:
						//case 92/*'\\'*/:
						//case 34/*'"'*/:
						//case 39/*"'"*/:
						//case 96/*'`'*/:
						default:
							val.string += str;
							break;
						}
						//console.log( "other..." );
						stringEscape = false;
					}
					else if( cInt === 92/*'\\'*/ )
					{
						if( stringEscape ) {
							val.string += '\\';
							stringEscape = false
						}
						else
							stringEscape = true;
					}
					else
					{
						if( cr_escaped ) {
							cr_escaped = false;
							if( cInt == 10/*'\n'*/ ) {
								pos.line++;
								pos.col = 1;
								stringEscape = false;
								continue;
							} else {
								pos.line++;
								pos.col = 1;
							}
							continue;
						}
						val.string += str;
					}
				}
				return retval;
			}


			function collectNumber() {
				let _n;
				while( (_n = n) < buf.length )
				{
					str = buf.charAt(_n);
					let cInt = buf.codePointAt(n++);
					if( cInt >= 0x10000 ) { throwError( "fault while parsing number;", cInt ); str += buf.charAt(n); n++; }
					if( _DEBUG_PARSING ) console.log( "in getting number:", n, cInt, String.fromCodePoint(cInt) );
					if( cInt == 95 /*_*/ )
						continue;
					pos.col++;
					// leading zeros should be forbidden.
					if( cInt >= 48/*'0'*/ && cInt <= 57/*'9'*/ )
					{
						if( exponent ) {
							exponent_digit = true;
						}
						val.string += str;
					} else if( cInt == 45/*'-'*/ || cInt == 43/*'+'*/ ) {
						if( val.string.length == 0 || ( exponent && !exponent_sign && !exponent_digit ) ) {
							val.string += str;
							exponent_sign = true;
						} else {
							val.string += str;
							date_format = true;
						}
					} else if( cInt == 58/*':'*/ && date_format ) {
						val.string += str;
						date_format = true;
					} else if( cInt == 84/*'T'*/ && date_format ) {
						val.string += str;
						date_format = true;
					} else if( cInt == 90/*'Z'*/ && date_format ) {
						val.string += str;
						date_format = true;
					} else if( cInt == 46/*'.'*/ ) {
						if( !decimal && !fromHex && !exponent ) {
							val.string += str;
							decimal = true;
						} else {
							status = false;
							throwError( "fault while parsing number;", cInt );
							break;
						}
					} else if( cInt == 110/*'n'*/ ) {
						isBigInt = true;
						break;
					} else if( cInt == 120/*'x'*/ || cInt == 98/*'b'*/ || cInt == 111/*'o'*/
					        || cInt == 88/*'X'*/ || cInt == 66/*'B'*/ || cInt == 79/*'O'*/ ) {
						// hex conversion.
						if( !fromHex && val.string == '0' ) {
							fromHex = true;
							val.string += str;
						}
						else {
							status = false;
							throwError( "fault while parsing number;", cInt );
							break;
						}
					} else if( ( cInt == 101/*'e'*/ ) || ( cInt == 69/*'E'*/ ) ) {
						if( !exponent ) {
							val.string += str;
							exponent = true;
						} else {
							status = false;
							throwError( "fault while parsing number;", cInt );
							break;
						}
					} else {
						if( cInt == 32/*' '*/ || cInt == 13 || cInt == 10 || cInt == 9
						 || cInt == 0xFEFF || cInt == 44/*','*/ || cInt == 125/*'}'*/ || cInt == 93/*']'*/
						 || cInt == 58/*':'*/ ) {
							n = _n; // put character back in queue to process.
							break;
						}
						else {
							if( complete_at_end ) {
								status = false;
								throwError( "fault while parsing number;", cInt );
							}
							break;
						}
					}
				}
				if( (!complete_at_end) && n == buf.length )
				{
					gatheringNumber = true;
				}
				else
				{
					gatheringNumber = false;
					val.value_type = VALUE_NUMBER;
					if( parse_context == CONTEXT_UNKNOWN ) {
						completed = true;
					}
				}
			}

			function openObject() {
				let nextMode;
				let cls = null;
				let tmpobj = {};
				if( word > WORD_POS_RESET && word < WORD_POS_FIELD )
					recoverIdent();

				if( parse_context == CONTEXT_UNKNOWN ) {
					if( word == WORD_POS_FIELD || word == WORD_POS_AFTER_FIELD ) {
						if( _DEBUG_PARSING ) console.log( "define class:", val.string );
						cls = classes.find( cls=>cls.name===val.string );
						if( !cls ) {
							classes.push( cls = { name : val.string, protoObject:Object.create({}), fields : [] } );
							nextMode = CONTEXT_CLASS_FIELD;
						} else {
							tmpobj = Object.assign( tmpobj, cls.protoObject );
							Object.setPrototypeOf( tmpobj, Object.getPrototypeOf( cls.protoObject ) );
							nextMode = CONTEXT_CLASS_VALUE;
						}
						word = WORD_POS_RESET;
					} else {
						nextMode = CONTEXT_OBJECT_FIELD;
						word = WORD_POS_FIELD;
					}
				} else if( word == WORD_POS_FIELD || word == WORD_POS_AFTER_FIELD || parse_context === CONTEXT_IN_ARRAY || parse_context === CONTEXT_OBJECT_FIELD_VALUE ) {
					if( word != WORD_POS_RESET ) {
						cls = classes.find( cls=>cls.name === val.string );
						if( !cls ) throwError( "Referenced class " + val.string + " has not been defined", cInt );
						tmpobj = Object.assign( tmpobj, cls.protoObject );
						Object.setPrototypeOf( tmpobj, Object.getPrototypeOf( cls.protoObject ) );
						nextMode = CONTEXT_CLASS_VALUE;
						word = WORD_POS_RESET;
					}
					else {
						nextMode = CONTEXT_OBJECT_FIELD;
						word = WORD_POS_RESET;
					}
				} else if( ( parse_context == CONTEXT_OBJECT_FIELD && word == WORD_POS_RESET ) ) {
					throwError( "fault while parsing; getting field name unexpected ", cInt );
					status = false;
					return false;
				} else
					nextMode = CONTEXT_OBJECT_FIELD;
				// common code to push into next context
				{
					let old_context = getContext();
					if( _DEBUG_PARSING )
						console.log( "Begin a new object; previously pushed into elements; but wait until trailing comma or close previously:%d", val.value_type );

					val.value_type = VALUE_OBJECT;
					if( parse_context == CONTEXT_UNKNOWN )
						result = elements = tmpobj;
					//else if( parse_context == CONTEXT_IN_ARRAY )
					//	element_array.push( tmpobj );
					else if( parse_context == CONTEXT_OBJECT_FIELD_VALUE )
						elements[val.name] = tmpobj;

					old_context.context = parse_context;
					old_context.elements = elements;
					old_context.current_class = current_class;
					old_context.current_class_field = current_class_field;
					old_context.arrayType = arrayType;
					old_context.element_array = element_array;
					old_context.name = val.name;
					current_class = cls;
					current_class_field = 0;
					elements = tmpobj;
					if( _DEBUG_PARSING_STACK ) console.log( "push context (open object): ", context_stack.length, " new mode:", nextMode );
					context_stack.push( old_context );
					RESET_VAL();
					parse_context = nextMode;
				}
				return true;
			}

			function openArray() {
				if( word > WORD_POS_RESET && word < WORD_POS_FIELD )
					recoverIdent();

				if( word == WORD_POS_FIELD ) {
					if( _DEBUG_PARSING ) console.log( "recover arrayType:", val.string );
					var typeIndex = knownArrayTypeNames.findIndex( type=>(type === val.string) );
					if( typeIndex >= 0 ) {
						word = WORD_POS_RESET;
						arrayType = typeIndex;
					} else {
						throwError( "Unknown type specified for array:"+val.string, cInt );								
					}
				} else if( parse_context == CONTEXT_OBJECT_FIELD || word == WORD_POS_FIELD || word == WORD_POS_AFTER_FIELD ) {
					throwError( "Fault while parsing; while getting field name unexpected", cInt );
					status = false;
					return false;
				}
				{
					let old_context = getContext();
					if( _DEBUG_PARSING ) console.log( "Begin a new array; previously pushed into elements; but wait until trailing comma or close previously:%d", val.value_type );

					val.value_type = VALUE_ARRAY;
					let tmparr = [];
					if( parse_context == CONTEXT_UNKNOWN )
						result = element_array = tmparr;
					//else if( parse_context == CONTEXT_IN_ARRAY )
					//	element_array.push( tmparr );
					else if( parse_context == CONTEXT_OBJECT_FIELD_VALUE )
						elements[val.name] = tmparr;

					old_context.context = parse_context;
					old_context.elements = elements;
					old_context.current_class = current_class;
					old_context.current_class_field = current_class_field;
					old_context.arrayType = arrayType;
					old_context.element_array = element_array;
					old_context.name = val.name;
					current_class = null;
					current_class_field = 0;
					element_array = tmparr;
					if( _DEBUG_PARSING_STACK ) console.log( "push context (open array): ", context_stack.length );
					context_stack.push( old_context );

					RESET_VAL();
					parse_context = CONTEXT_IN_ARRAY;
				}
				return true;
			}

			if( !status )
				return -1;

			if( msg && msg.length ) {
				input = getBuffer();
				input.buf = msg;
				inQueue.push( input );
			} else {
				if( gatheringNumber ) {
					//console.log( "Force completed.")
					gatheringNumber = false;
					val.value_type = VALUE_NUMBER;
					if( parse_context == CONTEXT_UNKNOWN ) {
						completed = true;
					}
					retval = 1;  // if returning buffers, then obviously there's more in this one.
				}
			}

			while( status && ( input = inQueue.shift() ) ) {
				n = input.n;
				buf = input.buf;
				if( gatheringString ) {
					let string_status = gatherString( gatheringStringFirstChar );
					if( string_status < 0 )
						status = false;
					else if( string_status > 0 )
					{
						gatheringString = false;
						if( status ) val.value_type = VALUE_STRING;
					}
				}
				if( gatheringNumber ) {
					collectNumber();
				}

				while( !completed && status && ( n < buf.length ) )
				{
					str = buf.charAt(n);
					cInt = buf.codePointAt(n++);
					if( cInt >= 0x10000 ) { str += buf.charAt(n); n++; }
					//if( _DEBUG_PARSING ) console.log( "parsing at ", cInt, str );
					if( _DEBUG_LL ) console.log( "processing: ", cInt, str, pos, comment, parse_context, word );
					pos.col++;
					if( comment ) {
						if( comment == 1 ) {
							if( cInt == 42/*'*'*/ ) { comment = 3; continue; }
							if( cInt != 47/*'/'*/ ) {
								throwError( "fault while parsing;", cInt );
								status = false;
							}
							else comment = 2;
							continue;
						}
						if( comment == 2 ) {
							if( cInt == 10/*'\n'*/ ) { comment = 0; continue; }
							else continue;
						}
						if( comment == 3 ){
							if( cInt == 42/*'*'*/ ) { comment = 4; continue; }
							else continue;
						}
						if( comment == 4 ) {
							if( cInt == 47/*'/'*/ ) { comment = 0; continue; }
							else { if( cInt != 42/*'*'*/ ) comment = 3; continue; }
						}
					}
					switch( cInt )
					{
					case 47/*'/'*/:
						if( !comment ) comment = 1;
						break;
					case 123/*'{'*/:
						openObject();
						break;
					case 91/*'['*/:
						openArray();
						break;

					case 58/*':'*/:
						//if(_DEBUG_PARSING) console.log( "colon context:", parse_context );
						if( parse_context == CONTEXT_OBJECT_FIELD )
						{
							if( word != WORD_POS_RESET
								&& word != WORD_POS_FIELD
								&& word != WORD_POS_AFTER_FIELD ) {
								// allow starting a new word
								status = FALSE;
								thorwError( `fault while parsing; unquoted keyword used as object field name (state:${word})`, cInt );
								break;
							}
							word = WORD_POS_RESET;
							val.name = val.string;
							val.string = '';
							parse_context = CONTEXT_OBJECT_FIELD_VALUE;
							val.value_type = VALUE_UNSET;
						}
						else
						{
							if( parse_context == CONTEXT_IN_ARRAY )
								throwError(  "(in array, got colon out of string):parsing fault;", cInt );
							else
								throwError( "(outside any object, got colon out of string):parsing fault;", cInt );
							status = false;
						}
						break;
					case 125/*'}'*/:
						//if(_DEBUG_PARSING) console.log( "close bracket context:", word, parse_context );
						if( word == WORD_POS_END ) {
							// allow starting a new word
							word = WORD_POS_RESET;
						}
						// coming back after pushing an array or sub-object will reset the contxt to FIELD, so an end with a field should still push value.
						if( parse_context == CONTEXT_CLASS_FIELD ) {
							if( current_class ) {
								// allow blank comma at end to not be a field
								if(val.string) { current_class.protoObject[val.string]=undefined; current_class.fields.push( val.string ); }

								RESET_VAL();
								let old_context = context_stack.pop();
								if( _DEBUG_PARSING_STACK ) console.log( "object pop stack (close obj)", context_stack.length, old_context );
								parse_context = CONTEXT_UNKNOWN; // this will restore as IN_ARRAY or OBJECT_FIELD
								word = WORD_POS_RESET;
								elements = old_context.elements;
								element_array = old_context.element_array;
								current_class = old_context.current_class;
								current_class_field = old_context.current_class_field;
								arrayType = old_context.arrayType;
							
								dropContext( old_context );
							} else {
								throwError( "State error; gathering class fields, and lost the class", cInt );
							}
						} else if( ( parse_context == CONTEXT_OBJECT_FIELD ) || ( parse_context == CONTEXT_CLASS_VALUE ) ) {
							if( val.value_type != VALUE_UNSET ) {
								val.name = current_class.fields[current_class_field++];
								if( _DEBUG_PARSING ) console.log( "Closing object; set value name, and push...", current_class_field, val );
								objectPush();
							}
							if( _DEBUG_PARSING ) console.log( "close object; empty object", val, elements );
							val.value_type = VALUE_OBJECT;
							val.contains = elements;
							val.string = "";

							let old_context = context_stack.pop();
							if( _DEBUG_PARSING_STACK ) console.log( "object pop stack (close obj)", context_stack.length, old_context );
							parse_context = old_context.context; // this will restore as IN_ARRAY or OBJECT_FIELD
							elements = old_context.elements;
							element_array = old_context.element_array;
							current_class = old_context.current_class;
							current_class_field = old_context.current_class_field;
							arrayType = old_context.arrayType;
							dropContext( old_context );
							if( parse_context == CONTEXT_UNKNOWN ) {
								completed = true;
							}
						}
						else if( ( parse_context == CONTEXT_OBJECT_FIELD_VALUE ) )
						{
							// first, add the last value
							if( _DEBUG_PARSING ) console.log( "close object; push item '%s' %d", val.name, val.value_type );
							if( val.value_type != VALUE_UNSET ) {
								objectPush();
							}
							val.value_type = VALUE_OBJECT;
							val.contains = elements;

							//let old_context = context_stack.pop();
							var old_context = context_stack.pop();
							if( _DEBUG_PARSING_STACK ) console.log( "object pop stack (close object)", context_stack.length, old_context );
							val.name = old_context.name;
							parse_context = old_context.context; // this will restore as IN_ARRAY or OBJECT_FIELD
							elements = old_context.elements;
							current_class = old_context.current_class;
							current_class_field = old_context.current_class_field;
							arrayType = old_context.arrayType;
							element_array = old_context.element_array;
							dropContext( old_context );
							if( parse_context == CONTEXT_UNKNOWN ) {
								completed = true;
							}
						}
						else
						{
							throwError( "Fault while parsing; unexpected", cInt );
							status = false;
						}
						negative = false;
						break;
					case 93/*']'*/:
						if( word == WORD_POS_END ) {
							word = WORD_POS_RESET;
						}
						if( parse_context == CONTEXT_IN_ARRAY )
						{
							
							if( _DEBUG_PARSING ) console.log( "close array, push last element: %d", val.value_type );
							if( val.value_type != VALUE_UNSET ) {
								arrayPush();
							}
							//RESET_VAL();
							//val.value_type = VALUE_ARRAY;
							val.contains = element_array;
							{
								var old_context = context_stack.pop();
								if( _DEBUG_PARSING_STACK ) console.log( "object pop stack (close array)", context_stack.length );
								val.name = old_context.name;
								parse_context = old_context.context;
								elements = old_context.elements;
								current_class = old_context.current_class;
								current_class_field = old_context.current_class_field;
								arrayType = old_context.arrayType;
								element_array = old_context.element_array;
								dropContext( old_context );
							}
							val.value_type = VALUE_ARRAY;
							if( parse_context == CONTEXT_UNKNOWN ) {
								completed = true;
							}
						}
						else
						{
							throwError( `bad context ${parse_context}; fault while parsing`, cInt );// fault
							status = false;
						}
						negative = false;
						break;
					case 44/*','*/:
						if( word == WORD_POS_END || word == WORD_POS_FIELD ) word = WORD_POS_RESET;  // allow collect new keyword
						if(_DEBUG_PARSING) console.log( "comma context:", parse_context, val );
						if( parse_context == CONTEXT_CLASS_FIELD ) {
							if( current_class ) {
								current_class.protoObject[val.string]=undefined;
								current_class.fields.push( val.string );
								val.string = '';
								word = WORD_POS_FIELD;
							} else {
								throwError( "State error; gathering class fields, and lost the class", cInt );
							}
						} else if( parse_context == CONTEXT_OBJECT_FIELD ) {
							if( current_class ) {
								val.name = current_class.fields[current_class_field++];
								_DEBUG_PARSING && console.log( "should have a completed value at a comma.:", current_class_field, val );
								if( val.value_type != VALUE_UNSET ) {
									if( _DEBUG_PARSING ) console.log( "pushing object field:", val );
									objectPush();
									RESET_VAL();
								}
							} else {
								throwError( "State error; gathering class values, and lost the class", cInt );
							}
						} else if( parse_context == CONTEXT_CLASS_VALUE ) {
							if( current_class ) {
								val.name = current_class.fields[current_class_field++];
								_DEBUG_PARSING && console.log( "should have a completed value at a comma.:", current_class_field, val );
								if( val.value_type != VALUE_UNSET ) {
									objectPush();
									RESET_VAL();
								}
							} else {
								throwError( "State error; gathering class values, and lost the class", cInt );
							}
						} else if( parse_context == CONTEXT_IN_ARRAY ) {
							if( val.value_type == VALUE_UNSET )
								val.value_type = VALUE_EMPTY; // in an array, elements after a comma should init as undefined...

							if( val.value_type != VALUE_UNSET ) {
								if( _DEBUG_PARSING ) console.log( "back in array; push item %d", val.value_type );
								arrayPush();
								RESET_VAL();
							}
							// undefined allows [,,,] to be 4 values and [1,2,3,] to be 4 values with an undefined at end.
						} else if( parse_context == CONTEXT_OBJECT_FIELD_VALUE ) {
							// after an array value, it will have returned to OBJECT_FIELD anyway
							if( _DEBUG_PARSING ) console.log( "comma after field value, push field to object: %s", val.name );
							parse_context = CONTEXT_OBJECT_FIELD;
							if( val.value_type != VALUE_UNSET ) {
								objectPush();
								RESET_VAL();
							}
						} else {
							status = false;
							throwError( "bad context; excessive commas while parsing;", cInt );// fault
						}
						negative = false;
						break;

					default:
						if( ( parse_context == CONTEXT_UNKNOWN )
						  || ( parse_context == CONTEXT_OBJECT_FIELD_VALUE && word == WORD_POS_FIELD )
						  || ( parse_context == CONTEXT_OBJECT_FIELD )
						  || ( parse_context == CONTEXT_CLASS_FIELD ) ) {
							switch( cInt )
							{
							case 96://'`':
							case 34://'"':
							case 39://'\'':
								if( word == WORD_POS_RESET || word == WORD_POS_FIELD ) {
									let string_status = gatherString(cInt );
									if(_DEBUG_PARSING) console.log( "string gather for object field name :", val.string, string_status );
									if( string_status ) {
										val.value_type = VALUE_STRING;
									} else {
										gatheringStringFirstChar = cInt;
										gatheringString = true;
									}
								} else {
									throwError( "fault while parsing; quote not at start of field name", cInt );
								}

								break;
							case 10://'\n':
								pos.line++;
								pos.col = 1;
								// fall through to normal space handling - just updated line/col position
							case 13://'\r':
							case 32://' ':
							case 9://'\t':
							case 0xFEFF: // ZWNBS is WS though
								if( _DEBUG_PARSING ) console.log( "THIS SPACE", word, parse_context, val );
								if( word === WORD_POS_END ) { // allow collect new keyword
									word = WORD_POS_RESET;
									if( parse_context === CONTEXT_UNKNOWN ) {
										completed = true;
									}
									break;
								}
								if( word === WORD_POS_RESET || word === WORD_POS_AFTER_FIELD )  // ignore leading and trailing whitepsace
									break;
								else if( word === WORD_POS_FIELD ) {
									if( val.string.length )
										word = WORD_POS_AFTER_FIELD;
								}
								else {
									status = false;
									throwError( "fault while parsing; whitepsace unexpected", cInt );
								}
								// skip whitespace
								break;
							default:
								if( word == WORD_POS_RESET && ( ( cInt >= 48/*'0'*/ && cInt <= 57/*'9'*/ ) || ( cInt == 43/*'+'*/ ) || ( cInt == 46/*'.'*/ ) || ( cInt == 45/*'-'*/ ) ) ) {
									fromHex = false;
									exponent = false;
									date_format = false;
									isBigInt = false;
								        
									exponent_sign = false;
									exponent_digit = false;
									decimal = false;
									val.string = str;
									input.n = n;
									collectNumber();
									break;
								}

								if( word === WORD_POS_AFTER_FIELD ) {
									status = false;
									throwError( "fault while parsing; character unexpected", cInt );
								}
								if( word === WORD_POS_RESET ) {
									word = WORD_POS_FIELD;
									if( _DEBUG_PARSING ) console.log( "START IDENTIFER" );

								}
								val.string += str;
								break; // default
							}

						}
						else switch( cInt )
						{
						case 96://'`':
						case 34://'"':
						case 39://'\'':
						{
							let string_status = gatherString( cInt );
							if(_DEBUG_PARSING) console.log( "string gather for object field value :", val.string, string_status, completed, input.n, buf.length );
							if( string_status ) {
								val.value_type = VALUE_STRING;
								word = WORD_POS_END;
							} else {
								gatheringStringFirstChar = cInt;
								gatheringString = true;
							}
							break;
						}
						case 10://'\n':
							pos.line++;
							pos.col = 1;
						case 32://' ':
						case 9://'\t':
						case 13://'\r':
						case 0xFEFF://'\uFEFF':
							if( word == WORD_POS_END ) {
								word = WORD_POS_RESET;
								if( parse_context == CONTEXT_UNKNOWN ) {
									completed = true;
								}
								break;
							}
							if( word == WORD_POS_RESET || ( word == WORD_POS_AFTER_FIELD ))
								break;
							else if( word == WORD_POS_FIELD ) {
								if( val.string.length )
									word = WORD_POS_AFTER_FIELD;
							}
							else {
								status = false;
								throwError( "fault parsing whitespace", cInt );
							}
							break;
					//----------------------------------------------------------
					//  catch characters for true/false/null/undefined which are values outside of quotes
						case 116://'t':
							if( word == WORD_POS_RESET ) word = WORD_POS_TRUE_1;
							else if( word == WORD_POS_INFINITY_6 ) word = WORD_POS_INFINITY_7;
							else { recoverIdent(cInt); }// fault
							break;
						case 114://'r':
							if( word == WORD_POS_TRUE_1 ) word = WORD_POS_TRUE_2;
							else { recoverIdent(cInt); }// fault
							break;
						case 117://'u':
							if( word == WORD_POS_TRUE_2 ) word = WORD_POS_TRUE_3;
							else if( word == WORD_POS_NULL_1 ) word = WORD_POS_NULL_2;
							else if( word == WORD_POS_RESET ) word = WORD_POS_UNDEFINED_1;
							else { recoverIdent(cInt); }// fault
							break;
						case 101://'e':
							if( word == WORD_POS_TRUE_3 ) {
								val.value_type = VALUE_TRUE;
								word = WORD_POS_END;
							} else if( word == WORD_POS_FALSE_4 ) {
								val.value_type = VALUE_FALSE;
								word = WORD_POS_END;
							} else if( word == WORD_POS_UNDEFINED_3 ) word = WORD_POS_UNDEFINED_4;
							else if( word == WORD_POS_UNDEFINED_7 ) word = WORD_POS_UNDEFINED_8;
							else { recoverIdent(cInt); }// fault
							break;
						case 110://'n':
							if( word == WORD_POS_RESET ) word = WORD_POS_NULL_1;
							else if( word == WORD_POS_UNDEFINED_1 ) word = WORD_POS_UNDEFINED_2;
							else if( word == WORD_POS_UNDEFINED_6 ) word = WORD_POS_UNDEFINED_7;
							else if( word == WORD_POS_INFINITY_1 ) word = WORD_POS_INFINITY_2;
							else if( word == WORD_POS_INFINITY_4 ) word = WORD_POS_INFINITY_5;
							else { recoverIdent(cInt); }// fault
							break;
						case 100://'d':
							if( word == WORD_POS_UNDEFINED_2 ) word = WORD_POS_UNDEFINED_3;
							else if( word == WORD_POS_UNDEFINED_8 ) { val.value_type=VALUE_UNDEFINED; word = WORD_POS_END; }
							else { recoverIdent(cInt); }// fault
							break;
						case 105://'i':
							if( word == WORD_POS_UNDEFINED_5 ) word = WORD_POS_UNDEFINED_6;
							else if( word == WORD_POS_INFINITY_3 ) word = WORD_POS_INFINITY_4;
							else if( word == WORD_POS_INFINITY_5 ) word = WORD_POS_INFINITY_6;
							else { recoverIdent(cInt); }// fault
							break;
						case 108://'l':
							if( word == WORD_POS_NULL_2 ) word = WORD_POS_NULL_3;
							else if( word == WORD_POS_NULL_3 ) {
								val.value_type = VALUE_NULL;
								word = WORD_POS_END;
							} else if( word == WORD_POS_FALSE_2 ) word = WORD_POS_FALSE_3;
							else { recoverIdent(cInt); }// fault
							break;
						case 102://'f':
							if( word == WORD_POS_RESET ) word = WORD_POS_FALSE_1;
							else if( word == WORD_POS_UNDEFINED_4 ) word = WORD_POS_UNDEFINED_5;
							else if( word == WORD_POS_INFINITY_2 ) word = WORD_POS_INFINITY_3;
							else { recoverIdent(cInt); }// fault
							break;
						case 97://'a':
							if( word == WORD_POS_FALSE_1 ) word = WORD_POS_FALSE_2;
							else if( word == WORD_POS_NAN_1 ) word = WORD_POS_NAN_2;
							else { recoverIdent(cInt); }// fault
							break;
						case 115://'s':
							if( word == WORD_POS_FALSE_3 ) word = WORD_POS_FALSE_4;
							else { recoverIdent(cInt); }// fault
							break;
						case 73://'I':
							if( word == WORD_POS_RESET ) word = WORD_POS_INFINITY_1;
							else { recoverIdent(cInt); }// fault
							break;
						case 78://'N':
							if( word == WORD_POS_RESET ) word = WORD_POS_NAN_1;
							else if( word == WORD_POS_NAN_2 ) { val.value_type = negative ? VALUE_NEG_NAN : VALUE_NAN; word = WORD_POS_END; }
							else { recoverIdent(cInt); }// fault
							break;
						case 121://'y':
							if( word == WORD_POS_INFINITY_7 ) { val.value_type = negative ? VALUE_NEG_INFINITY : VALUE_INFINITY; word = WORD_POS_END; }
							else { recoverIdent(cInt); }// fault
							break;
						case 45://'-':
							if( word == WORD_POS_RESET ) negative = !negative;
							else { recoverIdent(cInt); }// fault
							break;
					//
					//----------------------------------------------------------
						default:
							if( word == WORD_POS_RESET && ( ( cInt >= 48/*'0'*/ && cInt <= 57/*'9'*/ ) || ( cInt == 43/*'+'*/ ) || ( cInt == 46/*'.'*/ ) || ( cInt == 45/*'-'*/ ) ) )
							{
								fromHex = false;
								exponent = false;
								date_format = false;
								isBigInt = false;

								exponent_sign = false;
								exponent_digit = false;
								decimal = false;
								val.string = str;
								input.n = n;
								collectNumber();
							}
							else
							{
								recoverIdent(cInt);
							}
							break; // default
						}
						break; // default of high level switch
					}
					if( completed ) {
						if( word == WORD_POS_END ) {
							word = WORD_POS_RESET;
						}
						break;
					}
				}

				if( n == buf.length ) {
					dropBuffer( input );
					if( gatheringString || gatheringNumber || parse_context == CONTEXT_OBJECT_FIELD ) {
						retval = 0;
					}
					else {
						if( parse_context == CONTEXT_UNKNOWN && ( val.value_type != VALUE_UNSET || result ) ) {
							completed = true;
							retval = 1;
						}
					}
				}
				else {
					// put these back into the stack.
					input.n = n;
					inQueue.unshift( input );
					retval = 2;  // if returning buffers, then obviously there's more in this one.
				}
				if( completed )
					break;
			}

			if( !status ) return -1;
			if( completed && val.value_type != VALUE_UNSET ) {
				switch( val.value_type ) {
				case VALUE_NUMBER:
					result = SUPPORT_LEAD_ZERO_OCTAL?numberConvert(val.string):((negative?-1:1) * Number( val.string ));
					break;
				case VALUE_STRING:
					result = val.string;
					break;
				case VALUE_TRUE:
					result = true;
					break;
				case VALUE_FALSE:
					result = false;
					break;
				case VALUE_NULL:
					result = null;
					break;
				case VALUE_UNDEFINED:
					result = undefined;
					break;
				case VALUE_NAN:
					result = NaN;
					break;
				case VALUE_NEG_NAN:
					result = -NaN;
					break;
				case VALUE_INFINITY:
					result = Infinity;
					break;
				case VALUE_NEG_INFINITY:
					result = -Infinity;
					break;
				case VALUE_OBJECT: // never happens
					result = val.contains;
					break;
				case VALUE_ARRAY: // never happens
					result = val.contains;
					break;
				}
				negative = false;
				val.string = '';
				val.value_type = VALUE_UNSET;
			}
			completed = false;
			return retval;
		}
	}
}



const _parser = [Object.freeze( JSOX.begin() )];
var _parse_level = 0;
JSOX.parse = function( msg, reviver ) {
	//var parser = JSOX.begin();
	var parse_level = _parse_level++;
	var parser;
	if( _parser.length <= parse_level )
		_parser.push( Object.freeze( JSOX.begin() ) );
	parser = _parser[parse_level];
	if (typeof msg !== "string") msg = String(msg);
	parser.reset();
	if( parser._write( msg, true ) > 0 )
	{
		var result = parser.value();
		var reuslt = typeof reviver === 'function' ? (function walk(holder, key) {
			var k, v, value = holder[key];
			if (value && typeof value === 'object') {
				for (k in value) {
					if (Object.prototype.hasOwnProperty.call(value, k)) {
						v = walk(value, k);
						if (v !== undefined) {
							value[k] = v;
						} else {
							delete value[k];
						}
					}
				}
			}
			return reviver.call(holder, key, value);
		}({'': result}, '')) : result;
		_parse_level--;
		return result;
	}
	return undefined;
}

var protoTypes = new WeakMap();

/* init prototypes */
{
	function this_value() {console.log( "this:", this, "valueof:", this.valueOf() ); return this.valueOf(); }
	// function https://stackoverflow.com/a/17415677/4619267
        protoTypes.set( Date.prototype, function () {
		var tzo = -this.getTimezoneOffset(),
			dif = tzo >= 0 ? '+' : '-',
			pad = function(num) {
				var norm = Math.floor(Math.abs(num));
				return (norm < 10 ? '0' : '') + norm;
			};
		return this.getFullYear() +
			'-' + pad(this.getMonth() + 1) +
			'-' + pad(this.getDate()) +
			'T' + pad(this.getHours()) +
			':' + pad(this.getMinutes()) +
			':' + pad(this.getSeconds()) +
			dif + pad(tzo / 60) +
			':' + pad(tzo % 60);
	} );
	protoTypes.set( Boolean.prototype, this_value );
	protoTypes.set( Number.prototype, this_value );
	protoTypes.set( String.prototype, this_value );
	protoTypes.set( BigInt.prototype, function() { return this + 'n' } );
}

JSOX.registerToJSOX = function( prototype, f ) {
	protoTypes.set( prototype, f );
}

JSOX.stringifier = function() {
	var classes = [];
	var useQuote = '"';
	return {
		defineClass(name,obj) { classes.push( { name : name, tag:Object.keys(obj).toString(), fields : Object.keys(obj) } ) },
		stringify(o,r,s) { return stringify(o,r,s) },
		setQuote(q) { useQuote = q; }
	}

	function matchObject(o,useK) {
		var k;
		if( useK )  {
			useK.map( v=>{ if( typeof v === "string" ) return v; else return undefined; } );
			k = useK.toString();
		} else
			k = Object.keys(o).toString();
		var cls = classes.find( cls=>{
			if( cls.tag === k ) return true;
		} );
		return cls;
	}

	function stringify( object, replacer, space ) {
		if( object === undefined ) return "undefined";
		if( object === null ) return;

		var gap;
		var indent;
		var meta;
		var rep;

		var i;
		gap = "";
		indent = "";

		// If the space parameter is a number, make an indent string containing that
		// many spaces.

		if (typeof space === "number") {
			for (i = 0; i < space; i += 1) {
				indent += " ";
			}

		// If the space parameter is a string, it will be used as the indent string.

				} else if (typeof space === "string") {
					indent = space;
		}

		// If there is a replacer, it must be a function or an array.
		// Otherwise, throw an error.

		rep = replacer;
		if( replacer && typeof replacer !== "function"
                    && ( typeof replacer !== "object"
		       || typeof replacer.length !== "number"
		   )) {
			throw new Error("JSOX.stringify");
		}

		return str( "", {"":object} );

		function getIdentifier(s) {
			// should check also for if any non ident in string...
			if( [ "true","false","null","NaN","Infinity","undefined"].find( keyword=>keyword===s ) || s.includes( " " ) )
				return useQuote + JSOX.escape(s) +useQuote;
			return s;

		}

		// from https://github.com/douglascrockford/JSON-js/blob/master/json2.js#L181
		function str(key, holder) {

		// Produce a string from holder[key].

			var i;          // The loop counter.
			var k;          // The member key.
			var v;          // The member value.
			var length;
			var mind = gap;
			var partialClass;
			var partial;
			var value = holder[key];
			var toJSOX = value && protoTypes.get( Object.getPrototypeOf( value ) );
			// If the value has a toJSOX method, call it to obtain a replacement value.
			_DEBUG_STRINGIFY && console.log( "type:", typeof value, toJSOX );

			if( value
			    && ( typeof value === "object"
			       || typeof value === "bigint"
			    )
			    && typeof toJSOX === "function"
			) {
				if (typeof rep === "function") {
					_DEBUG_STRINGIFY && console.log( "return formatted thing." );
					return rep.call(holder, key, toJSOX.call( value,key), value);
				}
				_DEBUG_STRINGIFY && console.log( "returning ", toJSOX.call( value,key), value );
				return toJSOX.call( value,key);
			}

			// If we were called with a replacer function, then call the replacer to
			// obtain a replacement value.

				if (typeof rep === "function") {
				value = rep.call(holder, key, value);
			}

			// What happens next depends on the value's type.

			switch (typeof value) {
			case "string":
				return useQuote+JSOX.escape( value )+useQuote;

			case "number":

			// JSOX numbers must be finite. Encode non-finite numbers as null.
			if( isNaN(value) )
				return "NaN";

				return (isFinite(value))
					? String(value)
					: (value<0)?-Infinity:Infinity;

			case "boolean":
			case "null":

				// If the value is a boolean or null, convert it to a string. Note:
				// typeof null does not produce "null". The case is included here in
				// the remote chance that this gets fixed someday.

				return String(value);

				// If the type is "object", we might be dealing with an object or an array or
				// null.

			case "object":

				// Due to a specification blunder in ECMAScript, typeof null is "object",
				// so watch out for that case.

				if (!value) {
					return "null";
				}

				// Make an array to hold the partial results of stringifying this object value.

				gap += indent;
				partialClass = null;
				partial = [];

				// Is the value an array?
				let typeName = Object.prototype.toString.apply(value);
				var ab = null;
				if( typeName === "[object Uint8Array]" ){
					ab = value.buffer;
					typeName = "u8";
				} else if( typeName === "[object Uint16Array]" ){
					ab = value.buffer;	
					typeName = "u16";
				} else if( typeName === "[object Uint32Array]" ){
					ab = value.buffer;	
					typeName = "u32";
				} else if( typeName === "[object Int8Array]" ){
					ab = value.buffer;	
					typeName = "s8";
				} else if( typeName === "[object Int16Array]" ){
					ab = value.buffer;	
					typeName = "s16";
				} else if( typeName === "[object Int32Array]" ){
					ab = value.buffer;	
					typeName = "s32";
				} else if( typeName === "[object Float32Array]" ){
					ab = value.buffer;	
					typeName = "f32";
				} else if( typeName === "[object Float64Array]" ){
					ab = value.buffer;	
					typeName = "f64";
				} else if( typeName === "[object Uint8ClampedArray]" ){
					ab = value.buffer;	
					typeName = "uc8";
				} else if( typeName === "[object ArrayBuffer]" ){
					ab = value;	
					typeName = "ab";
				}
				if( ab ) {
					v = typeName+"["+base64ArrayBuffer(ab)+"]";
					return v;
				}

				if( typeName === "[object Array]") {

				// The value is an array. Stringify every element. Use null as a placeholder
				// for non-JSOX values.

					length = value.length;
					for (i = 0; i < length; i += 1) {
						partial[i] = str(i, value) || "null";
					}

				// Join all of the elements together, separated with commas, and wrap them in
				// brackets.
					var c;
					if( key==="" )
						c = classes.map( cls=> cls.name+"{"+cls.fields.join(",")+"}" ).join(gap?"\n":"")+(gap?"\n":"");
					else
						c = '';

					v = c + ( partial.length === 0
						? "[]"
						: gap
							? (
								"[\n"
								+ gap
								+ partial.join(",\n" + gap)
								+ "\n"
								+ mind
								+ "]"
							)
							: "[" + partial.join(",") + "]" );
					gap = mind;
					return v;
				}

				// If the replacer is an array, use it to select the members to be stringified.

				if (rep && typeof rep === "object") {
					length = rep.length;
					partialClass = matchObject( value, rep );
					for (i = 0; i < length; i += 1) {
						if (typeof rep[i] === "string") {
							k = rep[i];
							v = str(k, value);
							if (v) {
								if( partialClass ) {
									partial.push(v);
							} else
									partial.push(getIdentifier(k) + (
										(gap)
											? ": "
											: ":"
									) + v);
							}
						}
					}
				} else {

					// Otherwise, iterate through all of the keys in the object.
					partialClass = matchObject( value );

					for (k in value) {
						if (Object.prototype.hasOwnProperty.call(value, k)) {
							v = str(k, value);
							if (v) {
								if( partialClass ) {
									partial.push(v);
							} else
									partial.push(getIdentifier(k)+ (
										(gap)
											? ": "
											: ":"
									) + v);
							}
						}
					}
				}

				// Join all of the member texts together, separated with commas,
				// and wrap them in braces.
				_DEBUG_STRINGIFY && console.log( "pratial:", partial )
				var c;
				if( key==="" )
					c = classes.map( cls=> cls.name+"{"+cls.fields.join(",")+"}" ).join(gap?"\n":"")+(gap?"\n":"");
				else
					c = '';
				v = c +
					( partial.length === 0
					? "{}"
					: gap
							? (partialClass?getIdentifier(partialClass.name):"")+"{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}"
							: (partialClass?getIdentifier(partialClass.name):"")+"{" + partial.join(",") + "}"
			);
				gap = mind;
				return v;
			}
		}

	}

}

JSOX.stringify = function( object, replacer, space ) {
	var stringifier = JSOX.stringifier();
	return stringifier.stringify( object, replacer, space );
}





// Converts an ArrayBuffer directly to base64, without any intermediate 'convert to string then
// use window.btoa' step. According to my tests, this appears to be a faster approach:
// http://jsperf.com/encoding-xhr-image-data/5
// doesn't have to be reversable....
const encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
const decodings = { '=':-1 };

for( var x = 0; x < 256; x++ ) {
	if( x < 64 ) {
		decodings[encodings[x]] = x;
	}
}

function base64ArrayBuffer(arrayBuffer) {
	var base64    = ''

	var bytes         = new Uint8Array(arrayBuffer)
	var byteLength    = bytes.byteLength
	var byteRemainder = byteLength % 3
	var mainLength    = byteLength - byteRemainder

	var a, b, c, d
	var chunk
	//throw "who's using this?"
	//console.log( "buffer..", arrayBuffer )
	// Main loop deals with bytes in chunks of 3
	for (var i = 0; i < mainLength; i = i + 3) {
		// Combine the three bytes into a single integer
		chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2]

		// Use bitmasks to extract 6-bit segments from the triplet
		a = (chunk & 16515072) >> 18 // 16515072 = (2^6 - 1) << 18
		b = (chunk & 258048)   >> 12 // 258048   = (2^6 - 1) << 12
		c = (chunk & 4032)     >>  6 // 4032     = (2^6 - 1) << 6
		d = chunk & 63               // 63       = 2^6 - 1

		// Convert the raw binary segments to the appropriate ASCII encoding
		base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d]
	}

	// Deal with the remaining bytes and padding
	if (byteRemainder == 1) {
		chunk = bytes[mainLength]
		a = (chunk & 252) >> 2 // 252 = (2^6 - 1) << 2
		// Set the 4 least significant bits to zero
		b = (chunk & 3)   << 4 // 3   = 2^2 - 1
		base64 += encodings[a] + encodings[b] + '=='
	} else if (byteRemainder == 2) {
		chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1]
		a = (chunk & 64512) >> 10 // 64512 = (2^6 - 1) << 10
		b = (chunk & 1008)  >>  4 // 1008  = (2^6 - 1) << 4
		// Set the 2 least significant bits to zero
		c = (chunk & 15)    <<  2 // 15    = 2^4 - 1
		base64 += encodings[a] + encodings[b] + encodings[c] + '='
	}
	//console.log( "dup?", base64)
	return base64
}


function DecodeBase64( buf )
{	
	//console.log( "length:", buf.length, (((buf.length+3)/4)|0), (buf[buf.length-1]==='='?1:0), (buf[buf.length-2]==='='?1:0) )
	var ab = new ArrayBuffer( (3*(((buf.length+3)>>2)|0)) - ((buf[buf.length-1]==='='?1:0) + (buf[buf.length-2]==='='?1:0)) );
	//console.log( "LENGHT:", (3*(((buf.length+3)/4)|0)) - ((buf[buf.length-1]==='='?1:0) + (buf[buf.length-2]==='='?1:0)) );
	var out = new Uint8Array(ab);
	{
		var n;
		var l = (buf.length+3)>>2;
		for( n = 0; n < l; n++ )
		{
			var index0 = decodings[buf[n*4]];
			var index1 = decodings[buf[n*4+1]];
			var index2 = decodings[buf[n*4+2]];
			var index3 = decodings[buf[n*4+3]];
			
			out[n*3+0] = (( index0 ) << 2 | ( index1 ) >> 4);
			if( index2 >= 0 )
				out[n*3+1] = (( index1 ) << 4 | ( ( ( index2 ) >> 2 ) & 0x0f ));
			if( index3 >= 0 )
				out[n*3+2] = (( index2 ) << 6 | ( ( index3 ) & 0x3F ));
		}
	}
	return ab;
}


