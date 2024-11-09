import { areAllParamsFilled, getActionName } from '@shared/lib/utils';
import { SetParams } from '@shared/types/param.ts';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { IsotopeComposition } from '../types/IsotopeComposition.ts';

interface IsotopeCompositionStore {
    filled?: boolean;
    isotopesParams: IsotopeComposition;
    setIsotopeProperty: <T extends keyof IsotopeComposition>(
        key: T,
        value: number,
    ) => void;
    setIsotopeProperties: (value: SetParams<IsotopeComposition>) => void;
}

const isotopesParamsDefaults: IsotopeComposition = {
    initialReproductionCoefficient: {
        name: 'КВ, о.е.',
        description: 'Начальный коэффициент воспроизводства',
        value: 0,
    },
    Sa8: {
        name: 'Sa8',
        description: 'Фактор S8 поглощения',
        value: 0,
    },
    Sa9: {
        name: 'Sa9',
        description: 'Фактор S9 поглощения',
        value: 0,
    },
    Sf5: {
        name: 'Sf5',
        description: 'Фактор S5 деления',
        value: 0,
    },
    Sf9: {
        name: 'Sf9',
        description: 'Фактор S9 деления',
        value: 0,
    },
    averageFissionCrossSection239Pu: {
        name: 'σf⁹, барн',
        description:
            'Усредненное микроскопическое сечение деления плутония-239',
        value: 0,
    },
    averageAbsorptionCrossSection239Pu: {
        name: 'σa⁹, барн',
        description:
            'Усредненное микроскопическое сечение поглощения плутония-239',
        value: 0,
    },
    averageSpecificByVolumePower: {
        name: 'qv, Вт/см³',
        description:
            'Средняя удельная мощность, выделяемая в единице объема топлива',
        value: 0,
    },
    secondaryNeutronsPerAbsorption239Pu: {
        name: 'η⁹, о.е.',
        description:
            'Число вторичных нейтронов на 1 акт поглощения плутонием-239',
        value: 0,
    },
};

export const useIsotopeCompositionStore = create<IsotopeCompositionStore>()(
    devtools(
        immer((set) => ({
            isotopesParams: isotopesParamsDefaults,

            setIsotopeProperty: (key, value) =>
                set(
                    (state) => {
                        state.isotopesParams[key].value = value;
                        state.filled = areAllParamsFilled(state.isotopesParams);
                    },
                    undefined,
                    getActionName(
                        'IsotopeCompositionStore',
                        `setIsotopeProperty: ${key}`,
                    ),
                ),

            setIsotopeProperties: (params) =>
                set(
                    (state) => {
                        Object.keys(params).forEach((key) => {
                            const keyParam = key as keyof IsotopeComposition;
                            state.isotopesParams[keyParam].value =
                                params[keyParam];
                        });

                        state.filled = areAllParamsFilled(state.isotopesParams);
                    },
                    undefined,
                    getActionName(
                        'IsotopeCompositionStore',
                        'setIsotopeProperties',
                    ),
                ),
        })),
    ),
);
