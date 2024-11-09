import { useEffect } from 'react';

import {
    calculateFastNeutronMultiplication,
    calculateInfiniteMultiplication,
    calculateNormalizedVolume,
    calculateResonanceEscapeProbability,
    calculateSecondaryNeutrons,
    calculateThermalNeutronCoef,
    calculateUraniumTemp,
} from '@features/KNR/calcFirst/lib/utils/calcKinfParams.ts';
import { useAveragedCrossSectionsStore } from '@features/KNR/calcFirst/model/stores/averagedCrossSectionsStore.ts';
import { useNuclearConcentrationsStore } from '@features/KNR/calcFirst/model/stores/azCompNucConStore.ts';
import { useCellParamsStore } from '@features/KNR/calcFirst/model/stores/cellParamsStore.ts';
import { useKInfParamsStore } from '@features/KNR/calcFirst/model/stores/kInfParamsStore.ts';
import { useLossFactorParamsStore } from '@features/KNR/calcFirst/model/stores/lossFactorParamsStore.ts';
import { useModerationCapacityStore } from '@features/KNR/calcFirst/model/stores/ModerationCapacityStore.ts';
import { useTwoZoneModelParamsStore } from '@features/KNR/calcFirst/model/stores/twoZoneParamsStore.ts';
import {
    DENSITY_H2O,
    useInitialParamsStore,
} from '@features/KNR/VVER/setInitialValues';

export const useCalcKInfParams = () => {
    const { setKInfParams } = useKInfParamsStore();

    const {
        averagedCrossSections: { averagedMicroAU5, averagedMicroFU5 },
    } = useAveragedCrossSectionsStore();

    const {
        initialParams: { coolantTemperature },
    } = useInitialParamsStore();

    const {
        params: {
            twoZoneCellVolume,
            twoZoneBlockAbsorptionCrossSection,
            twoZoneModeratorAbsorptionCrossSection,
            twoZoneModeratorVolume,
        },
    } = useTwoZoneModelParamsStore();

    const {
        lossFactorParams: { lossFactor },
    } = useLossFactorParamsStore();

    const {
        concentrations: { averageN_5, N_05, N_0U },
    } = useNuclearConcentrationsStore();

    const {
        cellParams: { waterVolume, fuelVolume, fuelArea, cellVolume },
    } = useCellParamsStore();

    const {
        moderationCapacityParams: { totalModerationCapacity },
    } = useModerationCapacityStore();

    useEffect(() => {
        const uraniumTemperature = calculateUraniumTemp({
            waterTemp: coolantTemperature,
        });

        const thermalUtilization = calculateThermalNeutronCoef({
            blockVolume: twoZoneCellVolume.value,
            blockMacroAbsorptionCrossSection:
                twoZoneBlockAbsorptionCrossSection.value,
            moderatorMacroAbsorptionCrossSection:
                twoZoneModeratorAbsorptionCrossSection.value,
            moderatorVolume: twoZoneModeratorVolume.value,
            lossFactor: lossFactor.value,
            u235AbsorptionCrossSection: averagedMicroAU5.value,
            u235Concentration: averageN_5.value,
        });

        const reproductionFactor = calculateSecondaryNeutrons({
            u235AbsorptionCrossSection: averagedMicroAU5.value,
            u235FissionCrossSection: averagedMicroFU5.value,
        });

        const normalizedWaterVolume = calculateNormalizedVolume({
            volume: waterVolume.value,
            density: DENSITY_H2O,
        });

        const normalizedUraniumVolume = calculateNormalizedVolume({
            volume: fuelVolume.value,
            concentration: N_0U.value,
        });

        const fastFissionFactor = calculateFastNeutronMultiplication({
            normalizedUraniumVolume,
            normalizedWaterVolume,
        });

        const resonanceEscapeProbability = calculateResonanceEscapeProbability({
            uraniumSurface: fuelArea.value,
            uraniumVolume: fuelVolume.value,
            uraniumTemp: uraniumTemperature,
            V0: cellVolume.value,
            xiSigmaS: totalModerationCapacity.value,
            N0U: N_0U.value,
        });

        const infiniteMultiplicationFactor = calculateInfiniteMultiplication({
            mu: fastFissionFactor,
            theta: thermalUtilization,
            eta: reproductionFactor,
            phi: resonanceEscapeProbability,
        });

        setKInfParams({
            fastFissionFactor,
            reproductionFactor,
            resonanceEscapeProbability,
            uraniumTemperature,
            normalizedUraniumVolume,
            normalizedWaterVolume,
            infiniteMultiplicationFactor,
            thermalUtilization,
        });
    }, [
        averagedMicroAU5,
        averagedMicroFU5,
        coolantTemperature,
        twoZoneCellVolume,
        twoZoneBlockAbsorptionCrossSection,
        twoZoneModeratorAbsorptionCrossSection,
        twoZoneModeratorVolume,
        lossFactor,
        averageN_5,
        N_05,
        N_0U,
        waterVolume,
        fuelVolume,
        fuelArea,
        cellVolume,
        totalModerationCapacity,
    ]);
};
