import { InitialParams } from '@entities/KNR';
import {
    calculateAverageCrossSections,
    calculateCellParams,
    calculateConcentrationParams,
    calculateKInfParams,
    calculateLossFactorParams,
    calculateMacroscopicCrossSections,
    calculateModerationCapacity,
    calculateNeutronAgeParams,
    calculateNeutronGasParams,
    calculateReactorCriticality,
    calculateTransportMacroSections,
    calculateTwoZoneParams,
} from '@features/KNR/calcFirst';
import {
    calculateAZParams,
    calculateCompanyParams,
    calculateFuelParams,
    calculateIsotopeComposition,
    calculateZrelationsParams,
} from '@features/KNR/calcSecond';
import { START_Z } from '@shared/constants/general.ts';

export const performAllCalculations = async (params: InitialParams) => {
    const {
        thermalPower,
        coreHeight,
        coolantTemperature,
        uraniumEnrichment,
        corePowerDensity,
        nTvel,
        latticePitch,
        fuelRodLatticePitch,
        fuelPelletRadius,
        claddingInnerRadius,
        claddingOuterRadius,
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
        waterFraction: cellParams.waterFraction,
        zirconiumFraction: cellParams.zirconiumFraction,
    });

    const macroscopicCrossSections = await calculateMacroscopicCrossSections({
        averageN_5: concentrationsParams.averageN_5,
        averageN_8: concentrationsParams.averageN_8,
        averageN_Zr: concentrationsParams.averageN_Zr,
        averageN_O2: concentrationsParams.averageN_O2,
        averageN_H2O: concentrationsParams.averageN_H2O,
    });

    const moderationCapacity = await calculateModerationCapacity({
        averageN_5: concentrationsParams.averageN_5,
        averageN_8: concentrationsParams.averageN_8,
        averageN_Zr: concentrationsParams.averageN_Zr,
        averageN_O2: concentrationsParams.averageN_O2,
        averageN_H2O: concentrationsParams.averageN_H2O,
    });

    const neutronGasParams = await calculateNeutronGasParams({
        coolantTemperature,
        macroSigmaATotal: macroscopicCrossSections.macroSigmaATotal,
        totalModerationCapacity: moderationCapacity.totalModerationCapacity,
    });

    const averageCrossSections = await calculateAverageCrossSections({
        concentrations: {
            averageN_5: concentrationsParams.averageN_5,
            averageN_8: concentrationsParams.averageN_8,
            averageN_Zr: concentrationsParams.averageN_Zr,
            averageN_O2: concentrationsParams.averageN_O2,
            averageN_H2O: concentrationsParams.averageN_H2O,
        },
        neutronGasParams: {
            gVeskottFactorA5: neutronGasParams.gVeskottFactorA5,
            gVeskottFactorF5: neutronGasParams.gVeskottFactorF5,
            roundedTemperature: neutronGasParams.roundedTemperature,
        },
    });

    const transportCrossSections = await calculateTransportMacroSections({
        averageN_5: concentrationsParams.averageN_5,
        averageN_8: concentrationsParams.averageN_8,
        averageN_Zr: concentrationsParams.averageN_Zr,
        averageN_O2: concentrationsParams.averageN_O2,
        averageN_H2O: concentrationsParams.averageN_H2O,
        averagedMacroAO2: averageCrossSections.averagedMacroAO2,
        averagedMacroAU5: averageCrossSections.averagedMacroAU5,
        averagedMacroAU8: averageCrossSections.averagedMacroAU8,
        averagedMacroAZr: averageCrossSections.averagedMacroAZr,
        roundedTemperature: neutronGasParams.roundedTemperature,
    });

    const twoZoneParams = await calculateTwoZoneParams({
        concentrations: {
            averageN_5: concentrationsParams.averageN_5,
            averageN_8: concentrationsParams.averageN_8,
            averageN_Zr: concentrationsParams.averageN_Zr,
            averageN_O2: concentrationsParams.averageN_O2,
            averageN_H2O: concentrationsParams.averageN_H2O,
        },
        averagedCrossSections: {
            averagedMicroAH2O: averageCrossSections.averagedMicroAH2O,
            averagedMicroAO2: averageCrossSections.averagedMicroAO2,
            averagedMicroAZr: averageCrossSections.averagedMicroAZr,
            averagedMicroAU5: averageCrossSections.averagedMicroAU5,
            averagedMicroAU8: averageCrossSections.averagedMicroAU8,
        },
        geometry: {
            claddingInnerRadius,
            waterVolume: cellParams.waterVolume,
            cellVolume: cellParams.cellVolume,
            claddingVolume: cellParams.claddingVolume,
            fuelVolume: cellParams.fuelVolume,
        },
        transportMacro: {
            transportMacroH2O: transportCrossSections.transportMacroH2O,
            transportMacroO2: transportCrossSections.transportMacroO2,
            transportMacroU235: transportCrossSections.transportMacroU235,
            transportMacroU238: transportCrossSections.transportMacroU238,
            transportMacroZr: transportCrossSections.transportMacroZr,
        },
    });

    const lossFactorParams = await calculateLossFactorParams({
        moderationCapacity: {
            U235: moderationCapacity.moderationCapacityU235,
            U238: moderationCapacity.moderationCapacityU238,
            H2O: moderationCapacity.moderationCapacityH2O,
            O2: moderationCapacity.moderationCapacityO2,
            Zr: moderationCapacity.moderationCapacityZr,
        },
        twoZoneParams: {
            blockAbsorptionCrossSection:
                twoZoneParams.twoZoneBlockAbsorptionCrossSection,
            blockTransportCrossSection:
                twoZoneParams.twoZoneBlockTransportCrossSection,
            firstZoneRadius: twoZoneParams.twoZoneFirstZoneRadius,
            totalRadius: twoZoneParams.twoZoneTotalRadius,
            moderatorAbsorptionCrossSection:
                twoZoneParams.twoZoneModeratorAbsorptionCrossSection,
            moderatorTransportCrossSection:
                twoZoneParams.twoZoneModeratorTransportCrossSection,
        },
    });

    const kInfParams = await calculateKInfParams({
        averageN_5: concentrationsParams.averageN_5,
        averagedMicroAU5: averageCrossSections.averagedMicroAU5,
        averagedMicroFU5: averageCrossSections.averagedMicroFU5,
        averagedMacroAU5: averageCrossSections.averagedMacroAU5,
        coolantTemperature,
        cellVolume: cellParams.cellVolume,
        fuelArea: cellParams.fuelArea,
        fuelVolume: cellParams.fuelVolume,
        lossFactor: lossFactorParams.lossFactor,
        totalModerationCapacity: moderationCapacity.totalModerationCapacity,

        twoZoneBlockAbsorptionCrossSection:
            twoZoneParams.twoZoneBlockAbsorptionCrossSection,
        twoZoneModeratorAbsorptionCrossSection:
            twoZoneParams.twoZoneModeratorAbsorptionCrossSection,
        twoZoneModeratorVolume: twoZoneParams.twoZoneModeratorVolume,
        twoZoneCellVolume: twoZoneParams.twoZoneFirstZoneVolume,
        waterVolume: cellParams.waterVolume,
        N_0U: concentrationsParams.N_0U,
    });

    const neutronAgeParams = await calculateNeutronAgeParams({
        transportMacroTotal: transportCrossSections.transportMacroTotal,
        averagedMacroATotal: averageCrossSections.averagedMacroATotal,
        waterVolume: cellParams.waterVolume,
        averageN_Zr: concentrationsParams.averageN_Zr,
        averageN_O2: concentrationsParams.averageN_O2,
        claddingVolume: cellParams.claddingVolume,
        fuelVolume: cellParams.fuelVolume,
        cellVolume: cellParams.cellVolume,
        N_0U: concentrationsParams.N_0U,
    });

    const reactorCriticallyParams = await calculateReactorCriticality({
        neutronAge: neutronAgeParams.neutronAge,
        infiniteMultiplicationFactor: kInfParams.infiniteMultiplicationFactor,
        diffusionLengthSquared: neutronAgeParams.diffusionLengthSquared,
    });

    const aZparams = await calculateAZParams({
        latticePitch,
        thermalPower,
        diffusionLengthSquared: neutronAgeParams.diffusionLengthSquared,
        neutronAge: neutronAgeParams.neutronAge,
        corePowerDensity,
        coreHeight,
        infiniteMultiplicationFactor: kInfParams.infiniteMultiplicationFactor,
    });

    const isotopesParams = await calculateIsotopeComposition({
        thermalPower,
        coreHeight,
        geometricParameter: aZparams.geometricParameter,
        neutronAge: neutronAgeParams.neutronAge,
        nTvel,
        N_05: concentrationsParams.N_05,
        N_08: concentrationsParams.N_08,
        neutronGasTemperature: neutronGasParams.neutronGasTemperature,
        numFuelAssemblies: aZparams.numFuelAssemblies,
        reproductionFactor: kInfParams.reproductionFactor,
        fastFissionFactor: kInfParams.fastFissionFactor,
        resonanceEscapeProbability: kInfParams.resonanceEscapeProbability,
        fuelVolume: cellParams.fuelVolume,
        averagedMicroFU5: averageCrossSections.averagedMicroFU5,
        averagedMicroAU5: averageCrossSections.averagedMicroAU5,
        averagedMicroAU8: averageCrossSections.averagedMicroAU8,
    });

    const zRelationParams = await calculateZrelationsParams({
        isotopesParams: {
            Sa8: isotopesParams.Sa8,
            Sa9: isotopesParams.Sa9,
            Sf9: isotopesParams.Sf9,
            Sf5: isotopesParams.Sf5,
            averageAbsorptionCrossSection239Pu:
                isotopesParams.averageAbsorptionCrossSection239Pu,
            averageFissionCrossSection239Pu:
                isotopesParams.averageFissionCrossSection239Pu,
            secondaryNeutronsPerAbsorption239Pu:
                isotopesParams.secondaryNeutronsPerAbsorption239Pu,
            averageSpecificByVolumePower:
                isotopesParams.averageSpecificByVolumePower,
        },
        azPhysParams: { geometricParameter: aZparams.geometricParameter },
        cellParams: {
            fuelVolume: cellParams.fuelVolume,
            cellVolume: cellParams.cellVolume,
        },
        concentrations: {
            N_05: concentrationsParams.N_05,
            N_08: concentrationsParams.N_08,
        },
        kInfParams: {
            reproductionFactor: kInfParams.reproductionFactor,
            fastFissionFactor: kInfParams.fastFissionFactor,
            resonanceEscapeProbability: kInfParams.resonanceEscapeProbability,
            infiniteMultiplicationFactor:
                kInfParams.infiniteMultiplicationFactor,
            thermalUtilization: kInfParams.thermalUtilization,
        },
        neutronDiffusionAgeParams: { neutronAge: neutronAgeParams.neutronAge },
        neutronGasParams: {
            neutronGasTemperature: neutronGasParams.roundedTemperature,
        },
        averagedCrossSections: {
            averagedMicroFU5: averageCrossSections.averagedMicroFU5,
            averagedMicroAU5: averageCrossSections.averagedMicroAU5,
            averagedMicroAU8: averageCrossSections.averagedMicroAU8,
            averagedMacroAU5: averageCrossSections.averagedMacroAU5,
        },
        twoZoneModelParams: {
            twoZoneFirstZoneVolume: twoZoneParams.twoZoneFirstZoneVolume,
            twoZoneBlockAbsorptionCrossSection:
                twoZoneParams.twoZoneBlockAbsorptionCrossSection,
            twoZoneModeratorAbsorptionCrossSection:
                twoZoneParams.twoZoneModeratorAbsorptionCrossSection,
            twoZoneModeratorVolume: twoZoneParams.twoZoneModeratorVolume,
        },
        transportMacroCrossSections: {
            transportMacroH2O: transportCrossSections.transportMacroH2O,
            transportMacroU238: transportCrossSections.transportMacroU238,
            transportMacroO2: transportCrossSections.transportMacroO2,
            transportMacroZr: transportCrossSections.transportMacroZr,
        },
        lossFactorParams: { lossFactor: lossFactorParams.lossFactor },
        START_Z,
    });

    const companyParams = await calculateCompanyParams({
        isotopesParams: {
            Sf5: isotopesParams.Sf5,
            averageSpecificByVolumePower:
                isotopesParams.averageSpecificByVolumePower,
        },
        zRelationsParams: zRelationParams,
        coreHeight: coreHeight,
        nTvel: nTvel,
        nTvs: aZparams.numFuelAssemblies,
        V_U: cellParams.fuelVolume,
    });

    const fuelParams = await calculateFuelParams({
        fuelVolume: cellParams.fuelVolume,
        N_08: concentrationsParams.N_08,
        N_05: concentrationsParams.N_05,
        coreHeight,
        thermalPower,
        reactorOperationalTime:
            companyParams.params.company.reactorOperationalTime,
        dN5: companyParams.dN5,
        numFuelAssemblies: aZparams.numFuelAssemblies,
        nTvel,
    });

    return {
        cellParams,
        concentrationsParams,
        macroscopicCrossSections,
        moderationCapacity,
        neutronGasParams,
        averageCrossSections,
        transportCrossSections,
        twoZoneParams,
        lossFactorParams,
        kInfParams,
        neutronAgeParams,
        reactorCriticallyParams,
        aZparams,
        isotopesParams,
        zRelationParams,
        companyParams,
        fuelParams,
    };
};
