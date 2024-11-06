import { getActionName } from '@shared/lib/utils';
import { create } from 'zustand/index';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { FuelParams } from '../types/fuelParams.ts';

const initialFuelParams: FuelParams = {
    depletedUranium235Mass: 0,
    specificFuelConsumption: 0,
    initialUranium235Mass: 0,
    initialUranium238Mass: 0,
    totalInitialUraniumMass: 0,
    uraniumEnrichment: 0,
    fuelBurnupPerYear: 0,
    numberOfReloads: 0,
};

interface FuelStore {
    filled?: boolean;
    fuelParams: FuelParams;
    setFuelParam: <T extends keyof FuelParams>(
        key: T,
        value: FuelParams[T],
    ) => void;
    setFuelParams: (params: FuelParams) => void;
}

export const useFuelParamsStore = create<FuelStore>()(
    devtools(
        immer((set) => ({
            fuelParams: initialFuelParams,

            setFuelParam: (key, value) =>
                set(
                    (state) => {
                        state.fuelParams[key] = value;
                    },
                    undefined,
                    getActionName('FuelParamsStore', 'setFuelParam'),
                ),

            setFuelParams: (params) =>
                set(
                    (state) => {
                        state.fuelParams = params;
                        state.filled = true;
                    },
                    undefined,
                    getActionName('FuelParamsStore', 'setFuelParams'),
                ),
        })),
    ),
);
