'use strict';
const JSON6 = require( ".." );

const parse = JSON6.parse;
let o;

describe('Bad tests', function () {

	it('space error "tr "', function () {
		o = parse( "tr " );
		expect(o).to.equal("tr");
	} );

	it('space error "[tr ]"', function () {
		o = parse( "[tr ]" );
		expect(o).to.deep.equal(["tr"]);
	} );
		
	it('space error "{a:tr }"', function () {
			o = parse( "{a:tr }" );
			//console.log( "got back:", o );
		expect(o).to.deep.equal({a:"tr"});
	} );


	it('Unquoted space in identifier', function () {
		expect(function () {
			o = parse( "{ a b:1 }" );
			//console.log( "got back:", o );
		}).to.throw(Error);
	});

	it('Missing colon array?', function () {
		expect(function () {
			o = parse( "{ a[3], b:1 }" );
			//console.log( "got back:", o );
		}).to.throw(Error);
	});

	it('Missing colon object?', function () {
		expect(function () {
			o = parse( "{ a{c:3}, b:1 }" );
			//console.log( "got back:", o );
		}).to.throw(Error);
	});

	it('String unquoted? -- tag and payload, not a fault', function () {
		// two adjacent unquoted strings are a class tag and its payload; with the tag
		// unregistered that degrades to the payload rather than throwing. Three in a row
		// is still a fault -- see 1.2.126-cyclicRefRevive.
		expect( parse( "{ a  : no quote }" ) ).to.deep.equal( { a : 'quote' } );
	});

	it('Throws with colon in array', function () {
		expect(function () {
			parse( "[:]" );
		}).to.throw(Error);
	});

	/* JSOX ':' at this level allows redefinition of classes 
	it('Throws with colon outside objects', function () {
		expect(function () {
			parse( ":" );
		}).to.throw(Error);
	});
	*/

	it('Throws with comma outside objects', function () {
		expect(function () {
			parse( "," );
		}).to.throw(Error, /excessive commas|fault while parsing/);
	});

	it('Throws with curly bracket outside objects', function () {
		expect(function () {
			parse( "}" );
		}).to.throw(Error);
	});

/*
  TODO 
  this is sort of an error, if 'no quote' isn't defined; but right now the parser accepts it until the reviver... (becomes classname in value)
	it('Array after string?', function () {
		expect(function () {
			o = parse( "{ a  : 'no quote' [1] }" );
			console.log( "got back:", o );
		}).to.throw(Error);
	});
*/        

	it('comma after object field and : ', function () {
		expect(function () {
			o = parse( "{a:,}" );
		}).to.throw(Error);
	});

	it('object close after object field and : ', function () {
		expect(function () {
			o = parse( "{a:}" );
			console.log( "got back:", o );
		}).to.throw(Error);
	});

	it('bad hex escape : ', function () {
		expect(function () {
			o = parse( "'\\x1Z'" );
			console.log( "got back:", o );
		}).to.throw(Error);
	});

	it('bad unicode escape : ', function () {
		expect(function () {
			o = parse( "'\\u01Zz'" );
			console.log( "got back:", o );
		}).to.throw(Error);
	});


	it('throws with quoted field name after no comma : ', function () {
		expect(function () {
			o = parse( '{ "a": { "a": 5 }   "abc": { "a": 5  } }' );
		}).to.throw(Error,/String unexpected|outside any object, got colon out of string|two values with no separator/);
	});

	it('throws with unquoted field name after no comma: ', function () {
		expect(function () {
			o = parse( '{ "a": { "a": 5 }   abc: { "a": 5  } }' );
		}).to.throw(Error,/String unexpected|outside any object, got colon out of string|two values with no separator/);
	});



});
