import { useEffect } from 'react';

import { useKInfParamsStore } from '../../model/stores/kInfParamsStore.ts';
import { useNeutronDiffusionAgeStore } from '../../model/stores/neutronDiffusionAgeStore.ts';
import { useReactorCriticalityStore } from '../../model/stores/reactorCriticalityParamsStore.ts';

export const useCalcReactorCriticaly = () => {
    const { setReactorCriticalityParams } = useReactorCriticalityStore();

    const {
        kInfParams: { infiniteMultiplicationFactor },
    } = useKInfParamsStore();
    const {
        neutronDiffusionAgeParams: { diffusionLengthSquared, neutronAge },
    } = useNeutronDiffusionAgeStore();

    useEffect(() => {
        const migrationArea =
            diffusionLengthSquared.value +
            infiniteMultiplicationFactor.value * neutronAge.value;

        const geometricParameter =
            (infiniteMultiplicationFactor.value - 1) / migrationArea;

        const materialParameter = geometricParameter;

        const besselRoot = 2.405;

        const heightToDiameterRatio = 0.92;

        const coreHeight = Math.sqrt(
            (Math.pow(Math.PI, 2) +
                Math.pow(heightToDiameterRatio, 2) * Math.pow(besselRoot, 2)) /
                materialParameter,
        );

        const coreDiameter = coreHeight / heightToDiameterRatio;

        const kEff =
            infiniteMultiplicationFactor.value *
            (1 / (1 + materialParameter * migrationArea));

        const reactivity = (kEff - 1) / kEff;

        setReactorCriticalityParams({
            reactivity,
            migrationArea,
            kEff,
            materialParameter,
            geometricParameter,
            besselRoot,
            heightToDiameterRatio,
            coreHeight,
            coreDiameter,
        });
    }, [diffusionLengthSquared, neutronAge, infiniteMultiplicationFactor]);
};