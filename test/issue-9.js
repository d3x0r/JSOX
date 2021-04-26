
'use strict';
const JSOX = require( ".." );


describe('Issue 9', function () {

	it( 'parses 1',  function() {
        	expect( JSOX.parse('{a:"",b:[{c:[{d:false}]}],e:"TEST"}' )).to.deep.equal({a:"",b:[{c:[{d:false}]}],e:"TEST"}) 
	} );
	it( 'parses 2',  function() {
        	expect( JSOX.parse('{a:"",b:[{c:[{d:false}]}]}' )).to.deep.equal({a:"",b:[{c:[{d:false}]}]}) 
	} );
        
} );
