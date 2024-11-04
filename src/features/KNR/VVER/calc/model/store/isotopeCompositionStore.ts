import { getActionName } from '@shared/lib/utils';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { IsotopeComposition } from '../types/IsotopeComposition.ts';

// Интерфейс для Zustand Store
interface IsotopeCompositionStore {
    filled?: boolean;
    isotopesParams: IsotopeComposition;
    setIsotopeProperty: <T extends keyof IsotopeComposition>(
        key: T,
        value: IsotopeComposition[T],
    ) => void;
    setIsotopeProperties: (value: IsotopeComposition) => void;
}

// Начальные параметры изотопного состава
const initialIsotopeComposition: IsotopeComposition = {
    initialReproductionCoefficient: 0,
    averageAbsorptionCrossSection239Pu: 0,
    averageFissionCrossSection239Pu: 0,
    secondaryNeutronsPerAbsorption239Pu: 0,
    Sa8: 0,
    Sa9: 0,
    Sf9: 0,
    Sf5: 0,
    averageSpecificByVolumePower: 0,
};

export const useIsotopeCompositionStore = create<IsotopeCompositionStore>()(
    devtools(
        immer((set) => ({
            isotopesParams: initialIsotopeComposition,

            setIsotopeProperty: (key, value) =>
                set(
                    (state: IsotopeCompositionStore) => {
                        state.isotopesParams[key] = value;
                    },
                    undefined,
                    getActionName(
                        'IsotopeCompositionStore',
                        'setIsotopeProperty',
                    ),
                ),

            setIsotopeProperties: (params) =>
                set(
                    (state: IsotopeCompositionStore) => {
                        state.isotopesParams = params;
                        state.filled = true;
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
