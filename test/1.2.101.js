'use strict';
const JSOX = require( ".." );


describe('Added in 1.2.101', function () {

	it( 'Parses short unquoted value',  function() {

		expect( JSOX.parse( '{fName:Test,fmtName:"",lName:User,mName:M,nName:"",suffix:"",title:"Mr.",webAccounts:[]}' ) )
			.to.deep.equal( {fName:"Test",fmtName:"",lName:"User",mName:"M",nName:"",suffix:"",title:"Mr.",webAccounts:[]} );
	} );
	it( 'handles keywords with spaces', function() {
		expect( JSOX.parse( "[null,null,null, null , null,null ,null]" ) )
			.to.deep.equal( [null,null,null, null , null,null ,null] );
	} );

	// references which revived deeply in the current stack.... 
	// node ../tests/data/rawtest.js ./testReferenceRevive.jsox

} );
