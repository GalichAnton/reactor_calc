import { useInitialParamsStore } from '@features/KNR/VVER/setInitialValues';
import { getWaterDensity } from '@shared/lib/utils';

import { useNuclearConcentrationsStore } from '../..//model/stores/azCompNucConStore.ts';
import { useAveragedCrossSectionsStore } from '../../model/stores/averagedCrossSectionsStore.ts';
import { useCellParamsStore } from '../../model/stores/cellParamsStore.ts';
import { useKInfParamsStore } from '../../model/stores/kInfParamsStore.ts';
import { useLossFactorParamsStore } from '../../model/stores/lossFactorParamsStore.ts';
import { useModerationCapacityStore } from '../../model/stores/moderationCapacityStore.ts';
import { useTwoZoneModelParamsStore } from '../../model/stores/twoZoneParamsStore.ts';
import {
    calculateFastNeutronMultiplication,
    calculateInfiniteMultiplication,
    calculateNormalizedVolume,
    calculateResonanceEscapeProbability,
    calculateSecondaryNeutrons,
    calculateThermalNeutronCoef,
    calculateUraniumTemp,
} from '../utils/calcKinfParams/helpers.ts';

export const useCalcKInfParams = () => {
    const { setKInfParams } = useKInfParamsStore();

    const computeKInfParams = async () => {
        try {
            const {
                averagedCrossSections: { averagedMicroAU5, averagedMicroFU5 },
            } = useAveragedCrossSectionsStore.getState();

            const {
                initialParams: { coolantTemperature },
            } = useInitialParamsStore.getState();

            const {
                params: {
                    twoZoneCellVolume,
                    twoZoneBlockAbsorptionCrossSection,
                    twoZoneModeratorAbsorptionCrossSection,
                    twoZoneModeratorVolume,
                },
            } = useTwoZoneModelParamsStore.getState();

            const {
                lossFactorParams: { lossFactor },
            } = useLossFactorParamsStore.getState();

            const {
                concentrations: { averageN_5, N_0U },
            } = useNuclearConcentrationsStore.getState();

            const {
                cellParams: { waterVolume, fuelVolume, fuelArea, cellVolume },
            } = useCellParamsStore.getState();

            const {
                moderationCapacityParams: { totalModerationCapacity },
            } = useModerationCapacityStore.getState();

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
                density: getWaterDensity(coolantTemperature),
            });

            const normalizedUraniumVolume = calculateNormalizedVolume({
                volume: fuelVolume.value,
                concentration: N_0U.value,
            });

            const fastFissionFactor = calculateFastNeutronMultiplication({
                normalizedUraniumVolume,
                normalizedWaterVolume,
            });

            const resonanceEscapeProbability =
                calculateResonanceEscapeProbability({
                    uraniumSurface: fuelArea.value,
                    uraniumVolume: fuelVolume.value,
                    uraniumTemp: uraniumTemperature,
                    V0: cellVolume.value,
                    xiSigmaS: totalModerationCapacity.value,
                    N0U: N_0U.value,
                });

            const infiniteMultiplicationFactor =
                calculateInfiniteMultiplication({
                    mu: fastFissionFactor,
                    theta: thermalUtilization,
                    eta: reproductionFactor,
                    phi: resonanceEscapeProbability,
                });

            const kInfParams = {
                fastFissionFactor,
                reproductionFactor,
                resonanceEscapeProbability,
                uraniumTemperature,
                normalizedUraniumVolume,
                normalizedWaterVolume,
                infiniteMultiplicationFactor,
                thermalUtilization,
            };

            setKInfParams(kInfParams);
        } catch (error) {
            console.error(
                'Ошибка при расчете параметров размножения нейтронов',
                error,
            );
        }
    };

    return { computeKInfParams };
};
