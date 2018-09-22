const JSOX = require( "../.." );

var FS = require('fs');

// Modeled off of (v0.6.18 link; check latest too):
// https://github.com/joyent/node/blob/v0.6.18/lib/module.js#L468-L472
require.extensions['.jsox'] = function (module, filename) {
    var content = FS.readFileSync(filename, 'utf8');
    module.exports = JSOX.parse(content);
};


function stringTest(init) {
	var _private = init;
	Object.assign( this, {	
		set Value(val) {
			_private = val;	
		},
		get Value() {
			return _private;
		}
		
	});
}
stringTest.prototype.toString = function() {
	return '"' + this.Value + '"';
}

JSOX.registerFromJSOX( "stringTest", function() {
	console.log( "Resuurect from String:[%s]", this );
	return new stringTest( this );
} );

JSOX.registerToJSOX( "stringTest", stringTest.prototype, stringTest.prototype.toString );

JSOX.registerFromJSOX( "arrayTest", function() {
	console.log( "Resuurect from Array:[%s]", JSON.stringify(this ));
	return this;
} );
JSOX.registerFromJSOX( "objectTest", function() {
	console.log( "Resuurect from Object:[%s]", this );
	return this;
} );

function Color(init) {
	if( init ) {
		var c = Number(init );
		this.r = ( c / 0x10000 ) &0xFF;
		this.g = ( c / 0x100 ) &0xFF;
		this.b = ( c / 0x1 )  &0xFF;
	} else {
		this.r=1;
		this.g=2;
		this.b=3;
	}
	this.toString = function() { return '"' + (this.r*0x10000 + this.g*0x100 + this.b) + '"' }
}

JSOX.registerToFrom( "color", Color.prototype
	, function() { console.log( "calling tojsox?", this ); return this.toString(); }
	, function() {
		console.log( "Resuurect from String:[%s]", this );
		return new Color(this);
	}
);


for( var n = 2; n < process.argv.length; n++ ) {
	loadFile(n);
	function loadFile( n ) {
		var content = FS.readFileSync(process.argv[n], 'utf8');

		function logObject( obj ) {
			console.log( "OUT:", obj );
			console.log( "ENC:", JSOX.stringify( obj ) );
			console.log( "ENC:", JSOX.stringify( obj, null, 3 ) );
		}
		console.log( "File:", process.argv[n] );
		var parser = JSOX.begin( logObject );
		parser.write( content );
	}
}
