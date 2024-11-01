import { getActionName } from '@shared/lib/utils';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { AZPhysParams } from '../types/azPhysParams.ts';

interface AZStore {
    azPhysParams: AZPhysParams;
    setAZPhysParam: <T extends keyof AZPhysParams>(
        key: T,
        value: AZPhysParams[T],
    ) => void;
    setAZPhysParams: (value: AZPhysParams) => void;
}

const initialAZPhysParams: AZPhysParams = {
    volume: 0,
    diameter: 0,
    geometricParameter: 0,
    numFuelAssemblies: 0,
    effectiveMultiplicationFactor: 0,
    reactorReactivity: 0,
};

export const useAZPhysParamsStore = create<AZStore>()(
    devtools(
        immer((set) => ({
            azPhysParams: initialAZPhysParams,

            setAZPhysParam: (key, value) =>
                set(
                    (state) => {
                        state.azPhysParams[key] = value;
                    },
                    undefined,
                    getActionName('AZPhysParamsStore', 'setAZPhysParam'),
                ),

            setAZPhysParams: (params) =>
                set(
                    (state) => {
                        state.azPhysParams = params;
                    },
                    undefined,
                    getActionName('AZPhysParamsStore', 'setAZPhysParams'),
                ),
        })),
    ),
);
