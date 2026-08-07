var JSOX = require( ".." );
//var start;

{
		console.log( JSON.parse( "-1234" ) );
		const start = Date.now();
		let result;
		for( let m = 0; m < 40; m++ ) {
			console.log( "Tick m:", m );
			for( let n = 0; n < 100000; n++ )
				result = JSON.parse( "-1234" );
		}
		console.log( "took:", Date.now() - start );
}
		//expect(result).to.equal(-1234);

{
		console.log( JSOX.parse( "-1234" ) );
		const start = Date.now();
		let result;
		for( let m = 0; m < 40; m++ ) {
			console.log( "Tick m:", m );
			for( let n = 0; n < 100000; n++ )
				result = JSOX.parse( "-1234" );
		}
		console.log( "took:", Date.now() - start );
		//expect(result).to.equal(-1234);

}