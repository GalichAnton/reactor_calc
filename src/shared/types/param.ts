export interface Param {
    name: string;
    description: string;
    value: number;
}

export type Params = Record<string, Param>;
