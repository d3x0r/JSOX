export namespace JSOX {
    export let version: string;
    export { DateNS };
    export function escape(string: string): string;
    export { resetJSOX as reset };
    export function begin(cb: any, reviver: any): {
        fromJSOX         (prototypeName: string, o: any, f: any): void;
        registerFromJSOX (prototypeName: string, o: any): never;
        finalError       (): void;
        value            (): any;
        reset            (): void;
        usePrototype     (className: string, protoType: any): void;
        write            (msg: string): void;
        parse            (msg: string, reviver: reviver_cb ): any;
        _write           (msg: string, complete_at_end: boolean): number | void;
    };
    export function parse           (msg: string, reviver: reviver_cb): any;
    export function defineClass     (name: string, obj: any): void;
    export function toJSOX          (name: string, ptype: any, f: any): void;
    export function registerToJSOX  (name: string, ptype: any, f: any): void;
    export function fromJSOX        (prototypeName: string, o: any, f: any): void;
    export function registerFromJSOX(prototypeName: string, o: any): never;
    export function addType         (prototypeName: string, prototype: any, to: any, from: any): void;
    export function registerToFrom  (prototypeName: string, prototype: any): never;
    export function stringifier(): {
        defineClass            (name: string, obj: any): void;
        setDefaultObjectToJSOX (cb: any): void;
        isEncoding             (o: any): boolean;
        encodeObject           (o: any): string;
        stringify              (o: any, r: array | reviver_cb, s: string): string;
        setQuote               (q: string): void;
        registerToJSOX         (n: string, p: any, f: any): void;
        toJSOX                 (name: string, ptype: any, f: any): void;
        ignoreNonEnumerable: boolean;
    };
    export function stringify(object: any, replacer: array | replacer_cb, space: string): string;
}
declare class DateNS extends Date {
    constructor(a: any, b: any);
    ns: number;
}
declare function resetJSOX(): void;
declare function parse_cb( obj:any ): any;
declare function reviver_cb( key:string, value:any ): any;
declare function replacer_cb( key: string, value:any ): any;
export {};
