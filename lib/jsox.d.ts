export namespace JSOX {
    export let version: string;
    export { DateNS };
    export function escape(string: any): any;
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
    export function parse(msg: any, reviver: any): any;
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
    export function stringify(object: any, replacer: any, space: any): any;
}
declare class DateNS extends Date {
    constructor(a: any, b: any);
    ns: any;
}
export {};
