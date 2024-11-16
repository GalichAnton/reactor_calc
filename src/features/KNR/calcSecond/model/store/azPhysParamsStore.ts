import { areAllParamsFilled, getActionName } from '@shared/lib/utils';
import { SetParams } from '@shared/types/param.ts';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { AZPhysParams } from '../types/azPhysParams';

interface AZStore {
    filled?: boolean;
    azPhysParams: AZPhysParams;
    setAZPhysParam: <T extends keyof AZPhysParams>(
        key: T,
        value: number,
    ) => void;
    setAZPhysParams: (value: SetParams<AZPhysParams>) => void;
}

const azPhysParamsDefaults: AZPhysParams = {
    volume: {
        name: 'V, см³',
        description: 'Объём активной зоны (см³)',
        value: 0,
    },
    diameter: {
        name: 'D, см',
        description: 'Диаметр активной зоны (см)',
        value: 0,
    },
    geometricParameter: {
        name: 'B^2, см^-1',
        description: 'Геометрический параметр',
        value: 0,
    },
    numFuelAssemblies: {
        name: 'N_TVS, шт',
        description: 'Число ТВС (Тепловыделяющих сборок)',
        value: 0,
    },
    effectiveMultiplicationFactor: {
        name: 'k_eff, o.e',
        description: 'Эффективный коэффициент размножения',
        value: 0,
    },
    reactorReactivity: {
        name: 'ρ, o.e',
        description: 'Реактивность реактора',
        value: 0,
    },
};

export const useAZPhysParamsStore = create<AZStore>()(
    devtools(
        immer((set) => ({
            azPhysParams: azPhysParamsDefaults,

            setAZPhysParam: (key, value) =>
                set(
                    (state) => {
                        state.azPhysParams[key].value = value;
                        state.filled = areAllParamsFilled(state.azPhysParams);
                    },
                    undefined,
                    getActionName(
                        'AZPhysParamsStore',
                        `setAZPhysParam: ${key}`,
                    ),
                ),

            setAZPhysParams: (params) =>
                set(
                    (state) => {
                        Object.keys(params).forEach((key) => {
                            const keyParam = key as keyof AZPhysParams;
                            state.azPhysParams[keyParam].value =
                                params[keyParam];
                        });

                        state.filled = areAllParamsFilled(state.azPhysParams);
                    },
                    undefined,
                    getActionName('AZPhysParamsStore', 'setAZPhysParams'),
                ),
        })),
    ),
);
