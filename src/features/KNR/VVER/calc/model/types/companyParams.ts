type ComputedValues = {
    z: number;
    reactorOperationalTime: number;
    k_ef: number;
};

export interface CompanyValues {
    company: ComputedValues;
    year: ComputedValues;
    withoutPu: ComputedValues;
    middle: ComputedValues;
}

export interface CompanyParams {
    computedValues: CompanyValues;
    dN5: number;
}
