import { Param } from '@shared/types/param.ts';

export type ComputedValues = {
    z: Param;
    reactorOperationalTime: Param;
    k_ef: Param;
    reactivity: Param;
};

export interface CompanyParams {
    company: ComputedValues;
    year: ComputedValues;
    withoutPu: ComputedValues;
    middle: ComputedValues;
    otr: ComputedValues;
    fuelCompany: ComputedValues;

    dN5: Param;
}
