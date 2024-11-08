import { useEffect } from 'react';

import { useMacroscopicCrossSectionsStore } from '@features/KNR/calcFirst/model/stores/macroscopicCrossSectionsStore.ts';
import { useModerationCapacityStore } from '@features/KNR/calcFirst/model/stores/ModerationCapacityStore.ts';
import { useInitialParamsStore } from '@features/KNR/VVER/setInitialValues';
import {
    calculateU235AbsorptionGFactor,
    calculateU235FissionGFactor,
} from '@shared/lib/utils';

import { useNeutronGasParamsStore } from '../../model/stores/neutronGasStore.ts';

export const useCalcNeutronGasParams = () => {
    const { setNeutronGasParams } = useNeutronGasParamsStore();

    const {
        macroscopicCrossSections: { macroSigmaATotal },
    } = useMacroscopicCrossSectionsStore();

    const {
        initialParams: { coolantTemperature },
    } = useInitialParamsStore();

    const {
        moderationCapacityParams: { totalModerationCapacity },
    } = useModerationCapacityStore();

    useEffect(() => {
        const totalMacroSigmaA =
            macroSigmaATotal.value * Math.sqrt(293 / coolantTemperature);

        const neutronGasTemperature =
            coolantTemperature *
            (1 + (1.4 * totalMacroSigmaA) / totalModerationCapacity.value);

        const roundedTemperature = Math.ceil(neutronGasTemperature / 100) * 100;

        const gVeskottFactorA5 = calculateU235AbsorptionGFactor(
            neutronGasTemperature,
        );
        const gVeskottFactorF5 = calculateU235FissionGFactor(
            neutronGasTemperature,
        );

        setNeutronGasParams({
            totalMacroSigmaA,
            neutronGasTemperature,
            gVeskottFactorA5,
            gVeskottFactorF5,
            roundedTemperature,
        });
    }, [macroSigmaATotal, coolantTemperature]);
};
