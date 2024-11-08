export interface Param {
    name: string;
    description: string;
    value: number;
}

export type Params = Record<string, Param>;

export type SetParams<T> = {
    [K in keyof T]: T[K] extends { value: unknown } ? T[K]['value'] : never;
};
