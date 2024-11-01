import { useEffect } from 'react';

import { roundToDecimal } from '@shared/lib/utils';

import {
    useAZStore,
    useReactorStore,
    useTVSStore,
} from '../../../setInitialValues';
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
    const { thermalPower, corePowerDensity, coreHeight } = useReactorStore(
        (state) => state.reactorCharacteristics,
    );
    const { latticePitch } = useTVSStore((state) => state.TVSCharacteristics);
    const {
        infiniteNeutronMultiplicationCoefficient,
        diffusionLength,
        thermalNeutronAge,
    } = useAZStore((state) => state.AZCharacteristics);

    useEffect(() => {
        const azVolume = roundToDecimal(
            calculateAZVolume(thermalPower, corePowerDensity),
            3,
        );
        const d = roundToDecimal(calculateAZDiameter(azVolume, coreHeight), 3);
        const B = roundToDecimal(calculateGeometricParameter(d, coreHeight), 3);
        const Ntvs = calculateNumberOfTVS(d, latticePitch);
        const keff = roundToDecimal(
            calculateKeffective(
                infiniteNeutronMultiplicationCoefficient,
                B,
                thermalNeutronAge,
                diffusionLength,
            ),
            3,
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
        infiniteNeutronMultiplicationCoefficient,
        diffusionLength,
        thermalNeutronAge,
    ]);
};
