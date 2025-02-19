export default JSOX;
export namespace JSOX {
    export { JSOX };
    export let version: string;
    export { DateNS };
    /**
     * SACK jsox compatibility; hands maps to internal C++ code in other case.
     * @internal
     */
    export function updateContext(): void;
    /**
     * Provide minimal escapes for a string to be encapsulated as a JSOX string in quotes.
     *
     * @param {string} string
     * @returns {string}
     */
    export function escape(string: string): string;
    /**
     * reset JSOX parser entirely; clears all type mappings
     *
     * @returns {void}
     */
    export function reset(): void;
    /**
     * Create a streaming parser.  Add data with parser.write(data); values that
     * are found are dispatched to the callback.
     *
     * @param {(value:any) => void} [cb]
     * @param {(this: any, key: string, value: any) => any} [reviver]
     * @returns {JSOXParser}
    */
    export function begin(cb?: (value: any) => void, reviver?: (this: any, key: string, value: any) => any): JSOXParser;
    /**
     * parse a string resulting with one value from it.
     *
     * @template T
     * @param {string} msg
     * @param {(this: any, key: string, value: any) => any} [reviver]
     * @returns {T}
     */
    export function parse<T>(msg: string, reviver?: (this: any, key: string, value: any) => any): T;
    /**
     * Define a class to be used for serialization; the class allows emitting the class fields ahead of time, and just provide values later.
     * @param {string} name
     * @param {object} obj
     */
    export function defineClass(name: string, obj: object): void;
    /**
     * deprecated; define a class to be used for serialization
     *
     * @param {string} named
     * @param {class} ptype
     * @param {(any)=>any} f
     */
    export function registerToJSOX(name: any, ptype: class, f: (any: any) => any): never;
    /**
     * define a class with special serialization rules.
     *
     * @param {string} named
     * @param {class} ptype
     * @param {(any)=>any} f
     */
    export function toJSOX(name: any, ptype: class, f: (any: any) => any): void;
    /**
     * define a class to be used for deserialization
     * @param {string} prototypeName
     * @param {class} o
     * @param {(any)=>any} f
     */
    export function fromJSOX(prototypeName: string, o: class, f: (any: any) => any): void;
    /**
     * deprecated; use fromJSOX instead
     */
    export function registerFromJSOX(prototypeName: any, o: any): never;
    /**
     * Define serialization and deserialization methods for a class.
     * This is the same as registering separately with toJSOX and fromJSOX methods.
     *
     * @param {string} name - Name used to prefix objects of this type encoded in JSOX
     * @param {class} prototype - prototype to match when serializing, and to create instaces of when deserializing.
     * @param {(stringifier:JSOXStringifier)->{string}} to - `this` is the value to convert; function to call to encode JSOX from an object
     * @param {(field:string,val:any)->{any}} from - handle storing revived value in class
     */
    export function addType(prototypeName: any, prototype: class, to: any, from: any): void;
    export function registerToFrom(prototypeName: any, prototype: any): never;
    /**
     * Create a stringifier to convert objects to JSOX text.  Allows defining custom serialization for objects.
     * @returns {Stringifier}
     */
    export function stringifier(): Stringifier;
    /**
     * @param {unknown} object
     * @param {(this: unknown, key: string, value: unknown)} [replacer]
     * @param {string | number} [space]
     * @returns {string}
     */
    export function stringify(object: unknown, replacer?: (this: unknown, key: string, value: unknown) => any, space?: string | number): string;
}
/**
 * Extend Date type with a nanosecond field.
 * @constructor
 * @param {Date} original_date
 * @param {Number} nanoseconds in milli-seconds of Date ( 0 to 1_000_000 )
 */
declare class DateNS extends Date {
    constructor(a: any, b: any);
    ns: any;
}
