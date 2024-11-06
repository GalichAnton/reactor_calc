import { AZCharacteristics, ReactorCharacteristics, TVS } from '@entities/KNR';
import { REACTOR_TYPES } from '@entities/reactor';

export interface IVVER_1000 {
    reactorCharacteristics: ReactorCharacteristics;
    tvsCharacteristics: TVS;
    AZCharacteristics: AZCharacteristics;
}

export const VVER_1300: IVVER_1000 = {
    reactorCharacteristics: {
        electricalPower: 1300,
        thermalPower: 3900,
        primaryCircuitPressure: 15,
        corePowerDensity: 111,
        coreHeight: 353,
        coolantTemperature: 538,
        uraniumEnrichment: 0.049,
        nominalPower: 1000, //
        reactorType: REACTOR_TYPES.VVER,
    },
    tvsCharacteristics: {
        ntvel: 312,
        latticePitch: 24.1,
        fuelPelletRadius: 0.38,
        innerCladdingRadius: 0.3865,
        outerCladdingRadius: 0.455,
        controlRodRadius: 0.41,
        claddingMaterial: 'Zr+1%Nb',
    },
    AZCharacteristics: {
        blockVolume: 0.469,
        moderatorVolume: 0.939,
        cellVolume: 1.408,
        fuelVolume: 0.454,
        averageAbsorptionCrossSection238U: 1.453,
        averageAbsorptionCrossSection235U: 364.03,
        averageFissionCrossSection235U: 286.28,
        nuclearConcentration235U: 1.017e21,
        nuclearConcentration238U: 1.973e22,
        transportMacroscopicCrossSectionH2O: 0.586,
        transportMacroscopicCrossSection238U: 0.062,
        transportMacroscopicCrossSectionOxygen: 0.0487,
        transportMacroscopicCrossSectionZirconium: 0.0317,
        totalTransportMacroscopicCrossSection: 0.2639,
        macroscopicAbsorptionCrossSectionBlock: 0.1242,
        macroscopicAbsorptionCrossSectionModerator: 4.12e-3,
        neutronGasTemperature: 800,
        reproductionLossCoefficient: 1.105,
        thermalNeutronUtilizationCoefficient: 0.9,
        fastNeutronReproductionCoefficient: 1.047,
        resonanceEscapeProbability: 0.753,
        secondaryNeutronsPerAbsorption235U: 1.9,
        infiniteNeutronMultiplicationCoefficient: 1.348,
        thermalNeutronAge: 36.907,
        diffusionLength: 1.71,
    },
};
