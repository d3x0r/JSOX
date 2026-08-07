var JSOX = require( ".." )

			const r = {};
			r.me = r; r.next = {prior:r};
			r.next.me = r.next;
			const o = JSOX.parse( "{me:ref[],next:{me:ref['next'],prior:ref[]}}" );
		console.log( "Out:", r );
			//expect(o).to.deep.equal( r );

//			const result1 = JSOX.parse( "{ my-key /*test */ :3}" );
//			console.log( "expected {A:3}:", result1 );
//			const result = JSOX.parse( "{A\uFEFF: 3}" );
//			console.log( "expected {A:3}:", result );
