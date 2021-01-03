'use strict';
import {JSOX} from "jsox";
//require( "../lib/require.js" );

import {default as config} from './1.2.106-require.jsox'

describe('Added in 1.2.106 - require(esm)', function () {
	it('extends import operator', function() {
			expect( config ).to.deep.equal( {
				   desc: "configuration file to read",
				date : new Date( "2021-01-02T00:00:00Z" ),
			   value:123}
			 );

	} );
	
	it('allows using require on extension', function () {
		return import( "./1.2.106-require.jsox" ).then( newConfig=>{
			//console.log( "GOT:", newConfig );
			expect( newConfig.default ).to.deep.equal( {
				   desc: "configuration file to read",
				date : new Date( "2021-01-02T00:00:00Z" ),
			   value:123}
			 );
		} );
	} );
} );
