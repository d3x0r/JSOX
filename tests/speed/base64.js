

// Converts an ArrayBuffer directly to base64, without any intermediate 'convert to string then
// use window.btoa' step. According to my tests, this appears to be a faster approach:
// http://jsperf.com/encoding-xhr-image-data/5
// doesn't have to be reversable....
const encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$_'
const decodings = { '=':0 };
var u8 = '';


for( var x = 0; x < 256; x++ ) {
	if( x < 64 ) {
		decodings[encodings[x]] = x;
		u8 += String.fromCharCode(x);
	}
	else if( x < 128 ) {
		u8 += String.fromCharCode(x);
	}
	else {
		u8 += String.fromCharCode(x);
	}
}
//console.log( "u8 is...", u8 );

const encodingTables = { 
	ch1 : [],
	ch2 : [],
	ch3 : [],
}

for( var r = 0; r < 4; r++ ) {
	encodingTables.ch2[r] = [];
}
for( var r = 0; r < 16; r++ ) {
	encodingTables.ch3[r] = [];
}

for( var n = 0; n < 256; n++ ) {
	let tmp;
	// use 6 bits (1 full char)
	encodingTables.ch1[n] = { str : encodings[n>>2], rem : n >> 6 };
	// use 2 bits + 4 bits of next (1 char)
	for( var r = 0; r < 4; r++ ) {
		tmp = ( r << 4 ) + (( n & 0xF0 ) >> 4);
		encodingTables.ch2[r][n] = { str : encodings[tmp], rem : n >> 4 };
	}
	// 
	for( var r = 0; r < 16; r++ ) {
		tmp = ( r << 2 ) + (( n & 0x3 ) );
		encodingTables.ch3[r][n] = { str : encodings[tmp ] + encodings[n>>2], rem : 0 };
	}
}

encodingTables.ch1[256] = { str : "=", rem : 0 };
for( var r = 0; r < 4; r++ ) {
	encodingTables.ch2[r][256] = { str : "=", rem : 0 };
}
for( var r = 0; r < 16; r++ ) {
	encodingTables.ch3[r][256] = { str : "=", rem : 0 };
}

console.log( "TABLE:", JSON.stringify( encodingTables, null, 3 ) );
Object.seal( encodingTables );
Object.seal( encodingTables.ch1 );
Object.seal( encodingTables.ch2 );
Object.seal( encodingTables.ch3 );

function base64ArrayBuffer2(arrayBuffer) {
  var base64    = ''

  var bytes         = new Uint8Array(arrayBuffer)

  var a, b, c, d
  var chunk
  //throw "who's using this?"
  //console.log( "buffer..", arrayBuffer )
  // Main loop deals with bytes in chunks of 3
  for (var i = 0; i < bytes.byteLength; i = i + 3) {
    var x;
    if( ( i + 2 ) < bytes.byteLength ) {
	base64 += ( x = encodingTables.ch1[bytes[i+2]] ).str;
	base64 += ( x = encodingTables.ch2[x.rem][bytes[i+1]] ).str;
	base64 += ( x = encodingTables.ch3[x.rem][bytes[i+0]] ).str;
    }
    else if( ( i + 1 ) < bytes.byteLength )  {
	base64 += ( x = encodingTables.ch1[bytes[i+1]] ).str;
	base64 += ( x = encodingTables.ch2[x.rem][bytes[i+0]] ).str;
	base64 += ( x = encodingTables.ch3[x.rem][256] ).str;
    }
    else {
	base64 += ( x = encodingTables.ch1[bytes[i]] ).str;
	base64 += ( x = encodingTables.ch2[x.rem][256] ).str;
	base64 += ( x = encodingTables.ch3[x.rem][256] ).str;
    }
  }
  return base64
}

function base64ArrayBuffer(arrayBuffer) {
  var base64    = ''

  var bytes         = new Uint8Array(arrayBuffer)
  var byteLength    = bytes.byteLength
  var byteRemainder = byteLength % 3
  var mainLength    = byteLength - byteRemainder

  var a, b, c, d
  var chunk
  //throw "who's using this?"
  //console.log( "buffer..", arrayBuffer )
  // Main loop deals with bytes in chunks of 3
  for (var i = 0; i < mainLength; i = i + 3) {
    // Combine the three bytes into a single integer
    chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2]

    // Use bitmasks to extract 6-bit segments from the triplet
    a = (chunk & 16515072) >> 18 // 16515072 = (2^6 - 1) << 18
    b = (chunk & 258048)   >> 12 // 258048   = (2^6 - 1) << 12
    c = (chunk & 4032)     >>  6 // 4032     = (2^6 - 1) << 6
    d = chunk & 63               // 63       = 2^6 - 1

    // Convert the raw binary segments to the appropriate ASCII encoding
    base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d]
  }

  // Deal with the remaining bytes and padding
  if (byteRemainder == 1) {
    chunk = bytes[mainLength]
    a = (chunk & 252) >> 2 // 252 = (2^6 - 1) << 2
    // Set the 4 least significant bits to zero
    b = (chunk & 3)   << 4 // 3   = 2^2 - 1
    base64 += encodings[a] + encodings[b] + '=='
  } else if (byteRemainder == 2) {
    chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1]
    a = (chunk & 64512) >> 10 // 64512 = (2^6 - 1) << 10
    b = (chunk & 1008)  >>  4 // 1008  = (2^6 - 1) << 4
    // Set the 2 least significant bits to zero
    c = (chunk & 15)    <<  2 // 15    = 2^4 - 1
    base64 += encodings[a] + encodings[b] + encodings[c] + '='
  }
  //console.log( "dup?", base64)
  return base64
}


function DecodeBase64( out, buf )
{
	{
		var n;
		var l = (buf.length+3)/4;
		for( n = 0; n < l; n++ )
		{
			var index0 = decodings[buf[n*4]];
			var index1 = decodings[buf[n*4+1]];
			var index2 = decodings[buf[n*4+2]];
			var index3 = decodings[buf[n*4+3]];
			
			out[n*3+0] = (( index0 ) << 2 | ( index1 ) >> 4);
			out[n*3+1] = (( index1 ) << 4 | ( ( ( index2 ) >> 2 ) & 0x0f ));
			out[n*3+2] = (( index2 ) << 6 | ( ( index3 ) & 0x3F ));
		}
	}
}



var n;
var m;
var ab = new ArrayBuffer( 12000 );
var u8;
for( m = 0; m < 10000; m++ ) {
	ab = new ArrayBuffer( m * 1000 );
	u8 = new Uint8Array( ab );
	for( var x = 0; x < m*1000; x++ ) u8[x] = x & 0xFF;
	var start;
	var r;
	start = Date.now();
	for( n = 0; n < 10000; n++ ) {
        	r = base64ArrayBuffer(ab );
		if( !n ) console.log( "r:", r );
        }
        console.log( "Try is:", m, Date.now() - start );
        
	start = Date.now();
	for( n = 0; n < 10000; n++ ) {
        		r = base64ArrayBuffer2(ab );
		if( !n ) console.log( "r:", r );
        }
        console.log( "Try2 is:", m, Date.now() - start );
}


