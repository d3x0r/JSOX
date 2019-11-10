
var JSOX = require( ".." )

process.stdin.on('data', processLine );

//var line = require( 'fs').readFileSync(0); // STDIN_FILENO = 0
//console.log(stdinBuffer.toString());

//process.stdin.pipe(require('split')()).on('data', processLine)
//processLine(line)

function processLine (line) { 
	line = line.toString( 'utf8' );
  {  const s = JSON.parse(line).join(""); console.log(s);  }
}

