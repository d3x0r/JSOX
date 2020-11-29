
//import {JSOX} from "../lib/jsox.mjs" ;
const JSOX = require('..');

test1();

function test1() {
	const w1 = {end1:null,start1:null};
	const w2 = {end2:null,start2:null};
	const w3 = {end3:null,start3:null};
	const w4 = {end4:null,start4:null};
	w1.start1 = w2;
	w1.end1 = w3;
	w2.start2 = w1;
	w2.end2 = w4;
	w3.start3 = w1;
	w3.end3 = w4;
	w4.start4 = w2;
	w4.end4 = w3;
	const o = {op:"move", walls: [w1,w2,w3,w4] };
	const str = JSOX.stringify( o );
	console.log( "str:", str );
	            /*
		const str = `{op:"move",walls:[
			{end:
				{end:
					{end:ref["walls",0,"end"],end_at_end:true,id:3,into:null,line:{from:-1,r:{n:{x:0,y:0,z:0}
						,o:{x:5,y:4.9,z:0}}
						,to:0},name:null,
					start:{end:ref["walls",0,"end","end"],end_at_end:false,id:2,into:null
			,line:{from:0,r:{n:{x:10,y:10,z:0},o:{x:-5,y:-5.1,z:0}},to:1},name:null
			,start:ref["walls",0],start_at_end:false},start_at_end:true},end_at_end:false,id:1,into:null,line:{from:-5,r:{n:{x:1,y:0,z:0},o:{x:0,y:4.9,z:0}},to:5},name:null
			,start:ref["walls",0],start_at_end:true},end_at_end:false,id:0,into:null,line:{from:-5,r:{n:{x:0,y:1,z:0},o:{x:-5,y:-0.1,z:0}},to:5},name:null
			,start:ref["walls",0,"end","end","start"],start_at_end:false}
			,ref["walls",0,"end"]
			,ref["walls",0,"end","end"]
			,ref["walls",0,"end","end","start"]]}`;
*/
                const obj = JSOX.parse( str ) ;

	if( o.walls[0].start1 !== o.walls[1]  )
		console.log( "FAIL1" );
	if( o.walls[0].end1 !== o.walls[2]  )
		console.log( "FAIL2" );
	if( o.walls[1].start2 !== o.walls[0]  )
		console.log( "FAIL3" );
	if( o.walls[1].end2 !== o.walls[3]  )
		console.log( "FAIL4" );
	if( o.walls[2].start3 !== o.walls[0]  )
		console.log( "FAIL5" );
	if( o.walls[2].end3 !== o.walls[3]  )
		console.log( "FAIL6" );
	if( o.walls[3].start4 !== o.walls[1]  )
		console.log( "FAIL7" );
	if( o.walls[3].end4 !== o.walls[2]  )
		console.log( "FAIL8" );

	if( obj.walls[0].start1 !== obj.walls[1]  )
		console.log( "FAIL1" );
	if( obj.walls[0].end1 !== obj.walls[2]  )
		console.log( "FAIL2" );
	if( obj.walls[1].start2 !== obj.walls[0]  )
		console.log( "FAIL3" );
	if( obj.walls[1].end2 !== obj.walls[3]  )
		console.log( "FAIL4" );
	if( obj.walls[2].start3 !== obj.walls[0]  )
		console.log( "FAIL5" );
	if( obj.walls[2].end3 !== obj.walls[3]  )
		console.log( "FAIL6" );
	if( obj.walls[3].start4 !== obj.walls[1]  )
		console.log( "FAIL7" );
	if( obj.walls[3].end4 !== obj.walls[2]  )
		console.log( "FAIL8" );
	  
		console.log( "got:", o );
		console.log( "got:", obj );
}

function test2() {
	const w1 = {end:null,start:null};
	const w2 = {end:null,start:null};
	const w3 = {end:null,start:null};
	const w4 = {end:null,start:null};
	w1.start = w2;
	w1.end = w3;
	w2.start = w1;
	w2.end = w4;
	w3.start = w1;
	w3.end = w4;
	w4.start = w2;
	w4.end = w3;
	const o = {op:"move", walls: [w1,w2,w3,w4] };
	const str = JSOX.stringify( o );
	console.log( "str:", str );
	            /*
		const str = `{op:"move",walls:[
			{end:
				{end:
					{end:ref["walls",0,"end"],end_at_end:true,id:3,into:null,line:{from:-1,r:{n:{x:0,y:0,z:0}
						,o:{x:5,y:4.9,z:0}}
						,to:0},name:null,
					start:{end:ref["walls",0,"end","end"],end_at_end:false,id:2,into:null
			,line:{from:0,r:{n:{x:10,y:10,z:0},o:{x:-5,y:-5.1,z:0}},to:1},name:null
			,start:ref["walls",0],start_at_end:false},start_at_end:true},end_at_end:false,id:1,into:null,line:{from:-5,r:{n:{x:1,y:0,z:0},o:{x:0,y:4.9,z:0}},to:5},name:null
			,start:ref["walls",0],start_at_end:true},end_at_end:false,id:0,into:null,line:{from:-5,r:{n:{x:0,y:1,z:0},o:{x:-5,y:-0.1,z:0}},to:5},name:null
			,start:ref["walls",0,"end","end","start"],start_at_end:false}
			,ref["walls",0,"end"]
			,ref["walls",0,"end","end"]
			,ref["walls",0,"end","end","start"]]}`;
*/
                const obj = JSOX.parse( str ) ;

	if( o.walls[0].start !== o.walls[1]  )
		console.log( "FAIL1" );
	if( o.walls[0].end !== o.walls[2]  )
		console.log( "FAIL2" );
	if( o.walls[1].start !== o.walls[0]  )
		console.log( "FAIL3" );
	if( o.walls[1].end !== o.walls[3]  )
		console.log( "FAIL4" );
	if( o.walls[2].start !== o.walls[0]  )
		console.log( "FAIL5" );
	if( o.walls[2].end !== o.walls[3]  )
		console.log( "FAIL6" );
	if( o.walls[3].start !== o.walls[1]  )
		console.log( "FAIL7" );
	if( o.walls[3].end !== o.walls[2]  )
		console.log( "FAIL8" );

	if( obj.walls[0].start !== obj.walls[1]  )
		console.log( "FAIL1" );
	if( obj.walls[0].end !== obj.walls[2]  )
		console.log( "FAIL2" );
	if( obj.walls[1].start !== obj.walls[0]  )
		console.log( "FAIL3" );
	if( obj.walls[1].end !== obj.walls[3]  )
		console.log( "FAIL4" );
	if( obj.walls[2].start !== obj.walls[0]  )
		console.log( "FAIL5" );
	if( obj.walls[2].end !== obj.walls[3]  )
		console.log( "FAIL6" );
	if( obj.walls[3].start !== obj.walls[1]  )
		console.log( "FAIL7" );
	if( obj.walls[3].end !== obj.walls[2]  )
		console.log( "FAIL8" );
	  
		console.log( "got:", o );
		console.log( "got:", obj );

}
