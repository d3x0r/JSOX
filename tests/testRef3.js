
//import {JSOX} from "../lib/jsox.mjs" ;
const JSOX = require('..');


const worldStr = `{op:world,world:{bodies:[],lines:[],name:null,
		names:[{flags:{vertical:false},name:Default}],
		sectors:[
			{id:0,name:null,r:{n:v3{x:0,y:1,z:0},o:v3{x:0,y:0,z:0}},
			texture:{flags:{color:true},name:ref["world","names",0]},
			wall:{end:{end:{end:ref["world","sectors",0,"wall","end"],end_at_end:true,id:3,into:null,
					line:{from:-5,r:{n:v3{x:0,y:1,z:0},o:v3{x:5,y:0,z:0}},to:5},name:null,
				start:{end:ref["world","sectors",0,"wall","end","end"],end_at_end:false,id:2,into:null,
					line:{from:-5,r:{n:v3{x:1,y:0,z:0},o:v3{x:0,y:-5,z:0}},to:5},name:null,
				start:ref["world","sectors",0,"wall"],start_at_end:false},start_at_end:true},end_at_end:false,id:1,into:null,
					line:{from:-5,r:{n:v3{x:1,y:0,z:0},o:v3{x:0,y:5,z:0}},to:5},name:null,
				start:ref["world","sectors",0,"wall"],start_at_end:true},end_at_end:false,id:0,into:null,
					line:{from:-5,r:{n:v3{x:0,y:1,z:0},o:v3{x:-5,y:0,z:0}},to:5},name:null,
				start:ref["world","sectors",0,"wall","end","end","start"],start_at_end:false}
			}
		],
		textures:[ref["world","sectors",0,"texture"]],
		walls:[ref["world","sectors",0,"wall"],ref["world","sectors",0,"wall","end"],ref["world","sectors",0,"wall","end","end","start"],ref["world","sectors",0,"wall","end","end"]]}}`
const worldObj = JSOX.parse( worldStr );
console.log( "GOT:", worldObj );
//console.log( "GOT:", worldObj.world.walls );
for( let wall of worldObj.world.walls ) {
	if( wall.start instanceof Array ) {
		console.log( "PING" );
		console.log( "GOT:", wall );
	}
	if( wall.end instanceof Array ) {
		console.log( "PING2" );
	}
}
