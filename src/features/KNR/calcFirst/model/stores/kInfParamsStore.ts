import { areAllParamsFilled, getActionName } from '@shared/lib/utils';
import { SetParams } from '@shared/types/param.ts';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { KInfParams } from '../../model/types/kInfParams.ts';

interface KInfStore {
    filled?: boolean;
    kInfParams: KInfParams;
    setKInfParam: <T extends keyof KInfParams>(key: T, value: number) => void;
    setKInfParams: (value: SetParams<KInfParams>) => void;
}

const kInfParamsDefaults: KInfParams = {
    uraniumTemperature: {
        name: 'T_U, K',
        description: 'Температура урана в Кельвинах',
        value: 0,
    },
    thermalUtilization: {
        name: 'θ, о.е',
        description: 'Коэффициент использования тепловых нейтронов',
        value: 0,
    },
    reproductionFactor: {
        name: 'η, шт',
        description: 'Число вторичных нейтронов на один акт захвата ураном-235',
        value: 0,
    },
    normalizedWaterVolume: {
        name: 'V_H2O, см^3',
        description: 'Объём воды, приведённый к нормальной плотности',
        value: 0,
    },
    normalizedUraniumVolume: {
        name: 'V_U, см^3',
        description: 'Объём урана, приведённый к нормальной плотности',
        value: 0,
    },
    fastFissionFactor: {
        name: 'ε, о.е',
        description: 'Коэффициент размножения на быстрых нейтронах',
        value: 0,
    },
    averageChord: {
        name: 'l̄, см',
        description: 'Усреднённая хорда ТВЭЛ',
        value: 0,
    },
    resonanceEscapeProbability: {
        name: 'φ, о.е',
        description: 'Вероятность избежать резонансного захвата',
        value: 0,
    },
    infiniteMultiplicationFactor: {
        name: 'k_∞, о.е',
        description: ' Коэффициент размножения в бесконечной среде',
        value: 0,
    },
};

export const useKInfParamsStore = create<KInfStore>()(
    devtools(
        immer((set) => ({
            kInfParams: kInfParamsDefaults,

            setKInfParam: (key, value) =>
                set(
                    (state) => {
                        state.kInfParams[key].value = value;
                        state.filled = areAllParamsFilled(state.kInfParams);
                    },
                    undefined,
                    getActionName('KInfParamsStore', `setKInfParam: ${key}`),
                ),

            setKInfParams: (params) =>
                set(
                    (state) => {
                        Object.keys(params).forEach((key) => {
                            const keyParam = key as keyof KInfParams;
                            state.kInfParams[keyParam].value = params[keyParam];
                        });

                        state.filled = areAllParamsFilled(state.kInfParams);
                    },
                    undefined,
                    getActionName('KInfParamsStore', `setKInfParams`),
                ),
        })),
    ),
);
