import { TVS } from '@entities/KNR';
import { getActionName } from '@shared/lib/utils';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface TVSStore {
    TVSCharacteristics: TVS;
    setTVSCharacteristic: <T extends keyof TVS>(key: T, value: TVS[T]) => void;
    setTVSCharacteristics: (value: TVS) => void;
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
            TVSCharacteristics: initialTVS,

            setTVSCharacteristic: (key, value) =>
                set(
                    (state) => {
                        state.TVSCharacteristics[key] = value;
                    },
                    undefined,
                    getActionName('TVSStore', `setTVSCharacteristic [${key}]`),
                ),
            setTVSCharacteristics: (value) =>
                set(
                    (state) => {
                        state.TVSCharacteristics = value;
                    },
                    undefined,
                    getActionName('TVSStore', 'setTVSCharacteristics'),
                ),
        })),
    ),
);
