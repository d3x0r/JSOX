
'use strict';
const JSOX = require( ".." );

describe('Added in 1.2.102', function () {



	it( 'handles ref revivals', function() {
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
		
		// {op:"move",walls:[{end:{end:{end:ref["walls",0,"end"],start:{end:ref["walls",0,"end","end"],start:ref["walls",0]}},start:ref["walls",0]},start:ref["walls",0,"end","end","start"]},ref["walls",0,"end","end","start"],ref["walls",0,"end"],ref["walls",0,"end","end"]]}
                // {op:"move",walls:[{end:{end:{end:ref["walls",0,"end"],start:{end:ref["walls",0,"end","end"],start:ref["walls",0,"end","end","start"]}},start:ref["walls",0,"end"]},start:ref["walls"]},ref["walls",0,"end","end","start"],ref["walls",0,"end"],ref["walls",0,"end","end"]]}
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
			console.log( "Failed TEST:", obj, o );
			throw new Error( "Object Mis-Match") ;
		}
		const str2 = JSOX.stringify( obj );
		//console.log( "got:", str );
		expect( str2 ).to.equal( str2 );

	} );
        
} );
