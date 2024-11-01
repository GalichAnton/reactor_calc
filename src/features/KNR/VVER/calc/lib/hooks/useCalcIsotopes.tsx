import { useEffect } from 'react';

import { useAZStore } from '@features/KNR/VVER/setInitialValues';

import { useAZPhysParamsStore } from '../../model/store/azPhysParamsStore.ts';
import { useIsotopeCompositionStore } from '../../model/store/isotopeCompositionSore.ts';
import {
    calcAverageAbsorptionCrossSection239Pu,
    calcAverageFissionCrossSection239Pu,
    calcSecondaryNeutronsPerAbsorption239Pu,
    calculateReproductionCoefficient,
    calculateSa8,
    calculateSa9,
    calculateSf8,
    calculateSf9,
} from '../utils/calcIsotopeComposition.ts';

export const useCalcIsotopes = () => {
    const {
        thermalNeutronAge,
        nuclearConcentration235U,
        nuclearConcentration238U,
        secondaryNeutronsPerAbsorption235U,
        averageAbsorptionCrossSection238U,
        averageAbsorptionCrossSection235U,
        averageFissionCrossSection235U,
        fastNeutronReproductionCoefficient,
        resonanceEscapeProbability,
        neutronGasTemperature,
    } = useAZStore((state) => state.AZCharacteristics);

    const { geometricParameter } = useAZPhysParamsStore(
        (state) => state.azPhysParams,
    );

    const { setIsotopeProperties } = useIsotopeCompositionStore();

    useEffect(() => {
        const initialReproductionCoefficient = calculateReproductionCoefficient(
            {
                geometricParameter,
                thermalNeutronAge,
                nuclearConcentration235U,
                nuclearConcentration238U,
                secondaryNeutronsPerAbsorption235U,
                averageAbsorptionCrossSection238U,
                averageAbsorptionCrossSection235U,
                fastNeutronReproductionCoefficient,
                resonanceEscapeProbability,
            },
        );

        const Sa8 = calculateSa8(
            averageAbsorptionCrossSection238U,
            averageAbsorptionCrossSection235U,
        );

        const averageFissionCrossSection239Pu =
            calcAverageFissionCrossSection239Pu(neutronGasTemperature);

        const averageAbsorptionCrossSection239Pu =
            calcAverageAbsorptionCrossSection239Pu(neutronGasTemperature);

        const secondaryNeutronsPerAbsorption239Pu =
            calcSecondaryNeutronsPerAbsorption239Pu(
                averageFissionCrossSection239Pu,
                averageAbsorptionCrossSection239Pu,
            );

        const Sf8 = calculateSf8(
            averageFissionCrossSection235U,
            averageAbsorptionCrossSection235U,
        );
        const Sf9 = calculateSf9(
            averageFissionCrossSection239Pu,
            averageAbsorptionCrossSection235U,
        );

        const Sa9 = calculateSa9({
            averageAbsorptionCrossSection239Pu,
            averageAbsorptionCrossSection235U,
            secondaryNeutronsPerAbsorption239Pu,
            geometricParameter,
            resonanceEscapeProbability,
            fastNeutronReproductionCoefficient,
            thermalNeutronAge,
        });

        setIsotopeProperties({
            initialReproductionCoefficient,
            Sa8,
            Sa9,
            Sf9,
            Sf8,
            secondaryNeutronsPerAbsorption239Pu,
            averageFissionCrossSection239Pu,
            averageAbsorptionCrossSection239Pu,
        });
    }, [
        geometricParameter,
        thermalNeutronAge,
        nuclearConcentration235U,
        nuclearConcentration238U,
        secondaryNeutronsPerAbsorption235U,
        averageAbsorptionCrossSection238U,
        averageAbsorptionCrossSection235U,
        fastNeutronReproductionCoefficient,
        resonanceEscapeProbability,
    ]);
};
