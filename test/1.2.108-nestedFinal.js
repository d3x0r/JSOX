'use strict';
//const SACK=require("../.." );
//const JSOX = SACK.JSOX;
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


describe('Added in 1.2.108', function () {

	it( 'Performs operations in the right order', function() {
			JSOX.reset();
        
        	const content = 'O{sub:s{inner:"VALUE",a:[1,2,3]},a:123,b:345,c:[5,6,7]}'
                const processed = [];
					const array = [];
                class SubO {
						inner = "value";
						a = [1,2,3];
						constructor(newval) { 
                        	processed.push( "Constructed subO" );
							if( newval ) this.inner = newval };
		 			}
                class O {
                	a = 0;
						sub = new SubO();
                        b = 0;
                        c = array;
                        constructor() {
                        	processed.push( "Constructed O" );
                        }
                }
                function fromJSOX( field, val ) {
			if( field ) {
	                	processed.push( [field, val, JSON.stringify(val)] );
				if( field === "c" ) 
					return this.c;
				else
					return val;
			} else {
	         processed.push( "Final revive" );
				this.c.push(8);
				return this;
			}

                }

                function subFromJSOX( field, val ) {
			if( field ) {
	                	processed.push( [field, val, JSON.stringify(val)] );
				if( field === "c" ) 
					return this.c;
				else
					return val;
			} else {
	         processed.push( "Sub Final revive" );
				return this;
			}

                }

                JSOX.fromJSOX( "s", SubO, subFromJSOX );
                JSOX.fromJSOX( "O", O, fromJSOX );
                const object = JSOX.parse( content );
			
                               processed.forEach( (val,idx)=>{ 
						if( val instanceof Array ) if( "object" === typeof val[1] ) {
								val[1] = JSON.stringify(val[1]); 
							processed[idx] = val.join();
						}
} );

		//console.log( "Process:\n", processed.join("\n") );
		expect( processed.join("\n") ).to.equal( `Constructed subO
Constructed O
Constructed subO
inner,VALUE,"VALUE"
a,[1,2,3],[]
Sub Final revive
sub,{"inner":"VALUE","a":[1,2,3]},{"inner":"VALUE","a":[1,2,3]}
a,123,123
b,345,345
c,[],[]
Final revive` );
		expect( object ).to.deep.equal( { sub:new SubO("VALUE"),a:123,b:345,c:[5,6,7,8] } );

	} );
        
} );
