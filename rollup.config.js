const commonjs = require('@rollup/plugin-commonjs')
const { append } = require('rollup-plugin-insert')
const { terser } = require('rollup-plugin-terser')
const pkg = require('./package.json')

/**
 * @type {import('rollup').RollupOptions[]}
 */
module.exports = [
    // CommonJS Non-minified
    {
        input: pkg.module,
        output: {
            file: pkg.main,
            format: 'cjs',
        },
        plugins: [
            commonjs(),
            append('module.exports = (JSOX.JSOX = JSOX);'),
        ],
    },
    // CommonJS Minified
    {
        input: pkg.module,
        output: {
            file: pkg.main.replace(/\.js$/, '.min.js'),
            format: 'cjs',
        },
        plugins: [
            commonjs(),
            append('module.exports = (JSOX.JSOX = JSOX);'),
            terser(),
        ],
    },
]