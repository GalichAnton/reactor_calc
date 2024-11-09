import { areAllParamsFilled, getActionName } from '@shared/lib/utils';
import { SetParams } from '@shared/types/param.ts';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { ReactorCriticalityParams } from '../types/reactorCriticalityParamsParams.ts';

interface ReactorCriticalityStore {
    filled?: boolean;
    reactorCriticalityParams: ReactorCriticalityParams;
    setReactorCriticalityParam: <T extends keyof ReactorCriticalityParams>(
        key: T,
        value: number,
    ) => void;
    setReactorCriticalityParams: (
        value: SetParams<ReactorCriticalityParams>,
    ) => void;
}

const reactorCriticalityParamsDefaults: ReactorCriticalityParams = {
    migrationArea: {
        name: 'M²',
        description: 'Площадь миграции',
        value: 0,
    },
    materialParameter: {
        name: 'κ², см⁻²',
        description: 'Материальный параметр',
        value: 0,
    },
    geometricParameter: {
        name: 'B², см⁻²',
        description: 'Геометрический параметр',
        value: 0,
    },
    besselRoot: {
        name: 'ξ₀',
        description: 'Первый корень функции Бесселя',
        value: 2.405,
    },
    heightToDiameterRatio: {
        name: 'H/D',
        description: 'Отношение высоты к диаметру активной зоны',
        value: 0,
    },
    coreHeight: {
        name: 'H, см',
        description: 'Высота активной зоны',
        value: 0,
    },
    coreDiameter: {
        name: 'D, см',
        description: 'Диаметр активной зоны',
        value: 0,
    },
    kEff: {
        name: 'k_эф, o.e',
        description: 'Эффективный коэффициент размножения',
        value: 0,
    },
    reactivity: {
        name: 'ρ, o.e',
        description: 'Реактивность',
        value: 0,
    },
};

export const useReactorCriticalityStore = create<ReactorCriticalityStore>()(
    devtools(
        immer((set) => ({
            reactorCriticalityParams: reactorCriticalityParamsDefaults,

            setReactorCriticalityParam: (key, value) =>
                set(
                    (state) => {
                        state.reactorCriticalityParams[key].value = value;
                        state.filled = areAllParamsFilled(
                            state.reactorCriticalityParams,
                        );
                    },
                    undefined,
                    getActionName(
                        'ReactorCriticalityStore',
                        `setReactorCriticalityParam: ${key}`,
                    ),
                ),

            setReactorCriticalityParams: (params) =>
                set(
                    (state) => {
                        Object.keys(params).forEach((key) => {
                            const keyParam =
                                key as keyof ReactorCriticalityParams;
                            state.reactorCriticalityParams[keyParam].value =
                                params[keyParam];
                        });

                        state.filled = areAllParamsFilled(
                            state.reactorCriticalityParams,
                        );
                    },
                    undefined,
                    getActionName(
                        'ReactorCriticalityStore',
                        'setReactorCriticalityParams',
                    ),
                ),
        })),
    ),
);
