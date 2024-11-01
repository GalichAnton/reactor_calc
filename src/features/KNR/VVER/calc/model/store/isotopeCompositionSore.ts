import { getActionName } from '@shared/lib/utils';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { IsotopeComposition } from '../types/IsotopeComposition.ts';

// Интерфейс для Zustand Store
interface IsotopeCompositionStore {
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
    u235Burnup: 0,
    pu239Accumulation: 0,
    slagAccumulation: 0,
    neutronFluxDensity: 0,
    macroscopicalCaptureCrossSectionXe135: 0,
    macroscopicalCaptureCrossSectionSm149: 0,
    fissionCrossSectionU235: 0,
    fissionCrossSectionPu239: 0,
    averagePowerDensity: 0,
    volumeFractionU: 0,
    averageNuclearDensityU235: 0,
    averageNuclearDensityPu239: 0,
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
