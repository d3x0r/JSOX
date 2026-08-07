

var JSON6 = require( ".." );
const parse = JSON6.parse;

		var results = [];
		var parser = JSON6.begin(function (obj) {
			console.log( "Got value:", typeof obj, ":", obj );
			results.push(obj);
		});

if(0){
		parser.write( '"This ' );
		parser.write( 'is a Test"' );

		parser.write( '[1234,12');
		parser.write( '34,1234]');

		parser.write( '[123,4');
		parser.write( '56,78');
		parser.write( '9,"abc","de');
		parser.write( 'f","ghi"]');


		parser.write( 'true false null undefined NaN Infinity' );

		parser.write( " 1 " );
		parser.write( "123" );
		parser.write( '"1"' );

		parser.write( '{ a:12' );
		parser.write( '34 }' );

		parser.write( '{ long');
		parser.write( 'key:1234 }' );

		parser.write( '{ a:1234 }' );

		parser.write( '{ a:1234 }{ b:34 }{c:1}{d:123}' );
}
	parser.write( "{\"a\":{\"b\":{\"c\":{\"d\":123}, e:456}, f:789}, g: 987}" );


	console.log( "Got:", JSON.stringify(results,null,"\t" ) );

			//o = parse( "-Infinity-" );
                        //console.log( "?", o );
			o = parse( "{ a b:1 }" );
                        console.log( "?", o );



console.log( parse( "{ my- key:3}" ) );
console.log( parse( "{ my - key:3}" ) );
