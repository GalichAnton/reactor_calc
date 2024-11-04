import { AZCharacteristics, ReactorCharacteristics, TVS } from '@entities/KNR';
import { REACTOR_TYPES } from '@entities/reactor';

export interface IVVER_440 {
    reactorCharacteristics: ReactorCharacteristics;
    tvsCharacteristics: TVS;
    AZCharacteristics: AZCharacteristics;
}

export const VVER_440: IVVER_440 = {
    reactorCharacteristics: {
        electricalPower: 440, //
        thermalPower: 1375, //
        primaryCircuitPressure: 12.5,
        corePowerDensity: 83, //
        coreHeight: 250, //
        coolantTemperature: 542, //
        uraniumEnrichment: 0.024, //
        nominalPower: 440, //
        reactorType: REACTOR_TYPES.VVER,
    },
    tvsCharacteristics: {
        ntvel: 126, //
        latticePitch: 24.1,
        fuelPelletRadius: 0.385, //
        innerCladdingRadius: 0.395, //
        outerCladdingRadius: 0.455, //
        controlRodRadius: 0.41,
        claddingMaterial: 'Zr+1%Nb',
    },
    AZCharacteristics: {
        blockVolume: 0.466, //
        moderatorVolume: 0.834, //
        cellVolume: 1.485, //
        fuelVolume: 0.465, //
        averageAbsorptionCrossSection238U: 1.6, //
        averageAbsorptionCrossSection235U: 376.8, //
        averageFissionCrossSection235U: 312.2, //
        nuclearConcentration235U: 4.979e20, //
        nuclearConcentration238U: 2.025e22, //
        transportMacroscopicCrossSectionH2O: 0.674, //
        transportMacroscopicCrossSection238U: 0.063, //
        transportMacroscopicCrossSectionOxygen: 0.00003, //
        transportMacroscopicCrossSectionZirconium: 0.047, //
        totalTransportMacroscopicCrossSection: 0.2175, //
        macroscopicAbsorptionCrossSectionBlock: 0.069, //
        macroscopicAbsorptionCrossSectionModerator: 0.00582, //
        neutronGasTemperature: 660, //
        reproductionLossCoefficient: 1.11, //
        thermalNeutronUtilizationCoefficient: 0.73, //
        fastNeutronReproductionCoefficient: 1.045, //
        resonanceEscapeProbability: 0.76, //
        secondaryNeutronsPerAbsorption235U: 2.046, //
        infiniteNeutronMultiplicationCoefficient: 1.196, //
        thermalNeutronAge: 42.686, //
        diffusionLength: 2.291, //
    },
};
