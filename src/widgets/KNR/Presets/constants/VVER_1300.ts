import { InitialParams } from '@entities/KNR';
import { REACTOR_TYPES } from '@entities/reactor';

export interface VVER_1300 {
    initialParams: InitialParams;
}

export const VVER_1300: VVER_1300 = {
    initialParams: {
        electricalPower: 1300,
        thermalPower: 3900,
        coolantTemperature: 538,
        uraniumEnrichment: 4.9,
        corePowerDensity: 111,
        primaryCircuitPressure: 15,
        nTvel: 312,
        latticePitch: 23.6,
        fuelRodLatticePitch: 1.275,
        assemblySizeAcrossFlats: 23.5,
        fuelPelletRadius: 0.38,
        claddingInnerRadius: 0.3865,
        claddingOuterRadius: 0.455,
        claddingMaterial: 'Zr+1%Nb',
        coreHeight: 353,
        controlRodRadius: 0.41,
        nominalPower: 1300,
        reactorType: REACTOR_TYPES.VVER,
    },
};
