call google-closure-compiler.cmd --language_out NO_TRANSPILE   --js=jsox.js --js_output_file=jsox.es6.js 
call google-closure-compiler.cmd --language_out ECMASCRIPT3   --js=jsox.js --js_output_file=jsox.es3.js 
call google-closure-compiler.cmd --language_out ECMASCRIPT3 --formatting=pretty_print --js=jsox.js --js_output_file=jsox.es3.pretty.js 
call google-closure-compiler.cmd --language_out NO_TRANSPILE --formatting=pretty_print --js=jsox.js --js_output_file=jsox.es6.pretty.js 
gzip -f jsox.es6.js
gzip -f jsox.es3.js