const JSOX = require( "../.." );

var FS = require('fs');

//console.log( "Magic?", JSOX.stringify(global,null,3));

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

JSOX.fromJSOX( "stringTest", null, function() {
	console.log( "Resuurect from String:[%s]", this );
	return new stringTest( this );
} );

JSOX.toJSOX( "stringTest", stringTest.prototype, stringTest.prototype.toString );

JSOX.fromJSOX( "arrayTest", null, function() {
	console.log( "Resuurect from Array:[%s]", this );
	return this;
} );
JSOX.fromJSOX( "objctTest", null, function() {
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

JSOX.addType( "color", Color
	, function() { console.log( "calling tojsox?", this ); return this.toString(); }
	, function() {
		console.log( "Resurrect from String:[%s]", this );
		return new Color(this);
	}
);


// Modeled off of (v0.6.18 link; check latest too):
// https://github.com/joyent/node/blob/v0.6.18/lib/module.js#L468-L472
require.extensions['.jsox'] = function (module, filename) {
    var content = FS.readFileSync(filename, 'utf8');
    module.exports = JSOX.parse(content);
};

for( var n = 2; n < process.argv.length; n++ ) {
	var object = require( process.argv[n] );
	console.log( "OUT:", process.argv[n], object );
	console.log( "ENC:", JSOX.stringify( object ) );
	console.log( "ENC:", JSOX.stringify( object, null, 3 ) );
}


