'use strict';
const JSOX = require( ".." );

/*
process.on("beforeExit", ()=>{ console.log( "EXITING" ) } );
process.on("uncaughtException",(a,b)=>{
	console.log( "test", a, b );
} );

function describe(a,b) { return b() };
function it(a,b) { return b() };
let threw = null;
function expect(a) { if( "function" === typeof a ) { try { threw = null; a(); } catch(err){threw=err}; }
					 return ({ to: {deep:{  equal(b) { console.log( "did",a,"=",b);  } }
					, equal(b) { console.log( "did",a,"=",b); }
				  , throw(a) {console.log( "Success:error?", threw ) } } }); }
*/


describe('Added in 1.2.104; toJSOX, fromJSOX', function () {
	it( "handles toJSOX and fromJSOX API", function() {
		const results = [];
                function parsed( obj ) {
			//console.log( "Obj?", obj );
                	results.push(obj);
                }
                
		function A() {
                	this.a = 123;
                	this.name = 'A';
                }
                function B() {
                	this.name = 'B';
                }
		B.toString = function( stringifer ) {
			return `{b:${this.b}}`;
		}
		B.fromString = function( field,val ) {
                	if( field ) return val;
                        else return this;
                }
		function X() {
                	this.x = new Map();
                	this.name = 'X';
                }
                const now = new Date();
                function Y() {
                	this.y = now;
                	this.name = 'Y';
                }
		Y.toString = function( stringifer ) {
			return `{val:${this.val}}`;
		}
		Y.fromString = function( field,val ) {
                	if( field ) return val;
                        else return this;
                }
		const parser = JSOX.begin( parsed );
                parser.fromJSOX( "X", X );
		expect( function() {
				parser.fromJSOX( "X", X );
			} ).to.throw( Error );
                parser.fromJSOX( "Y", Y, Y.fromString );
                JSOX.fromJSOX( "A", A );
		expect( function() {
				JSOX.fromJSOX( "A", A );
			} ).to.throw( Error );
                JSOX.fromJSOX( "B", B, B.fromString );
                
		parser.write( "A{a:555} B{b:134} X{x:map{field:value}} Y{val:555}" );

		const expected = [ new A(), new B(), new X(), new Y() ];
	        
		expected[0].a = 555;
		expected[1].b = 134;
		expected[2].x.set( "field", "value" );
		expected[3].val = 555;
                expect( results ).to.deep.equal( expected );
                
		results.length = 0;
	        
		const stringifier = JSOX.stringifier();
		JSOX.toJSOX( "A", A );
		JSOX.toJSOX( "B", B, B.toString );
		stringifier.toJSOX( "X", X );
		stringifier.toJSOX( "Y", Y, Y.toString );
	        
		const instance = stringifier.stringify( expected );
		const simple = JSOX.stringify( expected );
	        
		expect( instance ).to.equal( '[A{a:555,name:"A"},B{b:134},X{name:"X",x:map{field:"value"}},Y{val:555}]' );
		expect( simple ).to.equal( `[A{a:555,name:"A"},B{b:134},{name:"X",x:map{field:"value"}},{name:"Y",val:555,y:${JSOX.stringify(now)}}]` );
	} );
} );
