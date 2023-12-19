export class DateNS extends Date {
    constructor(a: any, b: any);
    ns: any;
}
declare function resetJSOX(): void;
export namespace JSOX {
    export { JSOX };
}
export declare let version: string;
/**
 * @param {string} string
 * @returns {string}
 */
export declare function escape(string: string): string;
export declare function begin(cb: any, reviver: any): {
    fromJSOX(prototypeName: any, o: any, f: any): void;
    registerFromJSOX(prototypeName: any, o: any): never;
    finalError(): void;
    value(): any;
    reset(): void;
    usePrototype(className: any, protoType: any): void;
    write(msg: any): void;
    parse(msg: any, reviver: any): any;
    _write(msg: any, complete_at_end: any): number | void;
};
/**
 * @param {string} msg
 * @param {(this: unknown, key: string, value: unknown) => any} [reviver]
 * @returns {unknown}
 */
export declare function parse(msg: string, reviver?: (this: unknown, key: string, value: unknown) => any): unknown;
export declare function defineClass(name: any, obj: any): void;
export declare function toJSOX(name: any, ptype: any, f: any): void;
export declare function registerToJSOX(name: any, ptype: any, f: any): void;
export declare function fromJSOX(prototypeName: any, o: any, f: any): void;
export declare function registerFromJSOX(prototypeName: any, o: any): never;
export declare function addType(prototypeName: any, prototype: any, to: any, from: any): void;
export declare function registerToFrom(prototypeName: any, prototype: any): never;
export declare function stringifier(): {
    defineClass(name: any, obj: any): void;
    setDefaultObjectToJSOX(cb: any): void;
    isEncoding(o: any): boolean;
    encodeObject(o: any): any;
    stringify(o: any, r: any, s: any): any;
    setQuote(q: any): void;
    registerToJSOX(n: any, p: any, f: any): void;
    toJSOX(name: any, ptype: any, f: any): void;
    ignoreNonEnumerable: boolean;
};
/**
 * @param {unknown} object
 * @param {(this: unknown, key: string, value: unknown)} [replacer]
 * @param {string | number} [space]
 * @returns {string}
 */
export declare function stringify(object: unknown, replacer?: (this: unknown, key: string, value: unknown) => any, space?: string | number): string;
export { resetJSOX as reset };
