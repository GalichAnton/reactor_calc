import { InitialParams } from '@entities/KNR';
import { REACTOR_TYPES } from '@entities/reactor';

export interface VVER_440 {
    initialParams: InitialParams;
}

export const VVER_440: VVER_440 = {
    initialParams: {
        electricalPower: 440, //
        thermalPower: 1320, //
        coolantTemperature: 538, //
        uraniumEnrichment: 2.4, //
        corePowerDensity: 83, //
        primaryCircuitPressure: 15,
        nTvel: 126, //
        latticePitch: 23, //
        fuelRodLatticePitch: 1.23, //
        assemblySizeAcrossFlats: 14.4, //
        fuelPelletRadius: 0.385, //
        claddingInnerRadius: 0.395, //
        claddingOuterRadius: 0.455, //
        claddingMaterial: 'Zr+1%Nb', //
        coreHeight: 244, //
        controlRodRadius: 0.41,
        nominalPower: 440, //
        reactorType: REACTOR_TYPES.VVER,
    },
};
