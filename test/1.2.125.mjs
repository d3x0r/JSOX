

import JSOX from "../lib/jsox.mjs";


/*
process.on("beforeExit", ()=>{ console.log( "EXITING" ) } );
process.on("uncaughtException",(a,b)=>{
	console.log( "test", a, b );
} );

function describe(a,b) { return b() };
function it(a,b) { return b() };
let threw = null;
function expect(a) { if( "function" === typeof a ) { try { threw = null; a(); } catch(err){threw=err}; }
					 return ({ to: {deep:{  equal(b) { console.log( "did",a,"=",b);  } }
					, equal(b) { console.log( "did",a,"=",b); }
				  , throw(a) {console.log( "Success:error?", threw ) } } }); }
*/


describe('Added in 1.2.125', function () {

	it( 'handles does not double encode ref', function() {
		let expects;
		const states = [
        	[ { ch:'\\', go:1 }

                , { ch:'\'', go:4                	}

                , { ch:'"', go:5            		 }
                , { ch:'`', go:6                   }
                , { ch:'\r', go:10, break:0 }
                , { ch:'\n', go:12, break:0 }
                , { ch:null, go:0 }
                ]


					// 1 '\\'
                 ,[ { ch:'\\', go:0 }

                  , { ch:'\n', go:2, break:-1 }

                  , { ch:'\r', go:3,  break:-1 }
                  , { ch:null, go:0 }
                  ]
                 

                   // 2 '\\' \n'
		                  ,[ {ch:'\\', go:1 } // another escape
      		            , {ch:'\r', go:0 } // cr after newline, 
            		      , {ch:null, go:0 } // anything else is inline collected
                  		]
                   // 3 '\\' \r'
		                , [ { ch:'\\', go:1 }
      		            , { ch:'\n', go:10            			     }
            		      , { ch:null, go:0 } // anything else is inline collected
                  		]

					// 4 '\''
                		, [ {ch:'\\', go:7                           }
		                  , {ch:'\'', go:0 } // matches, go to find EOL state
      		            ]

                    // 5 '"'
                			 ,[ {ch:'\\', go:8                                 }
		                  , {ch:'"', go:0 } // matches, go to find EOL state
      		            ]
                   // 6 '`'
                		 ,[ {ch:'\\', go: 9                                } // escape, eat next
		                  , {ch:'`', go:0 } // matches, go to find EOL state
      		            ]

					// 7 '\'' .....  '\\' ?  // skip single escaped char, return to '
                                  , [ {ch:null, go:4 }
                                   ]

                // 8 '\'' .....  '\\' ?  // skip single escaped char, return to "
                                 ,[ {ch:null, go:5 }
                                 ]
                // 9 '\'' .....  '\\' ?  // skip single escaped char, return to `
                                , [ {ch:null, go:6 }
                                  ]
                                  
                 // 10 .... '\r'  // wait until \n to cut, or cut here 
                				,	[ {ch:'\n', go:	11										 }
                                , {ch:null, go:null }
				                  ]
                
                   // 11 .... '\r' '\n'
							            ,  [ {ch:null, go:null } // eol. cut here.
      							        ]
                  // 12 .... '\n'
                              ,[ {ch:'\r', go:13
                                  } // wait until next to cut.
                               , {ch:null, go:null } // eol. cut here
                               ]
                  // 13 .... '\n' '\r'  // eol. cut here
                              , [ {ch:null, go:null }
                                ]

                        ]

				for( let state of states ) {
					//console.log( "state:", state );
					for( let s = 0; s < state.length; s++ ) {
						//console.log( "Some other thing:", s, state[s] );
						if( "number" === typeof state[s].go )  {
							state[s].go = states[state[s].go];
						}
					}
				}
			const encode = JSOX.stringify( states, null, '\t' );
			if( encode.match( /refref/ ) ) expects = false;
			else expects = true;
			//console.log( "JSOX.stringify:", JSOX.stringify( states, null, '\t' ) );

		expect( expects ).to.equal(  true );
	} );


	
/*
	it( 'handles keyword at end of array', function() {
		const string = '[a,f]';
		const expects = JSOX.parse(string);

		expect( expects ).to.deep.equal(  ["a","f"] );

	} );
*/        
} );



