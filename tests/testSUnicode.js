
var JSOX = require( ".." )

process.stdin.on('data', processLine );

function processLine (line) { 
	line = line.toString( 'utf8' );
	var out;
  { console.log( out = JSON.stringify(line.split(""))); }
}
