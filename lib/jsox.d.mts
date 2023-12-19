export namespace JSOX {
    export let version: string;
    export { DateNS };
    /**
     * @param {string} string
     * @returns {string}
     */
    export function escape(string: string): string;
    export { resetJSOX as reset };
    export function begin(cb: any, reviver: any): {
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
    export function parse(msg: string, reviver?: (this: unknown, key: string, value: unknown) => any): unknown;
    export function defineClass(name: any, obj: any): void;
    export function toJSOX(name: any, ptype: any, f: any): void;
    export function registerToJSOX(name: any, ptype: any, f: any): void;
    export function fromJSOX(prototypeName: any, o: any, f: any): void;
    export function registerFromJSOX(prototypeName: any, o: any): never;
    export function addType(prototypeName: any, prototype: any, to: any, from: any): void;
    export function registerToFrom(prototypeName: any, prototype: any): never;
    export function stringifier(): {
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
    export function stringify(object: unknown, replacer?: (this: unknown, key: string, value: unknown) => any, space?: string | number): string;
}
declare class DateNS extends Date {
    constructor(a: any, b: any);
    ns: any;
}
declare function resetJSOX(): void;
export {};
