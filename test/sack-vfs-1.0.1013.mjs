import {JSOX} from "../lib/jsox.mjs";

/*
process.on("beforeExit", ()=>{ console.log( "EXITING" ) } );
process.on("uncaughtException",(a,b)=>{
	console.log( "test", a, b );
} );

function describe(a,b) { console.log( "doing:", a ); return b() };
function it(a,b) { console.log( "test:", a ); return b() };
let threw = null;
function expect(a) { if( "function" === typeof a ) { try { threw = null; a(); } catch(err){threw=err}; }
					 return ({ to: {deep:{  equal(b) { console.log( "did",a,"=",b);  } }
					, equal(b) { console.log( "did",a,"=",b); }
				  , throw(a) {console.log( "Success:error?", threw ) } } }); }
*/

class MyObject {
	abc=123;
//constructor() { console.log( "Created--" ); }
}

describe('Added in 1.0.1013', function () {

	it( "parser instance parses simple message?", function() {
        	const parser = JSOX.begin();
			parser.fromJSOX( "O", MyObject );
		const o1 = parser.parse( '{op:worlds}' );
		const o2 = parser.parse( '{op:"world",world:O{name:"My World"}}' );
		const o3 = JSOX.parse( '{op:"world",world:O{name:"My World"}}' );
		//console.log( o1, o2 );
		expect( o1 ).to.deep.equal( {op:"worlds"} );
                const obj = new MyObject();
				obj.name = "My World"
		expect( o2 ).to.deep.equal( {op:"world",world:obj} );
		expect( o3 ).to.deep.equal( {op:"world",world:{name:"My World"}} );
        } );
} );

//setTimeout( ()=>{}, 10000 );