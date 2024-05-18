
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
		// returning undefined for arrays is fatal... you lose all values in the array.
		// would have to trust that you somehow kept the value, but this does not assign
		// the field on returning; which also shouldn't FAIL (previous to 1.2.105 pushing array content
		// to new 'undefined' value did not work, and results with an obscure thrown error)
		if( field === "walls" )
			return undefined;
		return value;
		// the proper result would be something like... 
		//return this[field] = [];
		// Or maybe from some other source...
		//return this.#internalField;
	}else return this;
}

describe('Added in 1.2.105(deprecated in 1.2.121)', function () {
	// the stringifier now includes ~ as a quote requirement, generating "~L" instead of ~L previously.
   // while the latter is still valid, the stringifier fails this test - a replacment test was added.

	function register() {
JSOX.reset()
JSOX.addType( "~Wr", World, null, World.fromString );
JSOX.fromJSOX( "~Wr2", World );

function Line() {}
JSOX.addType( "~L", Line );

function Wall() {}
JSOX.addType( "~Wl", Wall );

function Sector() {}
JSOX.addType( "~S", Sector );

function Texture() {}
JSOX.addType( "~T", Texture );

function Name() { }
JSOX.addType( "~N", Name );

function Vector() { this.x = 0; this.y = 0; this.z = 0 }
JSOX.addType( "v3", Vector );

function Ray() { this.n = new Vector(); this.o = new Vector(); }
JSOX.addType( "r", Ray );
	}

	return true;
	it( 'Handles Arrays of Typed Items', function() {
		const str1 = '{op:world,world:~Wr{lines:[~L{from:-5,id:0,r:{n:v3{x:0,y:1,z:0},o:v3{x:-5,y:0,z:0}},to:5},~L{from:-5,id:1,r:{n:v3{x:1,y:0,z:0},o:v3{x:0,y:5,z:0}},to:5},~L{from:-5,id:2,r:{n:v3{x:1,y:0,z:0},o:v3{x:0,y:-5,z:0}},to:5},~L{from:-5,id:3,r:{n:v3{x:0,y:1,z:0},o:v3{x:5,y:0,z:0}},to:5}],names:[~N{flags:{vertical:false},id:0,name:Default}],sectors:[~S{id:0,name:null,r:{n:v3{x:0,y:0,z:1},o:v3{x:0,y:0,z:0}},texture:~T{flags:{color:true},name:ref["world","names",0]},wall:~Wl{end:~Wl{end:~Wl{end:ref["world","sectors",0,"wall","end"],end_at_end:true,id:3,into:null,line:ref["world","lines",3],start:~Wl{end:ref["world","sectors",0,"wall","end","end"],end_at_end:false,id:2,into:null,line:ref["world","lines",2],start:ref["world","sectors",0,"wall"],start_at_end:false},start_at_end:true},end_at_end:false,id:1,into:null,line:ref["world","lines",1],start:ref["world","sectors",0,"wall"],start_at_end:true},end_at_end:false,id:0,into:null,line:ref["world","lines",0],start:ref["world","sectors",0,"wall","end","end","start"],start_at_end:false}}],walls:[ref["world","sectors",0,"wall"],ref["world","sectors",0,"wall","end"],ref["world","sectors",0,"wall","end","end","start"],ref["world","sectors",0,"wall","end","end"]]}}'
		const obj1 = JSOX.parse( str1 );
		const str2 = JSOX.stringify( obj1, null, '   ' );
		// /need to form a similar object, with circular links to test... 
		// will lose the type names?
		const output = `
{
   op: world,
   world: ~Wr{
      lines: [
      ~L{
         from: -5,
         id: 0,
         r: {
            n: v3{
               x: 0,
               y: 1,
               z: 0
            },
            o: v3{
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
            n: v3{
               x: 1,
               y: 0,
               z: 0
            },
            o: v3{
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
            n: v3{
               x: 1,
               y: 0,
               z: 0
            },
            o: v3{
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
            n: v3{
               x: 0,
               y: 1,
               z: 0
            },
            o: v3{
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
         name: Default
      }
      ],
      sectors: [
      ~S{
         id: 0,
         name: null,
         r: {
            n: v3{
               x: 0,
               y: 0,
               z: 1
            },
            o: v3{
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
            start: ref["world","sectors",0,"wall","end","end","start"],
            start_at_end: false
         }
      }
      ]
   }
}`
		expect( str2 ).to.equal( output );
        } );


	it( 'Handles Arrays of Typed Items(2)', function() {
		const str2a = '{op:world,world:~Wr2{lines:[~L{from:-5,id:0,r:{n:v3{x:0,y:1,z:0},o:v3{x:-5,y:0,z:0}},to:5},~L{from:-5,id:1,r:{n:v3{x:1,y:0,z:0},o:v3{x:0,y:5,z:0}},to:5},~L{from:-5,id:2,r:{n:v3{x:1,y:0,z:0},o:v3{x:0,y:-5,z:0}},to:5},~L{from:-5,id:3,r:{n:v3{x:0,y:1,z:0},o:v3{x:5,y:0,z:0}},to:5}],names:[~N{flags:{vertical:false},id:0,name:Default}],sectors:[~S{id:0,name:null,r:{n:v3{x:0,y:0,z:1},o:v3{x:0,y:0,z:0}},texture:~T{flags:{color:true},name:ref["world","names",0]},wall:~Wl{end:~Wl{end:~Wl{end:ref["world","sectors",0,"wall","end"],end_at_end:true,id:3,into:null,line:ref["world","lines",3],start:~Wl{end:ref["world","sectors",0,"wall","end","end"],end_at_end:false,id:2,into:null,line:ref["world","lines",2],start:ref["world","sectors",0,"wall"],start_at_end:false},start_at_end:true},end_at_end:false,id:1,into:null,line:ref["world","lines",1],start:ref["world","sectors",0,"wall"],start_at_end:true},end_at_end:false,id:0,into:null,line:ref["world","lines",0],start:ref["world","sectors",0,"wall","end","end","start"],start_at_end:false}}],walls:[ref["world","sectors",0,"wall"],ref["world","sectors",0,"wall","end"],ref["world","sectors",0,"wall","end","end","start"],ref["world","sectors",0,"wall","end","end"]]}}'
const str1 =                  `~Wr{lines:[~L{from:-5,r:r{n:v3{x:0,y:1,z:0},o:v3{x:-5,y:0,z:0}},to:5},~L{from:-5,r:r{n:v3{x:1,y:0,z:0},o:v3{x:0,y:5,z:0}},to:5},~L{from:-5,r:r{n:v3{x:1,y:0,z:0},o:v3{x:0,y:-5,z:0}},to:5},~L{from:-5,r:r{n:v3{x:0,y:1,z:0},o:v3{x:5,y:0,z:0}},to:5}],names:[~N{flags:{vertical:false},name:Default}],sectors:[~S{id:0,name:null,r:r{n:v3{x:0,y:0,z:1},o:v3{x:0,y:0,z:0}},texture:~T{flags:{color:true},name:ref["names",0]}
,wall:~Wl{end:
	~Wl{end:
		~Wl{end:ref["sectors",0,"wall","end"],end_at_end:true,id:3,into:null,line:ref["lines",3],
			start:
			~Wl{end:ref["sectors",0,"wall","end","end"],end_at_end:false,id:2,into:null,line:ref["lines",2],start:ref["sectors",0,"wall"],start_at_end:false
			   },start_at_end:true
                   },
            end_at_end:false,id:1,into:null,line:ref["lines",1],
	    start:ref["sectors",0,"wall"],start_at_end:true
           },
        end_at_end:false,id:0,into:null,line:ref["lines",0],
	start:ref["sectors",0,"wall","end","end","start"],start_at_end:false
}
}],walls:[ref["sectors",0,"wall"],ref["sectors",0,"wall","end"],ref["sectors",0,"wall","end","end","start"],ref["sectors",0,"wall","end","end"]]}`
		const obj1 = JSOX.parse( str1 );
		const str2 = JSOX.stringify( obj1, null, '   ' );
		// /need to form a similar object, with circular links to test... 
		// will lose the type names?
		//console.log( "GOT:", obj1, "\n", str2 );
	const world = new World();
	const lines = world.lines = [new Line(), new Line(), new Line(), new Line() ];
	lines.map( (line)=>line.r = new Ray );
	const sectors = world.sectors = [new Sector()];
	const walls = world.walls = [new Wall(), new Wall(), new Wall(), new Wall() ];
	walls[0].line = world.lines[0];
	
	walls[1].line = world.lines[1];
	walls[2].line = world.lines[2];
	walls[3].line = world.lines[3];
	lines[0].from = -5;
	lines[0].to = 5;
	//lines[0].id = 0;
	lines[0].r.n.y = 1;
	lines[0].r.o.x = -5;

	lines[1].from = -5;
	lines[1].to = 5;
	//lines[1].id = 1;
	lines[1].r.n.x = 1;
	lines[1].r.o.y = 5;

	lines[2].from = -5;
	lines[2].to = 5;
	//lines[2].id = 2;
	lines[2].r.n.x = 1;
	lines[2].r.o.y = -5;

	lines[3].from = -5;
	lines[3].to = 5;
	//lines[3].id = 3;
	lines[3].r.n.y = 1;
	lines[3].r.o.x = 5;

	world.names = [new Name()];
	world.names[0].name = "Default";
	world.names[0].id = 0;
	world.names[0].flags = {vertical:false};

	
	world.sectors[0].wall = walls[0];
	world.sectors[0].id =0;
	world.sectors[0].r = new Ray();
	world.sectors[0].texture = new Texture();
	world.sectors[0].texture.flags = {color:true};
	world.sectors[0].texture.name = world.names[0];

	walls[0].end = walls[1];
	walls[0].start = walls[2];
	walls[1].end = walls[3];
	walls[1].start = walls[0];
	walls[2].end = walls[3];
	walls[2].start = walls[0];
	walls[3].end = walls[1];
	walls[3].start = walls[2];


		const stringifier = JSOX.stringifier();
	        
		stringifier.toJSOX( "~Wr2", World );
		stringifier.toJSOX( "~L", Line );
		stringifier.toJSOX( "~Wl", Wall );
		stringifier.toJSOX( "~S", Sector );
		stringifier.toJSOX( "~T", Texture );
		stringifier.toJSOX( "~N", Name );
		stringifier.toJSOX( "v3", Vector );
		stringifier.toJSOX( "r", Ray );
		const mockStr = stringifier.stringify( world );
		const mockExpect = '~Wr2{lines:[~L{from:-5,r:r{n:v3{x:0,y:1,z:0},o:v3{x:-5,y:0,z:0}},to:5},~L{from:-5,r:r{n:v3{x:1,y:0,z:0},o:v3{x:0,y:5,z:0}},to:5},~L{from:-5,r:r{n:v3{x:1,y:0,z:0},o:v3{x:0,y:-5,z:0}},to:5},~L{from:-5,r:r{n:v3{x:0,y:1,z:0},o:v3{x:5,y:0,z:0}},to:5}],names:[~N{flags:{vertical:false},id:0,name:Default}],sectors:[~S{id:0,r:r{n:v3{x:0,y:0,z:0},o:v3{x:0,y:0,z:0}},texture:~T{flags:{color:true},name:ref["names",0]},wall:~Wl{end:~Wl{end:~Wl{end:ref["sectors",0,"wall","end"],line:ref["lines",3],start:~Wl{end:ref["sectors",0,"wall","end","end"],line:ref["lines",2],start:ref["sectors",0,"wall"]}},line:ref["lines",1],start:ref["sectors",0,"wall"]},line:ref["lines",0],start:ref["sectors",0,"wall","end","end","start"]}}],walls:[ref["sectors",0,"wall"],ref["sectors",0,"wall","end"],ref["sectors",0,"wall","end","end","start"],ref["sectors",0,"wall","end","end"]]}';
	        
		
		const fromMock = JSOX.parse( mockStr );
	expect( fromMock ).to.deep.equal( world );
		const fromMockStr = stringifier.stringify(  fromMock );
		//	console.log( "mockstr should be close?", "\n",mockStr, "\n",mockExpect,  "\n",fromMockStr );
		
		expect( mockStr ).to.equal( mockExpect );
		expect( fromMockStr ).to.equal( mockExpect );

        } );

	it( 'Fails with bad references', function() {
		const str = '{op:world,world:~Wr{lines:[{flags:{vertical:false},id:0,name:"Default"}],names:ref["lines"]}}'
		expect( function() {
	                const obj = JSOX.parse( str );
        	        console.log( "OBJ" );
		// Error is like 'Path did not resolve properly.lines at lines(0)'
		} ).to.throw( Error );
        } );

} )