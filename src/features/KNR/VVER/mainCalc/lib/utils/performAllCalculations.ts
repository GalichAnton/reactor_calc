import { InitialParams } from '@entities/KNR';
import {
    calculateCellParams,
    calculateConcentrationParams,
    calculateMacroscopicCrossSections,
} from '@features/KNR/calcFirst';

export const performAllCalculations = async (params: InitialParams) => {
    const {
        electricalPower,
        thermalPower,
        primaryCircuitPressure,
        coreHeight,
        coolantTemperature,
        uraniumEnrichment,
        corePowerDensity,
        nTvel,
        latticePitch,
        fuelRodLatticePitch,
        assemblySizeAcrossFlats,
        fuelPelletRadius,
        claddingInnerRadius,
        claddingOuterRadius,
        controlRodRadius,
        claddingMaterial,
        reactorType,
        nominalPower,
    } = params;

    const cellParams = await calculateCellParams({
        fuelRodLatticePitch,
        fuelPelletRadius,
        claddingInnerRadius,
        claddingOuterRadius,
    });

    const concentrationsParams = await calculateConcentrationParams({
        uraniumEnrichment,
        coolantTemperature,
        fuelFraction: cellParams.fuelFraction,
        waterFraction: cellParams.waterVolume,
        zirconiumFraction: cellParams.zirconiumFraction,
    });

    const macroscopicCrossSections = await calculateMacroscopicCrossSections({
        averageN_5: concentrationsParams.averageN_5,
        averageN_8: concentrationsParams.averageN_8,
        averageN_Zr: concentrationsParams.averageN_Zr,
        averageN_O2: concentrationsParams.averageN_O2,
        averageN_H2O: concentrationsParams.averageN_H2O,
    });
};
