import { REACTOR_TYPES } from '@entities/reactor';
import { VVER } from '@widgets/KNR/Presets/model/types.ts';

export const VVER_X: VVER = {
    initialParams: {
        electricalPower: 440,
        thermalPower: 1375,
        coolantTemperature: 558,
        uraniumEnrichment: 3.7,
        corePowerDensity: 83,
        primaryCircuitPressure: 12.3,
        nTvel: 126,
        latticePitch: 14.4,
        fuelRodLatticePitch: 1.22,
        assemblySizeAcrossFlats: 14.7,
        fuelPelletRadius: 0.385,
        claddingInnerRadius: 0.395,
        claddingOuterRadius: 0.455,
        claddingMaterial: 'Zr+1%Nb',
        coreHeight: 244,
        controlRodRadius: 0.41,
        nominalPower: 440,
        reactorType: REACTOR_TYPES.VVER,
    },
};
