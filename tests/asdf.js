

var JSON6 = require( ".." )
var parse = JSON6.parse;

console.log( "RESULT:", parse( `{op:asdfb, id:tabuasdf8571jasu8=}` ) );

const msg = `{code:\"
console.log( \\\"Extending socket.\\\" );
const send_ = this.send.bind(this);
this.send = (msg)=>{
	console.log( \\\"hijacked send.\\\" );
	send_(msg);
};

const l = {
	data : null
};
\",id:XwqD541UTCowPhg3E1Dq7MPoIVh0MsfEAPyhzQBsji4=,op:init}`


console.log( "RESULT:", parse( msg ) );
