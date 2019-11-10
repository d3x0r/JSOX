
var JSOX = require( ".." )

console.log( "Thing is:", JSOX.stringify( "\ud800" ) );


process.stdin.on('data', processLine );

//var line = require( 'fs').readFileSync(0); // STDIN_FILENO = 0
//console.log(stdinBuffer.toString());

//process.stdin.pipe(require('split')()).on('data', processLine)
//processLine(line)

function processLine (line) { 
	console.log( "LINE:",line );
	line = line.toString( 'utf8' );

	console.log( "output 1:" );
	var out;
  { console.log( out = JSON.stringify(line.split(""))); }

	console.log( "output 2:", line, JSON.parse( out ) );
  {  const s = JSON.parse(out).join(""); console.log(s);  }

	console.log( "output 3:" );
  { console.log(out = JSOX.stringify(line.split(""))); }
	console.log( "output 4:" );
  {  const s = JSOX.parse(out).join(""); console.log(s);  }

}
