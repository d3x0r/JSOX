const JSOX = require( ".." );
const parse = JSOX.parse;
const stringify = JSOX.stringify;


/**
 * Set the timezone offset from the local timezone offset.
 * Argument "minutes" => -UTC±XX:XX, default = local offset.
 * Property "timezoneOffset" => last-set offset.
 * Return => milliseconds.
 */
function dateSetTimezoneOffset(time,minutes) { 
    var _minutes;
    if (time.timezoneOffset == _minutes) {
        _minutes = time.getTimezoneOffset();
    } else {
        _minutes = time.timezoneOffset;
    }
    if (arguments.length) {
        time.timezoneOffset = minutes;
    } else {
        time.timezoneOffset = minutes = time.getTimezoneOffset();
    }
     return time.setTime(time.getTime() + (_minutes - minutes) * 6e4);
	return time;
};


describe('Basic parsing', function () {
	describe('Dates', function () {
		it('converts to same date', function () {
			const o = parse( "2020-01-01T12:00:00.123456789Z" ).getTime();
			expect(o).to.equal( new Date( "2020-01-01T12:00:00.123456789Z" ).getTime() );
		});
		it('converts from the same date', function () {
			expect( function() {
			//	const result = dateSetTimezoneOffset( new Date( "2020-01-01T12:00:00.123456789Z" ), new Date().getTimezoneOffset() );//.toISOString();
			//  the result is a timezone local value... 'we know who you are!'
				 stringify( new Date( "2020-01-01T12:00:00.123456789Z" ) );
			} ).to.not.throw( Error );
		});
		it('converts to and from the same date', function () {
			const o = parse( stringify( parse("2020-01-01T12:00:00.123456789Z") ) ).toISOString();
			expect(o).to.equal( "2020-01-01T12:00:00.123Z" );
		});
        } );


	describe('BigInt', function () {
		it('converts to same', function () {
			const o = parse( "123n" );
			expect(o).to.equal( 123n );
		});
		it('converts from the same', function () {
			const o = stringify( 123n );
			expect( o ).to.equal( "123n" );
		});
		it('converts to and from the same', function () {
			const o = parse( stringify( parse("123n") ) );
			expect(o).to.equal( 123n );
		});
        } );

	describe('array Buffer', function () {
		it('converts to same', function () {
			const o = parse( "ab[AAAAAAAAAAAAAAAA]" );
			expect(o).to.deep.equal( new ArrayBuffer(12)  );
		});
		it('converts from the same', function () {
			const o = stringify( new ArrayBuffer(12) );
			expect( o ).to.equal( "ab[AAAAAAAAAAAAAAAA]" );
		});
		it('converts to and from the same', function () {
			const o = parse( stringify( parse("ab[AAAAAAAAAAAAAAAA]") ) );
			expect(o).to.deep.equal( new ArrayBuffer(12) );
		});
        } );


	describe('references', function () {
		it('converts to same', function () {
			const r = {};
			r.me = r; r.next = {prior:r};
			r.next.me = r.next;
			const o = parse( "{me:ref[],next:{me:ref['next'],prior:ref[]}}" );
			expect(o).to.deep.equal( r );
		});
		it('converts from the same', function () {
			const r = {};
			r.me = r; r.next = {prior:r};
			r.next.me = r.next;
			const o = stringify( r );
			expect( o ).to.equal( '{me:ref[],next:{me:ref["next"],prior:ref[]}}' );
		});
		it('converts to and from the same', function () {
			const o = parse( stringify( parse("123n") ) );
			expect(o).to.equal( 123n );
		});
        } );


})
