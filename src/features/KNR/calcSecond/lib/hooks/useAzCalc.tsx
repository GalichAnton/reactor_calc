import { useEffect } from 'react';

import { useKInfParamsStore } from '@features/KNR/calcFirst/model/stores/kInfParamsStore.ts';
import { useNeutronDiffusionAgeStore } from '@features/KNR/calcFirst/model/stores/neutronDiffusionAgeStore.ts';
import { roundToDecimal } from '@shared/lib/utils';

import { useInitialParamsStore } from '../../../setInitialValues';
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

    const {
        initialParams: {
            latticePitch,
            thermalPower,
            corePowerDensity,
            coreHeight,
        },
    } = useInitialParamsStore();

    const {
        kInfParams: { infiniteMultiplicationFactor },
    } = useKInfParamsStore();

    const {
        neutronDiffusionAgeParams: { neutronAge, diffusionLengthSquared },
    } = useNeutronDiffusionAgeStore();

    useEffect(() => {
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

        setAZPhysParams({
            numFuelAssemblies: Ntvs,
            diameter: d,
            effectiveMultiplicationFactor: keff,
            reactorReactivity: ro,
            geometricParameter: B,
            volume: azVolume,
        });
    }, [
        thermalPower,
        corePowerDensity,
        coreHeight,
        latticePitch,
        infiniteMultiplicationFactor,
        neutronAge,
        diffusionLengthSquared,
    ]);
};
