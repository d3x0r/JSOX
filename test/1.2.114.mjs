
'use strict';
import {JSOX} from "jsox";

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

describe('Added in 1.2.114 (mjs)', function () {



	it( 'handles ref revivals(extended info)', function() {
		const w1 = {A:1,end:null,start:null};
		const w2 = {A:2,end:null,start:null};
		const w3 = {A:3,end:null,start:null};
		const w4 = {A:4,end:null,start:null};
		w1.start = w2;
		w1.end = w3;
		w2.start = w1;
		w2.end = w4;
		w3.start = w1;
		w3.end = w4;
		w4.start = w2;
		w4.end = w3;
/*		
			{op:"move"
			,walls:[
				{A:1,end:
					{A:3,end:
						{A:4,end:ref["walls",0,"end"]
						,start:
							{A:2,end:ref["walls",0,"end","end"],start:ref["walls",0]}
						}
					,start:ref["walls",0]
					}
				,start:ref["walls",0,"end","end","start"]
				}
				,ref["walls",0,"end","end","start"]
				,ref["walls",0,"end"]
				,ref["walls",0,"end","end"]]}
*/
/*
console.log( "walls:", w1 );
console.log( "walls:", w2 );
console.log( "walls:", w3 );
console.log( "walls:", w4 );
*/
		const o = {op:"move", walls: [w1,w2,w3,w4] }
		const str = JSOX.stringify( o );

		const obj = JSOX.parse( str );
		if( obj.walls[0].start === obj.walls[1] &&
		   obj.walls[0].end === obj.walls[2] &&
		  obj.walls[3].start === obj.walls[1] &&
		   obj.walls[3].end === obj.walls[2] &&
		  obj.walls[1].start === obj.walls[0] &&
		  obj.walls[1].end === obj.walls[3] &&
		  obj.walls[2].start === obj.walls[0] &&
		  obj.walls[1].end === obj.walls[3] ) {
		 	/* success */;
		} else {
			console.log( "Failed TEST:", obj, o, str );
			//console.log( "\n", obj.walls[0], "\n", obj.walls[1], "\n", obj.walls[2], "\n", obj.walls[3] ); 
/*
			console.log( "\n", obj.walls[0] ); 
			console.log( "\n", obj.walls[1] ); 
			console.log( "\n", obj.walls[2] ); 
			console.log( "\n", obj.walls[3] ); 

console.log( "walls:", w1 );
console.log( "walls:", w2 );
console.log( "walls:", w3 );
console.log( "walls:", w4 );
*/
			throw new Error( "Object Mis-Match") ;
		}
		const str2 = JSOX.stringify( obj );
		//console.log( "got:", str );
		expect( str2 ).to.equal( str2 );

	} );
        
} );
