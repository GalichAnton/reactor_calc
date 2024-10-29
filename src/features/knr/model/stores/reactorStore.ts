import { getActionName } from '@shared/lib/utils';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { ReactorCharacteristics } from '../types/reactor';

interface ReactorStore {
    characteristics: ReactorCharacteristics;
    setCharacteristic: <T extends keyof ReactorCharacteristics>(
        key: T,
        value: ReactorCharacteristics[T],
    ) => void;
    setCharacteristics: (value: ReactorCharacteristics) => void;
}

const initialReactor: ReactorCharacteristics = {
    electricalPower: 1000, // пример начального значения
    thermalPower: 3000,
    primaryCircuitPressure: 15,
    coolantTemperature: 573, // начальное значение в Кельвинах
    uraniumEnrichment: 5,
    corePowerDensity: 100,
    coreHeight: 350,
};

export const useReactorStore = create<ReactorStore>()(
    devtools(
        immer((set) => ({
            characteristics: initialReactor,

            setCharacteristic: (key, value) =>
                set(
                    (state) => {
                        state.characteristics[key] = value;
                    },
                    undefined,
                    getActionName('ReactorStore', `setCharacteristic [${key}]`),
                ),
            setCharacteristics: (value) =>
                set(
                    (state) => (state.characteristics = value),
                    undefined,
                    getActionName('ReactorStore', 'setCharacteristics'),
                ),
        })),
    ),
);
