declare type Nothing = void;
declare type Just<T = unknown> = T;
declare type Maybe<T = unknown> = Just<T> | Nothing;
declare function Nothing(): Nothing;
declare function Just<T = unknown>(value: any): Just<T>;
declare function mjn<T = any>(obj: any, path: string, fallback?: T): Maybe<T>;
export default mjn;
