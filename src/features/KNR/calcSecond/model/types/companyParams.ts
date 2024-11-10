import { Param } from '@shared/types/param.ts';

export type ComputedValues = {
    z: Param;
    reactorOperationalTime: Param;
    k_ef: Param;
};

export interface CompanyParams {
    company: ComputedValues;
    year: ComputedValues;
    withoutPu: ComputedValues;
    middle: ComputedValues;
    dN5: Param;
}