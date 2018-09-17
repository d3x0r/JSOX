call google-closure-compiler.cmd --language_out NO_TRANSPILE   --js=jsox.js --js_output_file=jsox.es6.js 
call google-closure-compiler.cmd --language_out ECMASCRIPT3   --js=jsox.js --js_output_file=jsox.es3.js 
gzip -f jsox.es6.js
gzip -f jsox.es3.js