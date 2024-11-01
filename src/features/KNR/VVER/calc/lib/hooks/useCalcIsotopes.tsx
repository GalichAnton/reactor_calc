import { useEffect } from 'react';

import { useAZStore } from '@features/KNR/VVER/setInitialValues';

import { useAZPhysParamsStore } from '../../model/store/azPhysParamsStore.ts';
import { useIsotopeCompositionStore } from '../../model/store/isotopeCompositionSore.ts';
import { calculateReproductionCoefficient } from '../utils/calcIsotopeComposition.ts';

export const useCalcIsotopes = () => {
    const {
        thermalNeutronAge,
        nuclearConcentration235U,
        nuclearConcentration238U,
        secondaryNeutronsPerAbsorption235U,
        averageAbsorptionCrossSection238U,
        averageAbsorptionCrossSection235U,
        fastNeutronReproductionCoefficient,
        resonanceEscapeProbability,
    } = useAZStore((state) => state.AZCharacteristics);

    const { geometricParameter } = useAZPhysParamsStore(
        (state) => state.azPhysParams,
    );

    const { setIsotopeProperty } = useIsotopeCompositionStore();

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

        setIsotopeProperty(
            'initialReproductionCoefficient',
            initialReproductionCoefficient,
        );
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
