import { ReactorCharacteristics } from '@entities/KNR';
import { getActionName } from '@shared/lib/utils';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface ReactorStore {
    reactorCharacteristics: ReactorCharacteristics;
    setReactorCharacteristic: <T extends keyof ReactorCharacteristics>(
        key: T,
        value: ReactorCharacteristics[T],
    ) => void;
    setReactorCharacteristics: (value: ReactorCharacteristics) => void;
}

const initialReactor: ReactorCharacteristics = {
    electricalPower: 0,
    thermalPower: 0,
    primaryCircuitPressure: 0,
    coolantTemperature: 0,
    uraniumEnrichment: 0,
    corePowerDensity: 0,
    coreHeight: 0,
};

export const useReactorStore = create<ReactorStore>()(
    devtools(
        immer((set) => ({
            reactorCharacteristics: initialReactor,

            setReactorCharacteristic: (key, value) =>
                set(
                    (state) => {
                        state.reactorCharacteristics[key] = value;
                    },
                    undefined,
                    getActionName(
                        'ReactorStore',
                        `setReactorCharacteristic [${key}]`,
                    ),
                ),
            setReactorCharacteristics: (value) =>
                set(
                    (state) => {
                        state.reactorCharacteristics = value;
                    },
                    undefined,
                    getActionName('ReactorStore', 'setReactorCharacteristics'),
                ),
        })),
    ),
);
