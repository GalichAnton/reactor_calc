import { AZCharacteristics, ReactorCharacteristics, TVS } from '@entities/KNR';
import { REACTOR_TYPES } from '@entities/reactor';

export interface IVVER_1400 {
    reactorCharacteristics: ReactorCharacteristics;
    tvsCharacteristics: TVS;
    AZCharacteristics: AZCharacteristics;
}

export const VVER_1400: IVVER_1400 = {
    reactorCharacteristics: {
        electricalPower: 1400, //
        thermalPower: 4200, //
        primaryCircuitPressure: 15, //
        corePowerDensity: 111, //
        coreHeight: 370, //
        coolantTemperature: 538, //
        uraniumEnrichment: 0.03, //
        nominalPower: 1000, //
        reactorType: REACTOR_TYPES.VVER,
    },
    tvsCharacteristics: {
        ntvel: 312, //
        latticePitch: 23.6, //
        fuelPelletRadius: 0.38, //
        innerCladdingRadius: 0.3865, //
        outerCladdingRadius: 0.455, //
        controlRodRadius: 0.41, //
        claddingMaterial: 'Zr+1%Nb', //
    },
    AZCharacteristics: {
        blockVolume: 0.469,
        moderatorVolume: 0.757, //
        cellVolume: 1.408, //
        fuelVolume: 0.454,
        averageAbsorptionCrossSection238U: 1.554, //
        averageAbsorptionCrossSection235U: 365.03, //
        averageFissionCrossSection235U: 302.7, //
        nuclearConcentration235U: 6.224e20, //
        nuclearConcentration238U: 2.012e22, //
        transportMacroscopicCrossSectionH2O: 0.627, //
        transportMacroscopicCrossSection238U: 0.064, //
        transportMacroscopicCrossSectionOxygen: 0.049, //
        transportMacroscopicCrossSectionZirconium: 0.032, //
        totalTransportMacroscopicCrossSection: 0.2639, //
        macroscopicAbsorptionCrossSectionBlock: 0.081, //
        macroscopicAbsorptionCrossSectionModerator: 4.405e-3, //
        neutronGasTemperature: 700, //
        reproductionLossCoefficient: 1.005, //
        thermalNeutronUtilizationCoefficient: 0.8195, //
        fastNeutronReproductionCoefficient: 1.047, //
        resonanceEscapeProbability: 0.753, //
        secondaryNeutronsPerAbsorption235U: 2.047, //
        infiniteNeutronMultiplicationCoefficient: 1.322, //
        thermalNeutronAge: 38.326, //
        diffusionLength: 2.101, //
    },
};
