'use strict';
const JSON6 = require( ".." );

describe('Single JSON6', function () {
	it('Single JSON6', function () {
		expect(JSON6.parse( "{ asdf : 1234 } " )).to.deep.equal({
			asdf: 1234
		});
	});
});
