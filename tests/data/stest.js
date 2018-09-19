const JSOX = require( "../.." );

var FS = require('fs');

// Modeled off of (v0.6.18 link; check latest too):
// https://github.com/joyent/node/blob/v0.6.18/lib/module.js#L468-L472
require.extensions['.jsox'] = function (module, filename) {
    var content = FS.readFileSync(filename, 'utf8');
    module.exports = JSOX.parse(content);
};


for( var n = 2; n < process.argv.length; n++ ) {
	loadFile(n);
	function loadFile( n ) {
		var content = FS.readFileSync(process.argv[n], 'utf8');

		function logObject( obj ) {
			console.log( "OUT:", obj );
			console.log( "ENC:", JSOX.stringify( obj ) );
		}
		console.log( "File:", process.argv[n] );
		var parser = JSOX.begin( logObject );
		parser.write( content );
	}
}
