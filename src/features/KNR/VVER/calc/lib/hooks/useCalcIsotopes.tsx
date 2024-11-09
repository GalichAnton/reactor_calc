import { useEffect } from 'react';

import { useAveragedCrossSectionsStore } from '@features/KNR/calcFirst/model/stores/averagedCrossSectionsStore.ts';
import { useNuclearConcentrationsStore } from '@features/KNR/calcFirst/model/stores/azCompNucConStore.ts';
import { useCellParamsStore } from '@features/KNR/calcFirst/model/stores/cellParamsStore.ts';
import { useKInfParamsStore } from '@features/KNR/calcFirst/model/stores/kInfParamsStore.ts';
import { useNeutronDiffusionAgeStore } from '@features/KNR/calcFirst/model/stores/neutronDiffusionAgeStore.ts';
import { useNeutronGasParamsStore } from '@features/KNR/calcFirst/model/stores/neutronGasStore.ts';
import { useInitialParamsStore } from '@features/KNR/VVER/setInitialValues';

import { useAZPhysParamsStore } from '../../model/store/azPhysParamsStore.ts';
import { useIsotopeCompositionStore } from '../../model/store/isotopeCompositionStore.ts';
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
} from '../utils/calcIsotopeComposition.ts';

export const useCalcIsotopes = () => {
    const {
        initialParams: { thermalPower, coreHeight, nTvel },
    } = useInitialParamsStore();

    const {
        cellParams: { fuelVolume },
    } = useCellParamsStore();

    const {
        azPhysParams: { geometricParameter, numFuelAssemblies },
    } = useAZPhysParamsStore();

    const { setIsotopeProperties } = useIsotopeCompositionStore();

    const {
        neutronDiffusionAgeParams: { neutronAge },
    } = useNeutronDiffusionAgeStore();

    const {
        kInfParams: {
            resonanceEscapeProbability,
            reproductionFactor,
            fastFissionFactor,
        },
    } = useKInfParamsStore();

    const {
        averagedCrossSections: {
            averagedMicroAU5,
            averagedMicroAU8,
            averagedMicroFU5,
        },
    } = useAveragedCrossSectionsStore();

    const {
        concentrations: { N_08, N_05 },
    } = useNuclearConcentrationsStore();

    const {
        neutronGasParams: { neutronGasTemperature },
    } = useNeutronGasParamsStore();

    useEffect(() => {
        const initialReproductionCoefficient = calculateReproductionCoefficient(
            {
                geometricParameter: geometricParameter.value,
                thermalNeutronAge: neutronAge.value,
                nuclearConcentration235U: N_05.value,
                nuclearConcentration238U: N_08.value,
                secondaryNeutronsPerAbsorption235U: reproductionFactor.value,
                averageAbsorptionCrossSection238U: averagedMicroAU8.value,
                averageAbsorptionCrossSection235U: averagedMicroAU5.value,
                fastNeutronReproductionCoefficient: fastFissionFactor.value,
                resonanceEscapeProbability: resonanceEscapeProbability.value,
            },
        );

        const Sa8 = calculateSa8(
            averagedMicroAU8.value,
            averagedMicroAU5.value,
        );

        const averageFissionCrossSection239Pu =
            calcAverageFissionCrossSection239Pu(neutronGasTemperature.value);

        const averageAbsorptionCrossSection239Pu =
            calcAverageAbsorptionCrossSection239Pu(neutronGasTemperature.value);

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

        const averageSpecificByVolumePower = calcAverageSpecificByVolumePower(
            thermalPower,
            fuelVolume.value,
            coreHeight,
            numFuelAssemblies.value,
            nTvel,
        );

        setIsotopeProperties({
            initialReproductionCoefficient,
            Sa8,
            Sa9,
            Sf9,
            Sf5,
            secondaryNeutronsPerAbsorption239Pu,
            averageFissionCrossSection239Pu,
            averageAbsorptionCrossSection239Pu,
            averageSpecificByVolumePower,
        });
    }, [
        geometricParameter,
        averagedMicroAU5,
        averagedMicroAU8,
        averagedMicroFU5,
        resonanceEscapeProbability,
        reproductionFactor,
        fastFissionFactor,
        geometricParameter,
        numFuelAssemblies,
        resonanceEscapeProbability,
        thermalPower,
        coreHeight,
        nTvel,
        fuelVolume,
    ]);
};
