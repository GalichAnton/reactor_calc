import { ZRelations } from '@features/KNR/VVER/calc/model/types/zRelations.ts';
import { getActionName } from '@shared/lib/utils';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface ZRelationsStore {
    filled?: boolean;
    zRelationsParams?: ZRelations[];
    setZRelationProperties: (value: ZRelations) => void;
    resetStore: () => void;
}

// // Define initial values for ZRelations
// const initialZRelations: ZRelations = {
//     z: 0,
//     averageAbsorptionMacroCrossSection235U: 0,
//     averageFissionMacroCrossSection235U: 0,
//     nuclearConcentration235U: 0,
//     averageAbsorptionMacroCrossSection239Pu: 0,
//     averageFissionMacroCrossSection239Pu: 0,
//     nuclearConcentration239Pu: 0,
//     reactorOperationalTime: 0,
//     averageNuclearConcentrationCell235U: 0,
//     averageNuclearConcentrationCell239Pu: 0,
//     neutronFluxDensity: 0,
//     infiniteMediumNeutronMultiplicationFactor: 0,
//     effectiveNeutronMultiplicationFactor: 0,
// };

export const useZRelationsStore = create<ZRelationsStore>()(
    devtools(
        immer((set) => ({
            setZRelationProperties: (params) =>
                set(
                    (state) => {
                        if (!state.zRelationsParams) {
                            state.zRelationsParams = [];
                        }

                        state.zRelationsParams.push(params);
                        state.filled = true;
                    },
                    undefined,
                    getActionName('ZRelationsStore', 'setZRelationProperties'),
                ),
            resetStore: () =>
                set(
                    (state) => (state.zRelationsParams = undefined),
                    undefined,
                    getActionName('ZRelationsStore', 'resetStore'),
                ),
        })),
    ),
);
