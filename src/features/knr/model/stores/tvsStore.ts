import { TVS } from '@features/knr';
import { getActionName } from '@shared/lib/utils';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface TVSStore {
    characteristics: TVS;
    setCharacteristic: <T extends keyof TVS>(key: T, value: TVS[T]) => void;
    setCharacteristics: (value: TVS) => void;
}

const initialTVS: TVS = {
    ntvel: 0,
    latticePitch: 0,
    fuelPelletRadius: 0,
    innerCladdingRadius: 0,
    outerCladdingRadius: 0,
    controlRodRadius: 0,
    claddingMaterial: '',
};

export const useTVSStore = create<TVSStore>()(
    devtools(
        immer((set) => ({
            characteristics: initialTVS,

            setCharacteristic: (key, value) =>
                set(
                    (state) => {
                        state.characteristics[key] = value;
                    },
                    undefined,
                    getActionName('TVSStore', `setCharacteristic [${key}]`),
                ),
            setCharacteristics: (value) =>
                set(
                    (state) => (state.characteristics = value),
                    undefined,
                    getActionName('TVSStore', 'setCharacteristics'),
                ),
        })),
    ),
);
