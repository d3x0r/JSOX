
var JSOX = require( "../.." )

function Node() {
	this.ID = "abc1567";
}

JSOX.registerToFrom( "exref", Node.prototype
	, function() {
		console.log( "encode object from Object: %s", JSON.stringify(this) );
		return '\"abc1234=\"';
        }
	, function() {
		console.log( "Resuurect from Array: %s", this );
		return this;
	} );

JSOX.registerToFrom( "exref2", {ID:undefined}
	, function() {
		console.log( "encode extref2 from Array: %s", JSON.stringify(this) );
		return '\"azz5534=\"';
        }
	, function() {
		console.log( "Resuurect from Array:[%s]", this );
		return this;
	} );

var stringify = JSOX.stringify;
var parse = JSOX.parse;

var o = { n:new Node(), m:{ ID:"aabbcc123"} };
console.log( stringify( o ) );
