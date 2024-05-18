'use strict';
import {JSOX} from "jsox";


describe('Added in 1.2.113 (DateNS)', function () {

	const t = JSOX.stringify( new JSOX.DateNS("2022-01-01T00:00:00Z"));
	const plus = t.lastIndexOf( "+" );
	const minus = t.lastIndexOf( "-" );
	const Z = t.lastIndexOf( "Z" );
	const pos = ( plus > minus )?(plus>Z)?plus:Z:(minus>Z)?minus:Z;
	const tz = t.substr( pos );

	it( 'handles stringify (with passed UTC timezone)', function() {
        	const str = JSOX.stringify( new JSOX.DateNS( "2022-01-01T00:00:00Z", 123 ) );

			if( tz[0] == '-' && tz !== '-00:00' )
                expect( str ).to.match( new RegExp("2021-12-31T\\d*:00:00.000000123.*" ) );
			else 
                expect( str ).to.match( new RegExp("2021-01-01T\\d*:00:00.000000123.*" ) );
                //expect( str ).to.equal( "2021-12-31T16:00:00.000000123"+tz );
        } );

	it( 'handles stringify (with timezone offset)', function() {
        	const str = JSOX.stringify( new JSOX.DateNS( "2022-01-01T00:00:00-05:00", 123 ) );
			if( tz[0] == '-' && tz !== '-00:00' )
                expect( str ).to.match( new RegExp("2021-12-31T\\d*:00:00.000000123.*" ) );
			else 
                expect( str ).to.match( new RegExp("2021-01-01T\\d*:00:00.000000123.*" ) );
                //expect( str ).to.equal( "2021-12-31T21:00:00.000000123"+tz );
        } );

	it( 'handles parse', function() {
        	const val = JSOX.parse( "2022-01-01T00:00:00.000000123Z" );
		const strval = ''+val.toISOString()+val.ns;
		expect( strval ).to.equal( "2022-01-01T00:00:00.000Z123" );
        } );

})

