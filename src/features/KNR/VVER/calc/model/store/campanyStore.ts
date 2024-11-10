import { getActionName } from '@shared/lib/utils';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { CompanyParams, ComputedValues } from '../types/companyParams.ts';

interface CompanyStore {
    filled?: boolean;
    companyParams: CompanyParams;
    setCompanyParam: <T extends keyof CompanyParams>(
        key: T,
        value: CompanyParams[T],
    ) => void;
    setCompanyParams: (params: any) => void;
}

const createComputedValuesDefaults = (prefix: string): ComputedValues => ({
    z: {
        name: `${prefix}_z, o.e`,
        description: `${prefix} параметр z`,
        value: 0,
    },
    k_ef: {
        name: `${prefix}_k_ef, o.e`,
        description: `${prefix} эффективный коэффициент размножения`,
        value: 0,
    },
    reactorOperationalTime: {
        name: `${prefix}_t, сут`,
        description: `${prefix} время работы реактора`,
        value: 0,
    },
});

const companyParamsDefaults: CompanyParams = {
    company: createComputedValuesDefaults('Компания'),
    year: createComputedValuesDefaults('Год'),
    withoutPu: createComputedValuesDefaults('Без Pu'),
    middle: createComputedValuesDefaults('Среднее'),

    dN5: {
        name: 'dN5, %',
        description: 'Изменение концентрации U235',
        value: 0,
    },
};

export const useCompanyParamsStore = create<CompanyStore>()(
    devtools(
        immer((set) => ({
            companyParams: companyParamsDefaults,

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
                        Object.keys(params).forEach((groupKey) => {
                            const group =
                                params[groupKey as keyof typeof params];

                            if (typeof group === 'object') {
                                // Обрабатываем вложенные объекты (company, year, withoutPu, middle)
                                Object.keys(group).forEach((paramKey) => {
                                    const value =
                                        group[paramKey as keyof typeof group];
                                    if (
                                        groupKey in state.companyParams &&
                                        paramKey in
                                            state.companyParams[
                                                groupKey as keyof CompanyParams
                                            ]
                                    ) {
                                        (
                                            state.companyParams[
                                                groupKey as keyof CompanyParams
                                            ] as any
                                        )[paramKey].value = value;
                                    }
                                });
                            } else {
                                // Обрабатываем простые параметры (например, dN5)
                                if (groupKey in state.companyParams) {
                                    (
                                        state.companyParams[
                                            groupKey as keyof CompanyParams
                                        ] as any
                                    ).value = group;
                                }
                            }
                        });
                    },
                    undefined,
                    getActionName('CompanyParamsStore', 'setCompanyParams'),
                ),
        })),
    ),
);
