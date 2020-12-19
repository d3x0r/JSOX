
'use strict';
import {JSOX} from "../lib/jsox.mjs";

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

function World() {}
World.fromString = function( field, value ) {
	if( field ) {
		this[field] = value;
		return undefined;
	}else return this;
}
JSOX.addType( "~Wr", World, null, World.fromString );

function Line() {}
JSOX.addType( "~L", Line );

function Wall() {}
JSOX.addType( "~Wl", Wall );

function Sector() {}
JSOX.addType( "~S", Sector );

function Texture() {}
JSOX.addType( "~T", Texture );

function Name() {}
JSOX.addType( "~N", Name );

describe('Added in 1.2.102', function () {
	it( 'Handles Arrays of Typed Items', function() {
		const str1 = '{op:world,world:~Wr{lines:[~L{from:-5,id:0,r:{n:v3{x:0,y:1,z:0},o:v3{x:-5,y:0,z:0}},to:5},~L{from:-5,id:1,r:{n:v3{x:1,y:0,z:0},o:v3{x:0,y:5,z:0}},to:5},~L{from:-5,id:2,r:{n:v3{x:1,y:0,z:0},o:v3{x:0,y:-5,z:0}},to:5},~L{from:-5,id:3,r:{n:v3{x:0,y:1,z:0},o:v3{x:5,y:0,z:0}},to:5}],names:[~N{flags:{vertical:false},id:0,name:Default}],sectors:[~S{id:0,name:null,r:{n:v3{x:0,y:0,z:1},o:v3{x:0,y:0,z:0}},texture:~T{flags:{color:true},name:ref["world","names",0]},wall:~Wl{end:~Wl{end:~Wl{end:ref["world","sectors",0,"wall","end"],end_at_end:true,id:3,into:null,line:ref["world","lines",3],start:~Wl{end:ref["world","sectors",0,"wall","end","end"],end_at_end:false,id:2,into:null,line:ref["world","lines",2],start:ref["world","sectors",0,"wall"],start_at_end:false},start_at_end:true},end_at_end:false,id:1,into:null,line:ref["world","lines",1],start:ref["world","sectors",0,"wall"],start_at_end:true},end_at_end:false,id:0,into:null,line:ref["world","lines",0],start:ref["world","sectors",0,"wall","end","end","start"],start_at_end:false}}],walls:[ref["world","sectors",0,"wall"],ref["world","sectors",0,"wall","end"],ref["world","sectors",0,"wall","end","end","start"],ref["world","sectors",0,"wall","end","end"]]}}'
		const obj1 = JSOX.parse( str1 );
		const str2 = JSOX.stringify( obj1, null, '   ' );
		// /need to form a similar object, with circular links to test... 
		// will lose the type names?
		//console.log( "GOT:", obj1, "\n", str2 );
		const output = `
{
   op: "world",
   world: ~Wr{
      lines: [
         ~L{
            from: -5,
            id: 0,
            r: {
               n: {
                  x: 0,
                  y: 1,
                  z: 0
               },
               o: {
                  x: -5,
                  y: 0,
                  z: 0
               }
            },
            to: 5
         },
         ~L{
            from: -5,
            id: 1,
            r: {
               n: {
                  x: 1,
                  y: 0,
                  z: 0
               },
               o: {
                  x: 0,
                  y: 5,
                  z: 0
               }
            },
            to: 5
         },
         ~L{
            from: -5,
            id: 2,
            r: {
               n: {
                  x: 1,
                  y: 0,
                  z: 0
               },
               o: {
                  x: 0,
                  y: -5,
                  z: 0
               }
            },
            to: 5
         },
         ~L{
            from: -5,
            id: 3,
            r: {
               n: {
                  x: 0,
                  y: 1,
                  z: 0
               },
               o: {
                  x: 5,
                  y: 0,
                  z: 0
               }
            },
            to: 5
         }
],
      names: [
         ~N{
            flags: {
               vertical: false
            },
            id: 0,
            name: "Default"
         }
],
      sectors: [
         ~S{
            id: 0,
            name: null,
            r: {
               n: {
                  x: 0,
                  y: 0,
                  z: 1
               },
               o: {
                  x: 0,
                  y: 0,
                  z: 0
               }
            },
            texture: ~T{
               flags: {
                  color: true
               },
               name: ref["world","names",0]
            },
            wall: ~Wl{
               end: ~Wl{
                  end: ~Wl{
                     end: ref["world","sectors",0,"wall","end"],
                     end_at_end: true,
                     id: 3,
                     into: null,
                     line: ref["world","lines",3],
                     start: ~Wl{
                        end: ref["world","sectors",0,"wall","end","end"],
                        end_at_end: false,
                        id: 2,
                        into: null,
                        line: ref["world","lines",2],
                        start: ref["world","sectors",0,"wall"],
                        start_at_end: false
                     },
                     start_at_end: true
                  },
                  end_at_end: false,
                  id: 1,
                  into: null,
                  line: ref["world","lines",1],
                  start: ref["world","sectors",0,"wall"],
                  start_at_end: true
               },
               end_at_end: false,
               id: 0,
               into: null,
               line: ref["world","lines",0],
               start: ref["world","sectors",0,"wall"],
               start_at_end: false
            }
         }
],
      walls: [
         ref["world","sectors",0,"wall"],
         ref["world","sectors",0,"wall","end"],
         ref["world","sectors",0,"wall","end","end","start"],
         ref["world","sectors",0,"wall","end","end"]
]
   }
}`
		expect( str2 ).to.equal( output );
        } );


	it( 'Fails with bad references', function() {
		const str = '{op:world,world:~Wr{lines:[{flags:{vertical:false},id:0,name:"Default"}],names:ref["lines"]}}'
		expect( function() {
	                const obj = JSOX.parse( str );
        	        //console.log( "OBJ" );
		// Error is like 'Path did not resolve properly.lines at lines(0)'
		} ).to.throw( Error );
        } );

} )