import { getActionName } from '@shared/lib/utils';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { AZCharacteristics } from '../types/AZCharacteristics';

interface AZStore {
    characteristics: AZCharacteristics;
    setCharacteristic: <T extends keyof AZCharacteristics>(
        key: T,
        value: AZCharacteristics[T],
    ) => void;
    setCharacteristics: (value: AZCharacteristics) => void;
}

const initialCharacteristics: AZCharacteristics = {
    blockVolume: 0,
    moderatorVolume: 0,
    cellVolume: 0,
    fuelVolume: 0,
    averageAbsorptionCrossSection238U: 0,
    averageAbsorptionCrossSection235U: 0,
    averageFissionCrossSection235U: 0,
    nuclearConcentration235U: 0,
    nuclearConcentration238U: 0,
    transportMacroscopicCrossSectionH2O: 0,
    transportMacroscopicCrossSection238U: 0,
    transportMacroscopicCrossSectionOxygen: 0,
    transportMacroscopicCrossSectionZirconium: 0,
    totalTransportMacroscopicCrossSection: 0,
    macroscopicAbsorptionCrossSectionBlock: 0,
    macroscopicAbsorptionCrossSectionModerator: 0,
    neutronGasTemperature: 0,
    reproductionLossCoefficient: 0,
    thermalNeutronUtilizationCoefficient: 0,
    fastNeutronReproductionCoefficient: 0,
    resonanceEscapeProbability: 0,
    secondaryNeutronsPerAbsorption235U: 0,
    infiniteMediumNeutronMultiplicationCoefficient: 0,
    thermalNeutronAge: 0,
    diffusionLength: 0,
};

export const useAZStore = create<AZStore>()(
    devtools(
        immer((set) => ({
            characteristics: initialCharacteristics,
            setCharacteristic: (key, value) =>
                set(
                    (state) => {
                        state.characteristics[key] = value;
                    },
                    undefined,
                    getActionName('AZStore', `setCharacteristic [${key}]`),
                ),
            setCharacteristics: (value) =>
                set(
                    (state) => (state.characteristics = value),
                    undefined,
                    getActionName('AZStore', 'setCharacteristics'),
                ),
        })),
    ),
);