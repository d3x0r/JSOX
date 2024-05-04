'use strict';
const JSOX = require( ".." );

describe('JSOX stringify', function () {

	it('stringifies Infinity', function () {
		expect( JSOX.stringify( { d:Infinity } ) ).to.equal( '{d:Infinity}' );
	} );

	it('stringifies NaN', function () {
		expect( JSOX.stringify( { e:NaN } ) ).to.equal( '{e:NaN}' );
	} );

	it('basically stringifies', function () {
		expect( JSOX.stringify( { a:1
			, b:"123"
			, c:null
			, d:Infinity, e:NaN
			, f:false
			, t:true } ) )
			.to.equal( '{a:1,b:"123",c:null,d:Infinity,e:NaN,f:false,t:true}' );
	} );

	it('canonically stringifies', function () {
		expect( JSOX.stringify( { z:1
			, y:"123"
			, x:null
			, w:Infinity
			, v:NaN
			, f:false
			, '':''
			, get g() { return 0; }
			, t:true } ) )
			.to.equal( '{\"\":"",f:false,g:0,t:true,v:NaN,w:Infinity,x:null,y:"123",z:1}' );
	} );

	it('can skip non-enumerable', function () {
		const stringifier = JSOX.stringifier();
		stringifier.ignoreNonEnumerable = true;
		const obj = { z:1
			, y:"123"
			, x:null
			, w:Infinity
			, v:NaN
			, f:false
			, t:true };
		Object.defineProperty( obj, "g", { writable:true, value:true } );
		expect( stringifier.stringify( obj ) )
			.to.equal( '{f:false,t:true,v:NaN,w:Infinity,x:null,y:"123",z:1}' );
	} );
        
        
} );
