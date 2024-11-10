import {
    useKInfParamsStore,
    useNeutronDiffusionAgeStore,
} from '@features/KNR/calcFirst';
import { useInitialParamsStore } from '@features/KNR/VVER/setInitialValues';
import { roundToDecimal } from '@shared/lib/utils';

import { useAZPhysParamsStore } from '../../model/store/azPhysParamsStore.ts';
import {
    calculateAZDiameter,
    calculateAZVolume,
    calculateGeometricParameter,
    calculateKeffective,
    calculateNumberOfTVS,
    calculateReactivity,
} from '../utils/calcAZ.ts';

export const useAzCalc = () => {
    const { setAZPhysParams } = useAZPhysParamsStore();

    const computeAZParams = async () => {
        try {
            const {
                initialParams: {
                    latticePitch,
                    thermalPower,
                    corePowerDensity,
                    coreHeight,
                },
            } = useInitialParamsStore.getState();

            const {
                kInfParams: { infiniteMultiplicationFactor },
            } = useKInfParamsStore.getState();

            const {
                neutronDiffusionAgeParams: {
                    neutronAge,
                    diffusionLengthSquared,
                },
            } = useNeutronDiffusionAgeStore.getState();

            const azVolume = roundToDecimal(
                calculateAZVolume(thermalPower, corePowerDensity),
                3,
            );
            const d = calculateAZDiameter(azVolume, coreHeight);
            const B = calculateGeometricParameter(d, coreHeight);
            const Ntvs = calculateNumberOfTVS(d, latticePitch);
            const keff = calculateKeffective(
                infiniteMultiplicationFactor.value,
                B,
                neutronAge.value,
                diffusionLengthSquared.value,
            );

            const ro = roundToDecimal(calculateReactivity(keff), 3);

            const azPhysParams = {
                numFuelAssemblies: Ntvs,
                diameter: d,
                effectiveMultiplicationFactor: keff,
                reactorReactivity: ro,
                geometricParameter: B,
                volume: azVolume,
            };

            setAZPhysParams(azPhysParams);
        } catch (error) {
            console.error(
                'Ошибка при расчете физических параметров активной зоны',
                error,
            );
        }
    };

    return { computeAZParams };
};
