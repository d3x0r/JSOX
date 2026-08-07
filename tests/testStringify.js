
const JSOX=require('..');


const a = JSOX.stringify( { z:1
			, y:"123"
			, x:null
			, w:Infinity
			, v:NaN
			, f:false
			, '':''
			, get g() { return 0; }
			, t:true } )
                        console.log( "Result:", a );