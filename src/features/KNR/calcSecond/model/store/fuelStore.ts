import { areAllParamsFilled, getActionName } from '@shared/lib/utils';
import { SetParams } from '@shared/types/param.ts';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { FuelParams } from '../types/fuelParams';

interface FuelStore {
    filled?: boolean;
    fuelParams: FuelParams;
    setFuelParam: <T extends keyof FuelParams>(key: T, value: number) => void;
    setFuelParams: (value: SetParams<FuelParams>) => void;
}

const fuelParamsDefaults: FuelParams = {
    depletedUranium235Mass: {
        name: 'M_выг.U235, г',
        description: 'Масса выгоревшего урана-235 (г)',
        value: 0,
    },
    specificFuelConsumption: {
        name: 'B, г/МВт∙сут',
        description: 'Удельный расход горючего (г/МВт∙сут)',
        value: 0,
    },
    initialUranium235Mass: {
        name: 'M_U235, кг',
        description: 'Масса загруженного урана-235 в начале кампании (кг)',
        value: 0,
    },
    initialUranium238Mass: {
        name: 'M_U238, кг',
        description: 'Масса загруженного урана-238 в начале кампании (кг)',
        value: 0,
    },
    totalInitialUraniumMass: {
        name: 'M_U, кг',
        description: 'Масса загруженного урана в начале кампании (кг)',
        value: 0,
    },
    uraniumEnrichment: {
        name: 'X, %',
        description: 'Обогащение урана (%)',
        value: 0,
    },
    fuelBurnupPerCompany: {
        name: 'B_комп, МВт∙сут/кг',
        description: 'Глубина выгорания топлива за компанию (МВт∙сут/кг)',
        value: 0,
    },
    fuelBurnupPerYear: {
        name: 'B_год, МВт∙сут/кг',
        description: 'Глубина выгорания топлива за год (МВт∙сут/кг)',
        value: 0,
    },
    numberOfReloads: {
        name: 'N_перегр, шт',
        description: 'Количество перегрузок',
        value: 0,
    },
};

export const useFuelParamsStore = create<FuelStore>()(
    devtools(
        immer((set) => ({
            fuelParams: fuelParamsDefaults,

            setFuelParam: (key, value) =>
                set(
                    (state) => {
                        state.fuelParams[key].value = value;
                        state.filled = areAllParamsFilled(state.fuelParams);
                    },
                    undefined,
                    getActionName('FuelParamsStore', `setFuelParam: ${key}`),
                ),

            setFuelParams: (params) =>
                set(
                    (state) => {
                        Object.keys(params).forEach((key) => {
                            const keyParam = key as keyof FuelParams;
                            state.fuelParams[keyParam].value = params[keyParam];
                        });

                        state.filled = areAllParamsFilled(state.fuelParams);
                    },
                    undefined,
                    getActionName('FuelParamsStore', 'setFuelParams'),
                ),
        })),
    ),
);
