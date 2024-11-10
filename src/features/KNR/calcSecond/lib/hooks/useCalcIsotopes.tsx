import {
    useAveragedCrossSectionsStore,
    useNeutronGasParamsStore,
    useNuclearConcentrationsStore,
    useCellParamsStore,
    useKInfParamsStore,
    useNeutronDiffusionAgeStore,
} from '@features/KNR/calcFirst';
import { useIsotopeCompositionStore } from '@features/KNR/calcSecond';
import { useInitialParamsStore } from '@features/KNR/VVER/setInitialValues';

import { useAZPhysParamsStore } from '../../model/store/azPhysParamsStore.ts';
import {
    calcAverageAbsorptionCrossSection239Pu,
    calcAverageFissionCrossSection239Pu,
    calcAverageSpecificByVolumePower,
    calcSecondaryNeutronsPerAbsorption239Pu,
    calculateReproductionCoefficient,
    calculateSa8,
    calculateSa9,
    calculateSf8,
    calculateSf9,
} from '../utils/calcIsotopeComposition/helpers.ts';

export const useCalcIsotopes = () => {
    const { setIsotopeProperties } = useIsotopeCompositionStore();

    const computeIsotopeProperties = async () => {
        try {
            const {
                initialParams: { thermalPower, coreHeight, nTvel },
            } = useInitialParamsStore.getState();

            const {
                cellParams: { fuelVolume },
            } = useCellParamsStore.getState();

            const {
                azPhysParams: { geometricParameter, numFuelAssemblies },
            } = useAZPhysParamsStore.getState();

            const {
                neutronDiffusionAgeParams: { neutronAge },
            } = useNeutronDiffusionAgeStore.getState();

            const {
                kInfParams: {
                    resonanceEscapeProbability,
                    reproductionFactor,
                    fastFissionFactor,
                },
            } = useKInfParamsStore.getState();

            const {
                averagedCrossSections: {
                    averagedMicroAU5,
                    averagedMicroAU8,
                    averagedMicroFU5,
                },
            } = useAveragedCrossSectionsStore.getState();

            const {
                concentrations: { N_08, N_05 },
            } = useNuclearConcentrationsStore.getState();

            const {
                neutronGasParams: { neutronGasTemperature },
            } = useNeutronGasParamsStore.getState();

            const initialReproductionCoefficient =
                calculateReproductionCoefficient({
                    geometricParameter: geometricParameter.value,
                    thermalNeutronAge: neutronAge.value,
                    nuclearConcentration235U: N_05.value,
                    nuclearConcentration238U: N_08.value,
                    secondaryNeutronsPerAbsorption235U:
                        reproductionFactor.value,
                    averageAbsorptionCrossSection238U: averagedMicroAU8.value,
                    averageAbsorptionCrossSection235U: averagedMicroAU5.value,
                    fastNeutronReproductionCoefficient: fastFissionFactor.value,
                    resonanceEscapeProbability:
                        resonanceEscapeProbability.value,
                });

            const Sa8 = calculateSa8(
                averagedMicroAU8.value,
                averagedMicroAU5.value,
            );

            const averageFissionCrossSection239Pu =
                calcAverageFissionCrossSection239Pu(
                    neutronGasTemperature.value,
                );

            const averageAbsorptionCrossSection239Pu =
                calcAverageAbsorptionCrossSection239Pu(
                    neutronGasTemperature.value,
                );

            const secondaryNeutronsPerAbsorption239Pu =
                calcSecondaryNeutronsPerAbsorption239Pu(
                    averageFissionCrossSection239Pu,
                    averageAbsorptionCrossSection239Pu,
                );

            const Sf5 = calculateSf8(
                averagedMicroFU5.value,
                averagedMicroAU5.value,
            );
            const Sf9 = calculateSf9(
                averageFissionCrossSection239Pu,
                averagedMicroAU5.value,
            );

            const Sa9 = calculateSa9({
                averageAbsorptionCrossSection239Pu,
                averageAbsorptionCrossSection235U: averagedMicroAU5.value,
                secondaryNeutronsPerAbsorption239Pu,
                geometricParameter: geometricParameter.value,
                resonanceEscapeProbability: resonanceEscapeProbability.value,
                fastNeutronReproductionCoefficient: fastFissionFactor.value,
                thermalNeutronAge: neutronAge.value,
            });

            const averageSpecificByVolumePower =
                calcAverageSpecificByVolumePower(
                    thermalPower,
                    fuelVolume.value,
                    coreHeight,
                    numFuelAssemblies.value,
                    nTvel,
                );

            const isotopeProperties = {
                initialReproductionCoefficient,
                Sa8,
                Sa9,
                Sf9,
                Sf5,
                secondaryNeutronsPerAbsorption239Pu,
                averageFissionCrossSection239Pu,
                averageAbsorptionCrossSection239Pu,
                averageSpecificByVolumePower,
            };

            setIsotopeProperties(isotopeProperties);
        } catch (error) {
            console.error('Ошибка при расчете изотопных свойств', error);
        }
    };

    return { computeIsotopeProperties };
};
