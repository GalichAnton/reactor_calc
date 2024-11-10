import { useInitialParamsStore } from '@features/KNR/VVER/setInitialValues';
import {
    calculateU235AbsorptionGFactor,
    calculateU235FissionGFactor,
} from '@shared/lib/utils';

import { useMacroscopicCrossSectionsStore } from '../../model/stores/macroscopicCrossSectionsStore.ts';
import { useModerationCapacityStore } from '../../model/stores/ModerationCapacityStore.ts';
import { useNeutronGasParamsStore } from '../../model/stores/neutronGasStore.ts';

export const useCalcNeutronGasParams = () => {
    const { setNeutronGasParams } = useNeutronGasParamsStore();

    const computeNeutronGasParams = async () => {
        try {
            const {
                macroscopicCrossSections: { macroSigmaATotal },
            } = useMacroscopicCrossSectionsStore.getState();

            const {
                initialParams: { coolantTemperature },
            } = useInitialParamsStore.getState();

            const {
                moderationCapacityParams: { totalModerationCapacity },
            } = useModerationCapacityStore.getState();

            const totalMacroSigmaA =
                macroSigmaATotal.value * Math.sqrt(293 / coolantTemperature);

            const neutronGasTemperature =
                coolantTemperature *
                (1 + (1.4 * totalMacroSigmaA) / totalModerationCapacity.value);

            const roundedTemperature =
                Math.ceil(neutronGasTemperature / 100) * 100;

            const gVeskottFactorA5 = calculateU235AbsorptionGFactor(
                neutronGasTemperature,
            );
            const gVeskottFactorF5 = calculateU235FissionGFactor(
                neutronGasTemperature,
            );

            const neutronGasParams = {
                totalMacroSigmaA,
                neutronGasTemperature,
                gVeskottFactorA5,
                gVeskottFactorF5,
                roundedTemperature,
            };

            setNeutronGasParams(neutronGasParams);
        } catch (error) {
            console.error(
                'Ошибка при расчете параметров нейтронного газа',
                error,
            );
        }
    };

    return { computeNeutronGasParams };
};
