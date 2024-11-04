import { AZCharacteristics } from '@entities/KNR';
import { areAllParamsFilled, getActionName } from '@shared/lib/utils';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface AZStore {
    filled?: boolean;
    AZCharacteristics: AZCharacteristics;
    setAZCharacteristic: <T extends keyof AZCharacteristics>(
        key: T,
        value: AZCharacteristics[T],
    ) => void;
    setAZCharacteristics: (value: AZCharacteristics) => void;
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
    infiniteNeutronMultiplicationCoefficient: 0,
    thermalNeutronAge: 0,
    diffusionLength: 0,
};

export const useAZStore = create<AZStore>()(
    devtools(
        immer((set) => ({
            AZCharacteristics: initialCharacteristics,
            setAZCharacteristic: (key, value) =>
                set(
                    (state) => {
                        state.AZCharacteristics[key] = value;
                        state.filled = areAllParamsFilled(
                            state.AZCharacteristics,
                        );
                    },
                    undefined,
                    getActionName('AZStore', `setCharacteristic [${key}]`),
                ),
            setAZCharacteristics: (value) =>
                set(
                    (state) => {
                        state.AZCharacteristics = value;
                        state.filled = true;
                    },
                    undefined,
                    getActionName('AZStore', 'setAZCharacteristics'),
                ),
        })),
    ),
);
