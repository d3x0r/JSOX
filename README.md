# JSOX – JavaScript Object eXchange format.

 (PESON) Programmable ECMA Script Object Notation for Humans

[![Join the chat at https://gitter.im/sack-vfs/jsox](https://badges.gitter.im/sack-vfs/jsox.svg)](https://gitter.im/sack-vfs/jsox?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

100% Compatible reader for JSON.  Stringify may be JSON output compatible;
but then there will be other methods for outputing JSOX.

JSOX Adds processing of `tag` keywords, which influences the states in the
parser; and a prefix 'type' for data.  Example: `v{ x, y } { a : v{a,b} }`.
It defines a template/class of object that has fields 'x', and 'y'.  Then
defines an object with a field A what is a object of type 'v', with values
'a', and 'b'.  This example does not gain any visible savings; savings 
comes when you have a lot of the same sort of record with the same field
names repeated often.

 * adds macro/class support for object field names.
 * adds support for bigint numbers; indicated with an 'n' suffix.
 * adds support for Date parsing and stringification.

### Example Encoding

```
r = JSOX.stringify( { 
	a: "simple object"
	, b:3
	, c:new Date()
	, d:123n
	, e:null
	, f:undefined
	, g:NaN
	, h:Infinity
	, i:-Infinity
	, j:-0.302 } );

// r = 
{a:"simple object",b:3,c:2018-09-11T23:04:40-07:00,d:123n,e:null,g:NaN,h:Infinity,i:-Infinity,j:-0.302}

// or with space = 3 
{
   a: "simple object",
   b: 3,
   c: 2018-09-11T23:06:09-07:00,
   d: 123n,
   e: null,
   g: NaN,
   h: Infinity,
   i: -Infinity,
   j: -0.302
}

```

**JSOX is a proposed extension to JSON** that aims to make it easier for
*humans to write and maintain* by hand. It does this by adding some minimal
syntax features directly from ECMAScript 6.

JSOX is a **(super-sub)set of JavaScript**, although adds **no new data types**,
and **works with all existing JSON content**. Some features allowed in JSOX
are not directly supported by Javascript; although all javascript parsable
features can be used in JSOX, except functions or any other code construct, 
transporting only data save as JSON.  Most ES6 structure can be parsed, 
with the extension of classes/tags the reverse is not true.  It was true for
JSON6.

JSOX is a proprosal for an official successor to JSON, and JSOX stringified content *will not*
work with existing JSON parsers. For this reason, JSOX files use a new .jsox
extension. *(TODO: new MIME type needed too.)*

The code is a **reference JavaScript implementation** for both Node.js
and all browsers. The code is derrived from JSON-6 sources.

## Why

Beyond the existing reasons for JSON5/JSON6 for their modifications; this
addresses the biggest shortcoming of JSON, which is the repetitive and redundant
specification of field names; especially when lots of the same sort of object
is represented.

This also aims to provide support for BigInt and Date format for less work
at the application layer.  **A method for handling typed array object members
should also be impelemented**

(Historic Why below)

JSON isn’t the friendliest to *write*. Keys need to be quoted, objects and
arrays can’t have trailing commas, and comments aren’t allowed — even though
none of these are the case with regular JavaScript today.

That was fine when JSON’s goal was to be a great data format, but JSON’s usage
has expanded beyond *machines*. JSON is now used for writing [configs][ex1],
[manifests][ex2], even [tests][ex3] — all by *humans*.

[ex1]: http://plovr.com/docs.html
[ex2]: https://www.npmjs.org/doc/files/package.json.html
[ex3]: http://code.google.com/p/fuzztester/wiki/JSONFileFormat

There are other formats that are human-friendlier, like YAML, but changing
from JSON to a completely different format is undesirable in many cases.
JSON6’s aim is to remain close to JSON and JavaScript.


## Features

The following is the exact list of additions to JSON’s syntax introduced by
JSOX. **All of these are optional**.

 - Concise representation of dates and times including as much information as is
available for the timestamp(timezone).  

 - Supports encode and decode of BigInt numbers with no application overhead. 
 - reduces overhead from none-requires quotes for identifiers.
 - can further reduce overall output size by using class tags ( Needs internal
implementation; although users can generate output simply ).

## Caveats

JSOX.stringify will produce output that JSON.parse cannot handle; JSOX.parse
can always handle JSON.stringify.

### Summary of Changes from JSON6

  - BigInt encoding
  - ISO date/time Encoding/decoding (as part of Number format)
  - Adds classes/tags to reduce redundant information.

### Summary of Changes from JSON5/JSON

  - Keyword undefined
  - Objects/Strings back-tick quoted strings (no template support, just quotes); Object key names can be unquoted.
  - Strings - generous multiline string definition; all javascript character escapes work. \(\x##, \0###, \u####, \u\{\} \)
  - Numbers - underscore digit separation in numbers, octal and binary formats; all javascript number notations.
Addtionally support leading 0 to interpret as octal as C, C++ and other languages support.
  - Arrays - empty members
  - Streaming reader interface
  - (Twice the speed of JSON5; subjective)

### Classes/Tags

The definition of a class is an identifer at the top level (before the JSON data) followed by an open brace ('{').
Within the open brace '{' until the close '}' is a list of names seprated by commas, and of constants indicated
by an identifier followed by a colon and a value.

```

tagdef : identifier '{' identifier [ ',' identifier ] ... '}'
tagdef : identifier '{' constant_initializer [ ',' identifier ] ... '}'

constant_initializer : identifier ':' value 

```

Usage of tags is done by specifing their identifer followed by an open brace '{' in the value 
field of an object definition; or at a top level referencing the same tag name already defined.
For each field defined in the class, a value is expected.  If a value is not found, the field
will not be added, as if receiving `field:undefined`.


```

tag usage : ':' identifier '{' value [ ',' value ]... '}' 

//-- the following...
a { firstField, secondField }
a { 1, 2 }
//-- results as
{ firstField : 1, secondField : 2 }


//-- the following...
a { firstField, secondField }
[ a { 1, 2 }, a(5,6), a("val1","val2") ]
//-- results as
[ { firstField : 1, secondField : 2 }, { firstField : 5, secondField : 6 }, { firstField : "val1", secondField : "val2" } ]

```

## Additional support above JSON base

All items listed below are JSON5 additions if not specifed as JSON6.


### Objects

- Object keys can be unquoted if they do not have ':', ']', '[', '{', '}', ',', any quote or whitespace.

- Object keys can be single-quoted, (**JSON6**) or back-tick quoted; any valid string 

- Object keys can be double-quoted (original JSON).

- Objects can have a single trailing comma. Excessive commas in objects will cause an exception. '{ a:123,,b:456 }' is invalid.

[mdn_variables]: https://developer.mozilla.org/en/Core_JavaScript_1.5_Guide/Core_Language_Features#Variables

### Arrays

- Arrays can have trailing commas. If more than 1 is found, additional empty elements will be added.

- (**JSON6**) Arrays can have comma ( ['test',,,'one'] ), which will result with empty values in the empty places.

### Strings

- Strings can be double-quoted (as per original JSON).

- Strings can be single-quoted.

- Strings can be back-tick (\`) ([grave accent](https://en.wikipedia.org/wiki/Grave_accent)) -quoted.

- Strings can be split across multiple lines; just prefix each newline with a
  backslash. [ES5 [§7.8.4](http://es5.github.com/#x7.8.4)]

- (**JSON6**) all strings will continue keeping every character between the start and end, this allows multi-line strings 
  and keep the newlines in the string; if you do not want the newlines they can be escaped as previously mentioned.

### Numbers

- (**JSOX**) BitInt numbers are stringified with suffix of 'n' as in ES(?), and implemented in V8(google/chrome/node) 2018/09/12.  BigInt number parsed with 'n' suffix.

- (**JSON6**) Numbers can have underscores separating digits '_' these are treated as zero-width-non-breaking-space. ([Proposal](https://github.com/tc39/proposal-numeric-separator) with the exception that _ can preceed or follow . and may be trailing.)

- Numbers can be hexadecimal (base 16).  ( 0x prefix )

- (**JSON6**) Numbers can be binary (base 2).  (0b prefix)

- (**JSON6**) Numbers can be octal (base 8).  (0o prefix)

- (**JSON6**) Numbers can be octal (base 8).  (0 prefix followed by more numbers, without a decimal)

- Numbers can begin or end with a (leading or trailing) decimal point.

- Numbers can include `Infinity`, `-Infinity`, `NaN`. 

- Numbers can begin with an explicit plus sign.

- Numbers can begin with multiple minus signs. For example '----123' === 123.

### Dates

- (**JSOX**) Encodes date time with local timestamp information to recover as much information as the original date contained.  Is treated as a subtype of Number parsing; and are stored without quotes.

### Keyword Values

- (**JSON6**) supports 'undefined' in addition to 'true', 'false', 'null'.

### Comments

- Both inline (single-line using '//' (todo:or '#'?) ) and block (multi-line using \/\* \*\/ ) comments are allowed.

### ArrayBuffer/TypedArray

- (**JSOX**) Open to support for transporting ArrayBuffer and TypedArray fields... This will probably be constants as tags applied prefixing and opening brace '['.
  - these are prefix tags that can be applied.  u8, u16, cu8, u32, s8,s16, s32, f32, f64, ab; the array contents is the byte values (0-255).

## Example

The following is a contrived example, but it illustrates most of the features:

```js
{
    foo: 'bar',
    while: true,
    nothing : undefined, // why not?

    this: 'is a \
multi-line string',

    thisAlso: 'is a
multi-line string; but keeps newline',

    // this is an inline comment
    here: 'is another', // inline comment

    /* this is a block comment
       that continues on another line */

    hex: 0xDEAD_beef,
    binary: 0b0110_1001,
    decimal: 123_456_789,
    octal: 0123,
    half: .5,
    delta: +10,
    negative : ---123,
    to: Infinity,   // and beyond!

    finally: 'a trailing comma',
    oh: [
        "we shouldn't forget",
        'arrays can have',
        'trailing commas too',
    ],
}
```

This implementation’s own [package.jsox](package.jsox) is more realistic:

```js
// This file is written in JSOX syntax, naturally, but npm needs a regular
// JSON file, so compile via `npm run build`. Be sure to keep both in sync!

{
    name: 'JSOX',
    version: '0.1.105',
    description: 'JSON for the ES6 era.',
    keywords: ['json', 'es6'],
    author: 'd3x0r <d3x0r@github.com>',
    contributors: [
        // TODO: Should we remove this section in favor of GitHub's list?
        // https://github.com/d3x0r/JSOX/contributors
    ],
    main: 'lib/JSOX.js',
    bin: 'lib/cli.js',
    files: ["lib/"],
    dependencies: {},
    devDependencies: {
        gulp: "^3.9.1",
        'gulp-jshint': "^2.0.0",
        jshint: "^2.9.1",
        'jshint-stylish': "^2.1.0",
        mocha: "^2.4.5"
    },
    scripts: {
        build: 'node ./lib/cli.js -c package.JSOX',
        test: 'mocha --ui exports --reporter spec',
            // TODO: Would it be better to define these in a mocha.opts file?
    },
    homepage: 'http://github.com/d3x0r/JSOX/',
    license: 'MIT',
    repository: {
        type: 'git',
        url: 'https://github.com/d3x0r/JSOX',
    },
}
```


## Community

Join the [Google Group](http://groups.google.com/group/JSOX) if you’re
interested in JSOX news, updates, and general discussion.
Don’t worry, it’s very low-traffic.

The [GitHub wiki](https://github.com/d3x0r/JSOX/wiki) (will be) a good place to track
JSOX support and usage. Contribute freely there!

[GitHub Issues](https://github.com/d3x0r/JSOX/issues) is the place to
formally propose feature requests and report bugs. Questions and general
feedback are better directed at the Google Group.


## Usage

This JavaScript implementation of JSOX simply provides a `JSOX` object just
like the native ES5 `JSON` object.

To use from Node:

```sh
npm install jsox
```

```js
var JSOX = require('jsox');
```

To use in the browser (adds the `JSOX` object to the global namespace):

```html
<script src="node_modules/json-6/lib/jsox.js"></script>
```

Then in both cases, you can simply replace native `JSON` calls with `JSOX`:

```js
var obj = JSOX.parse('{unquoted:"key",trailing:"comma",}');
var str = JSOX.stringify(obj); /* uses JSON stringify, so don't have to replace */
```

|JSOX Methods | parameters | Description |
|-----|-----|-----|
|parse| (string [,reviver]) | supports all of the JSOX features listed above, as well as the native [`reviver` argument][json-parse]. |
|stringify | ( value[,replacer[,space]] ) | converts object to JSOX.  [stringify][jsox-stringify] |
|stringifier | () | Gets a utility object that can stringify.  The object can have classes defined on it for stringification |
|escape | ( string ) | substitutes ", \, ', and ` with backslashed sequences. (prevent 'JSON injection') |
|begin| (cb [,reviver] ) | create a JSOX stream processor.  cb is called with (value) for each value decoded from input given with write().  Optional reviver is called with each object before being passed to callback. |


|Stringifier method | parameters | Description |
|-------|------|-----|
|defineClass | ( name, object ) | Defines a class using name 'name' and the fields in 'object'.  This allows defining for some pre-existing object |
|stringify | (value[,replacer[,space]] ) | converts object to JSOX attempting to match objects to classes defined in stringifier.  [stringify][jsox-stringify] |

[json-parse]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
[json-stringify]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify

### JSOX Streaming

A Parser that returns objects as they are encountered in a stream can be created.  `JSON.begin( dataCallback, reviver );`  The callback is called for each complete object in a stream of data that is passed.  

`JSOX.begin( cb, reviver )` returns an object with a few methods.

| Method | Arguments | Description | 
|:---|:---|:---|
| write | (string) | Parse string passed and as objects are found, invoke the callback passed to `begin()` Objects are passed through optional reviver function passed to `begin()`. |
| \_write | (string,completeAtEnd) | Low level routine used internally.  This does the work of parsing the passed string. Returns 0 if no object completed, 1 if there is no more data, and an object was completd, returns 2 if there is more data and a parsed object is found.  if completedAtEnd is true, dangling values are returned, for example "1234" isn't known to be completed, more of the number might follow in another buffer; if completeAtEnd is passed, this iwll return as number 1234.  Passing empty arguments steps to the next buffered input value. |
| value | () | Returns the currently completed object.  Used to get the completed object after calling \_write. |
| reset | () | If `write()` or `\_write()` throws an exception, no further objects will be parsed becuase internal status is false, this resets the internal status to allow continuing using the existing parser.  ( May require some work to actually work for complex cases) |


```js
   // This is (basically) the internal loop that write() uses.
   var result
   for( result = this._write(msg,false); result > 0; result = this._write() ) {
      var obj = this.value();
      // call reviver with (obj)
      // call callback with (obj)
   }
```

```js
// Example code using write
function dataCallback( value ) {
	console.log( "Value from stream:", value );
}
var parser = JSON.begin( dataCallback );

parser.write( '"Hello ' );   // a broken simple value string, results as 'Hello World!' 
parser.write( 'World!"' );
parser.write( '{ first: 1,' );   // a broken structure
parser.write( ' second : 2 }' );
parser.write( '[1234,12');  // a broken array across a value
parser.write( '34,1234]'); 
parser.write( '1234 456 789 123 523');  // multiple single simple values that are numbers
parser.write( '{a:1} {b:2} {c:3}');  // multiple objects

parser.write( '1234' );  // this won't return immediately, there might be more numeric data.
parser.write( '' ); // flush any pending numbers; if an object or array or string was split, throws an error; missing close.

parser.write( '1234' ); 
parser.write( '5678 ' );  // at this point, the space will flush the number value '12345678' 

```



### Extras

If you’re running this on Node, you can also register a JSOX `require()` hook
to let you `require()` `.jsox` files just like you can `.json` files:

```js
require('jsox/lib/require');
require('./path/to/foo');   // tries foo.jsox after foo.js, foo.json, etc.
require('./path/to/bar.jsox');
```

This module also provides a `jsox` executable (requires Node) for converting
JSOX files to JSON:

```sh
jsox -c path/to/foo.jsox    # generates path/to/foo.json
```

## Other Implementations

This is also implemented as part of npm [sack.vfs https://www.npmjs.com/package/sack.vfs] 
as a native code node.js addon.  This native javascript version allows usage in browsers.

## Benchmarks

This is as fast as the javascript version of Douglas Crockford's reference implementation [JSON
implementation][json_parse.js] for JSON parsing.  

This is nearly double the speed of [JSON5 http://json5.org] implementation that inspired this (which is half the speed of Crockford's reference implementation).

This is half the speed of the sack.vfs native C++ node addon implementation (which itself is half the speed of V8's native code implementation, but they can cheat and build strings directly).



## Development

```sh
git clone https://github.com/d3x0r/jsox
cd jsox
npm install
npm test
```

As the `package.jsox` file states, be sure to run `npm run build` on changes
to `package.jsox`, since npm requires `package.json`.

Feel free to [file issues](https://github.com/d3x0r/jsox/issues) and submit
[pull requests](https://github.com/d3x0r/JSOX/pulls) — contributions are
welcome. If you do submit a pull request, please be sure to add or update the
tests, and ensure that `npm test` continues to pass.


## Changelog
- 1.0.0 - Intial Release.


## License

MIT. See [LICENSE.md](./LICENSE.md) for details.


## Credits

(http://github.com/json5/json5)  Inspring this project.

[json_parse.js]: https://github.com/douglascrockford/JSON-js/blob/master/json_parse.js
