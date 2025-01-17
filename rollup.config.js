const nodeResolve = require('@rollup/plugin-node-resolve')
const resolve = ("function" === typeof nodeResolve )?nodeResolve:nodeResolve.nodeResolve;
const commonjs = require('@rollup/plugin-commonjs')
//const closure = require('rollup-plugin-closure-compiler' );
const terser = require('@rollup/plugin-terser')
//const gzip = require( 'rollup-plugin-gzip').default
const pkg = require('./package.json')

// Last time through gzip plugin refused to write compressed output.

module.exports = [
    // ES6 Modules Non-minified
    {
        input: 'lib/index.js',
        output: {
            file: pkg.browser.replace(/\.js$/, '.mjs'),
            format: 'esm',
        },
        plugins: [
            resolve(),//.nodeResolve(),
            commonjs(),
        ],
    },
    // ES6 Modules Minified
    {
        input: 'lib/index.js',
        output: {
            file: pkg.browser.replace(/\.js$/, '.min.mjs'),
            format: 'esm',
        },
        plugins: [
            resolve(),//.nodeResolve(),
            commonjs(),
            terser( ),
        ],
    },
    // ES6 Modules Minified
    {
        input: pkg.module,
        output: {
            file: pkg.module.replace(/\.mjs$/, '.min.mjs'),
				exports : 'named',
            format: 'esm',
        },
        plugins: [
            commonjs(),
            terser(),
        ],
    },
    // ES6 NonModule Minified
    {
        input: pkg.main,
        output: {
            file: pkg.main.replace(/\.js$/, '.min.js'),
				//exports : 'default',
            format: 'cjs',
        },
        plugins: [
            commonjs(),
            terser( {toplevel:false,mangle:{reserved :["exports"], properties:{undeclared :false, reserved :["begin","JSOX","exports"]}} } ),
        ],
    },
	/*
    // ES6 Modules Minified
    {
        input: pkg.module.replace(/\.mjs$/, '.min.mjs'),
        output: {
            file: pkg.module.replace(/\.mjs$/, '.min.mjs.gz'),
				exports : 'named',
            format: 'esm',
        },
        plugins: [
				gzip(),
        ],
    },
    // ES6 NonModule Minified
    {
        input: pkg.main.replace(/\.js$/, '.min.js'),
        output: {
            file: pkg.main.replace(/\.js$/, '.min.js.gz'),
				exports : 'named',
            format: 'cjs',
        },
        plugins: [
				gzip(),
        ],
    },
	*/
]