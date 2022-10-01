
declare module '@test-bot/typings' {
    export type int = number;
    export type OrArray<T> = T extends undefined ? never[] : T[];
    export type OrPromise<T> = T | Promise<T>;
}
