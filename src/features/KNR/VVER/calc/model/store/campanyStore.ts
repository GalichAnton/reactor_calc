import { CompanyParams } from '@features/KNR/VVER/calc/model/types/companyParams.ts';
import { getActionName } from '@shared/lib/utils';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface CompanyStore {
    filled?: boolean;
    companyParams: CompanyParams;
    setCompanyParam: <T extends keyof CompanyParams>(
        key: T,
        value: CompanyParams[T],
    ) => void;
    setCompanyParams: (params: CompanyParams) => void;
}

const initialCompanyParams: CompanyParams = {
    computedValues: {
        company: {
            z: 0,
            k_ef: 0,
            reactorOperationalTime: 0,
        },
        year: {
            z: 0,
            k_ef: 0,
            reactorOperationalTime: 0,
        },
        withoutPu: {
            z: 0,
            k_ef: 0,
            reactorOperationalTime: 0,
        },
        middle: {
            z: 0,
            k_ef: 0,
            reactorOperationalTime: 0,
        },
    },
    dN5: 0,
};

export const useCompanyParamsStore = create<CompanyStore>()(
    devtools(
        immer((set) => ({
            companyParams: initialCompanyParams,

            setCompanyParam: (key, value) =>
                set(
                    (state) => {
                        state.companyParams[key] = value;
                    },
                    undefined,
                    getActionName('CompanyParamsStore', 'setCompanyParam'),
                ),

            setCompanyParams: (params) =>
                set(
                    (state) => {
                        state.companyParams.computedValues =
                            params.computedValues;
                        state.companyParams.dN5 = params.dN5;
                        state.filled = true;
                    },
                    undefined,
                    getActionName('CompanyParamsStore', 'setCompanyParams'),
                ),
        })),
    ),
);
