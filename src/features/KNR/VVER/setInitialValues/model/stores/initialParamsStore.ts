import { InitialParams } from '@entities/KNR';
import { REACTOR_TYPES } from '@entities/reactor';
import { getActionName } from '@shared/lib/utils';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface InitialParamsStore {
    filled?: boolean;
    initialParams: InitialParams;
    setInitialParam: <T extends keyof InitialParams>(
        key: T,
        value: InitialParams[T],
    ) => void;
    setInitialParams: (value: InitialParams) => void;
}

const initialParamsDefaults: InitialParams = {
    electricalPower: 0,
    thermalPower: 0,
    primaryCircuitPressure: 0,
    coolantTemperature: 0,
    uraniumEnrichment: 0,
    corePowerDensity: 0,
    nTvel: 0,
    latticePitch: 0,
    fuelRodLatticePitch: 0,
    assemblySizeAcrossFlats: 0,
    fuelPelletRadius: 0,
    claddingInnerRadius: 0,
    claddingOuterRadius: 0,
    coreHeight: 0,
    controlRodRadius: 0,
    reactorType: REACTOR_TYPES.VVER,
    nominalPower: null,
};

const areAllParamsFilled = (params: InitialParams) => {
    return Object.values(params).every((value) => value !== 0 && value !== '');
};

export const useInitialParamsStore = create<InitialParamsStore>()(
    devtools(
        immer((set) => ({
            initialParams: initialParamsDefaults,

            setInitialParam: (key, value) =>
                set(
                    (state) => {
                        state.initialParams[key] = value;
                        state.filled = areAllParamsFilled(state.initialParams);
                    },
                    undefined,
                    getActionName(
                        'InitialParamsStore',
                        `setInitialParam: ${key}`,
                    ),
                ),
            setInitialParams: (value) =>
                set(
                    (state) => {
                        state.initialParams = value;
                        state.filled = areAllParamsFilled(state.initialParams);
                    },
                    undefined,
                    getActionName('InitialParamsStore', `setInitialParams`),
                ),
        })),
    ),
);
