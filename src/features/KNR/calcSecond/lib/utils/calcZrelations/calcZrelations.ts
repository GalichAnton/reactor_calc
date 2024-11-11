import { ZRelations } from '@features/KNR/calcSecond';

import {
    calculateAbsorptionSlagCrossSection,
    calculateAverageSecondaryNeutronsPerAbsorption,
    calculateBlockAbsorptionCrossSection,
    calculateDiffusionLength,
    calculateEffectiveNeutronMultiplication,
    calculateMeanMacroscopicAbsorptionCrossSectionPu239,
    calculateMeanMacroscopicAbsorptionCrossSectionU235,
    calculateMeanMacroscopicFissionCrossSection,
    calculateMeanMacroscopicFissionCrossSectionPu239,
    calculateMeanNuclearConcentrationU235,
    calculateMeanPlutoniumConcentration,
    calculateMeanXenonAbsorptionCrossSection,
    calculateNeutronFlux,
    calculateNeutronMultiplication,
    calculateReactorOperationalDays,
    calculateSamariumAbsorptionCrossSection,
    calculateThermalNeutronUtilization,
    calculateTotalAbsorptionCrossSection,
    calculateTotalTransportCrossSection,
    calculateTransportCrossSectionPu239,
    calculateTransportCrossSectionU235,
    calculateXenonAbsorptionCrossSection,
} from './helpers.ts';
import {
    calculateNuclearConcentrationByKR,
    calculateNuclearConcentrationPuByBat,
    calculateNuclearConcentrationPuByRum,
    calculateNuclearConcentrationU5ByBat,
    calculateNuclearConcentrationU5ByRum,
    NuclearConcentrationParamsByKR,
} from '../calcNuclearConcentrations/calcNuclearConcentrations.ts';

/**
 * Интерфейс входных параметров для расчета параметров ZRelations
 */
interface ZrelationsParamsInput {
    // Входные параметры, такие как "isotopesParams", "azPhysParams", "cellParams", и т.д.
    isotopesParams: {
        Sa8: number;
        Sa9: number;
        Sf9: number;
        Sf5: number;
        averageAbsorptionCrossSection239Pu: number;
        averageFissionCrossSection239Pu: number;
        secondaryNeutronsPerAbsorption239Pu: number;
        averageSpecificByVolumePower: number;
    };
    azPhysParams: {
        geometricParameter: number;
    };
    cellParams: {
        fuelVolume: number;
        cellVolume: number;
    };
    concentrations: {
        N_05: number;
        N_08: number;
    };
    kInfParams: {
        reproductionFactor: number;
        fastFissionFactor: number;
        resonanceEscapeProbability: number;
        infiniteMultiplicationFactor: number;
        thermalUtilization: number;
    };
    neutronDiffusionAgeParams: {
        neutronAge: number;
    };
    neutronGasParams: {
        neutronGasTemperature: number;
    };
    averagedCrossSections: {
        averagedMicroFU5: number;
        averagedMicroAU5: number;
        averagedMicroAU8: number;
        averagedMacroAU5: number;
    };
    twoZoneModelParams: {
        twoZoneFirstZoneVolume: number;
        twoZoneBlockAbsorptionCrossSection: number;
        twoZoneModeratorAbsorptionCrossSection: number;
        twoZoneModeratorVolume: number;
    };
    transportMacroCrossSections: {
        transportMacroH2O: number;
        transportMacroU238: number;
        transportMacroO2: number;
        transportMacroZr: number;
    };
    lossFactorParams: {
        lossFactor: number;
    };
    START_Z: number[];
}

/**
 * Рассчитывает параметры ZRelations для нейтронного газа
 *
 * @param {ZrelationsParamsInput} params - Объект с необходимыми входными данными
 * @returns {Promise<ZRelations[]>} - Возвращает массив с рассчитанными параметрами ZRelations
 */
export const calculateZrelationsParams = async (
    params: ZrelationsParamsInput,
): Promise<ZRelations[]> => {
    const zeroZvalues = {
        averageNuclearConcentration235UByZero: 0,
        averageAbsorptionMacroCrossSection235UByZero: 0,
        averageSecondaryNeutronsPerAbsorptionByZero: 0,
        thermalNeutronUtilizationByZero: 0,
    };

    try {
        const results: ZRelations[] = [];
        const epsilon =
            params.cellParams.fuelVolume / params.cellParams.cellVolume;

        for (let i = 0; i < params.START_Z.length; i++) {
            const z = params.START_Z[i];

            const averageNuclearConcentration235UByRum =
                calculateNuclearConcentrationU5ByRum(
                    params.concentrations.N_05,
                    z,
                );

            if (z === 0) {
                zeroZvalues.averageNuclearConcentration235UByZero =
                    averageNuclearConcentration235UByRum;
            }

            const averageNuclearConcentration239PuByRum =
                calculateNuclearConcentrationPuByRum({
                    nuclearConcentration238U: params.concentrations.N_08,
                    initialNuclearConcentration235U:
                        zeroZvalues.averageNuclearConcentration235UByZero,
                    thermalNeutronAge:
                        params.neutronDiffusionAgeParams.neutronAge,
                    fastNeutronReproductionCoefficient:
                        params.kInfParams.fastFissionFactor,
                    secondaryNeutronsPerAbsorption235U:
                        params.kInfParams.reproductionFactor,
                    resonanceEscapeProbability:
                        params.kInfParams.resonanceEscapeProbability,
                    geometricParameter: params.azPhysParams.geometricParameter,
                    Sa8: params.isotopesParams.Sa8,
                    Sa9: params.isotopesParams.Sa9,
                    z,
                });

            const reactorOperationalDays = calculateReactorOperationalDays({
                z,
                thermalNeutronAge: params.neutronDiffusionAgeParams.neutronAge,
                resonanceEscapeProbability:
                    params.kInfParams.resonanceEscapeProbability,
                nuclearConcentration239PUbyZ:
                    averageNuclearConcentration239PuByRum,
                nuclearConcentration235Uby0:
                    zeroZvalues.averageNuclearConcentration235UByZero,
                averageSpecificByVolumePower:
                    params.isotopesParams.averageSpecificByVolumePower,
                Sf9: params.isotopesParams.Sf9,
                Sf5: params.isotopesParams.Sf5,
                Sa9: params.isotopesParams.Sa9,
                Sa8: params.isotopesParams.Sa8,
                secondaryNeutronsPerAbsorption235U:
                    params.kInfParams.reproductionFactor,
                fastNeutronReproductionCoefficient:
                    params.kInfParams.fastFissionFactor,
                geometricParameter: params.azPhysParams.geometricParameter,
                nuclearConcentration238U: params.concentrations.N_05,
            });

            const absorptionSlagCrossSection =
                calculateAbsorptionSlagCrossSection({
                    t: reactorOperationalDays,
                    averageSpecificByVolumePower:
                        params.isotopesParams.averageSpecificByVolumePower,
                });

            const meanNuclearConcentrationU235 =
                calculateMeanNuclearConcentrationU235({
                    epsilon_U: epsilon,
                    N05_z: averageNuclearConcentration235UByRum,
                });

            const meanPlutoniumConcentration =
                calculateMeanPlutoniumConcentration({
                    epsilon_U: epsilon,
                    N09_z: averageNuclearConcentration239PuByRum,
                });

            const meanXenonAbsorptionCrossSection =
                calculateMeanXenonAbsorptionCrossSection(
                    params.neutronGasParams.neutronGasTemperature,
                );

            const meanMacroscopicFissionCrossSection235U =
                calculateMeanMacroscopicFissionCrossSection({
                    meanNuclearConcentrationU235: meanNuclearConcentrationU235,
                    averageFissionCrossSection235U:
                        params.averagedCrossSections.averagedMicroFU5,
                });

            const averageAbsorptionMacroCrossSection235U =
                calculateMeanMacroscopicAbsorptionCrossSectionU235({
                    meanNuclearConcentrationU235: meanNuclearConcentrationU235,
                    averageAbsorptionCrossSection235U:
                        params.averagedCrossSections.averagedMicroAU5,
                });

            if (z === 0) {
                zeroZvalues.averageAbsorptionMacroCrossSection235UByZero =
                    averageAbsorptionMacroCrossSection235U;
            }

            const averageAbsorptionMacroCrossSection239Pu =
                calculateMeanMacroscopicAbsorptionCrossSectionPu239({
                    meanPlutoniumConcentration: meanPlutoniumConcentration,
                    averageAbsorptionCrossSection239Pu:
                        params.isotopesParams
                            .averageAbsorptionCrossSection239Pu,
                });

            const meanMacroscopicFissionCrossSection239Pu =
                calculateMeanMacroscopicFissionCrossSectionPu239({
                    meanPlutoniumConcentration: meanPlutoniumConcentration,
                    averageFissionCrossSection239Pu:
                        params.isotopesParams.averageFissionCrossSection239Pu,
                });

            const neutronFluxDensity = calculateNeutronFlux({
                averageSpecificByVolumePower:
                    params.isotopesParams.averageSpecificByVolumePower,
                meanMacroscopicFissionCrossSection5:
                    meanMacroscopicFissionCrossSection235U,
                meanMacroscopicFissionCrossSection9:
                    meanMacroscopicFissionCrossSection239Pu,
            });

            const xenonAbsorptionCrossSection =
                calculateXenonAbsorptionCrossSection({
                    meanFissionCrossSection5:
                        meanMacroscopicFissionCrossSection235U,
                    meanFissionCrossSection9:
                        meanMacroscopicFissionCrossSection239Pu,
                    meanAbsorptionCrossSectionXe:
                        meanXenonAbsorptionCrossSection,
                    neutronFlux: neutronFluxDensity,
                });

            const samariumAbsorptionCrossSection =
                calculateSamariumAbsorptionCrossSection({
                    meanFissionCrossSection5:
                        meanMacroscopicFissionCrossSection235U,
                    meanFissionCrossSection9:
                        meanMacroscopicFissionCrossSection239Pu,
                });

            const averageSecondaryNeutronsPerAbsorption =
                calculateAverageSecondaryNeutronsPerAbsorption({
                    meanAbsorptionCrossSection5:
                        averageAbsorptionMacroCrossSection235U,
                    meanAbsorptionCrossSection9:
                        averageAbsorptionMacroCrossSection239Pu,
                    secondaryNeutronsPerAbsorption235U:
                        params.kInfParams.reproductionFactor,
                    secondaryNeutronsPerAbsorption239Pu:
                        params.isotopesParams
                            .secondaryNeutronsPerAbsorption239Pu,
                });

            if (z === 0) {
                zeroZvalues.averageSecondaryNeutronsPerAbsorptionByZero =
                    averageSecondaryNeutronsPerAbsorption;
            }

            const blockAbsorptionCrossSection =
                calculateBlockAbsorptionCrossSection({
                    blockVolume:
                        params.twoZoneModelParams.twoZoneFirstZoneVolume,
                    meanAbsorptionCrossSection5:
                        averageAbsorptionMacroCrossSection235U,
                    meanAbsorptionCrossSection9:
                        averageAbsorptionMacroCrossSection239Pu,
                    uraniumVolume: params.cellParams.fuelVolume,
                    initialAbsorptionCrossSection:
                        params.twoZoneModelParams
                            .twoZoneBlockAbsorptionCrossSection,
                    meanSlagAbsorptionCrossSection: absorptionSlagCrossSection,
                    meanXenonAbsorptionCrossSection:
                        xenonAbsorptionCrossSection,
                    meanSamariumAbsorptionCrossSection:
                        samariumAbsorptionCrossSection,
                    meanMacroscopicAbsorptionCrossSectionU235By0:
                        zeroZvalues.averageAbsorptionMacroCrossSection235UByZero,
                });

            const cosTeta5 = 2 / (3 * 235);
            const cosTeta9 = 2 / (3 * 239);

            const transportCrossSectionU235 =
                calculateTransportCrossSectionU235({
                    meanMacroscopicAbsorptionCrossSectionU235:
                        averageAbsorptionMacroCrossSection235U,
                    nuclearConcentrationU235: meanNuclearConcentrationU235,
                    cosineTheta5: cosTeta5,
                });

            const transportCrossSectionPu239 =
                calculateTransportCrossSectionPu239({
                    meanMacroscopicAbsorptionCrossSectionPu239:
                        averageAbsorptionMacroCrossSection239Pu,
                    nuclearConcentrationPu239:
                        averageNuclearConcentration239PuByRum,
                    cosineTheta9: cosTeta9,
                });

            const totalTransportCrossSection =
                calculateTotalTransportCrossSection({
                    meanTransportCrossSection8:
                        params.transportMacroCrossSections.transportMacroU238,
                    meanTransportCrossSectionH2O:
                        params.transportMacroCrossSections.transportMacroH2O,
                    meanTransportCrossSectionZr:
                        params.transportMacroCrossSections.transportMacroZr,
                    meanTransportCrossSectionU5: transportCrossSectionU235,
                    meanTransportCrossSectionPu9: transportCrossSectionPu239,
                    meanTransportCrossSectionO2:
                        params.transportMacroCrossSections.transportMacroO2,
                });

            const totalAbsorptionCrossSection =
                calculateTotalAbsorptionCrossSection({
                    meanAbsorptionCrossSectionU5:
                        averageAbsorptionMacroCrossSection235U,
                    meanAbsorptionCrossSectionPu9:
                        averageAbsorptionMacroCrossSection239Pu,
                    meanAbsorptionCrossSectionMisc: absorptionSlagCrossSection,
                    meanAbsorptionCrossSectionXe: xenonAbsorptionCrossSection,
                    meanAbsorptionCrossSectionSm:
                        samariumAbsorptionCrossSection,
                });

            const diffusionLength = calculateDiffusionLength({
                averageSumAbsorptionCrossSection: totalAbsorptionCrossSection,
                averageSumTransportCrossSection: totalTransportCrossSection,
            });

            const thermalNeutronUtilization =
                calculateThermalNeutronUtilization({
                    blockVolume:
                        params.twoZoneModelParams.twoZoneFirstZoneVolume,
                    moderatorVolume:
                        params.twoZoneModelParams.twoZoneModeratorVolume,
                    u235MacroAbsorptionCrossSection:
                        averageAbsorptionMacroCrossSection235U,
                    PuMacroAbsorptionCrossSection:
                        averageAbsorptionMacroCrossSection239Pu,
                    blockMacroAbsorptionCrossSection:
                        blockAbsorptionCrossSection,
                    lossFactor: params.lossFactorParams.lossFactor,
                    moderatorMacroAbsorptionCrossSection:
                        params.twoZoneModelParams
                            .twoZoneModeratorAbsorptionCrossSection,
                    fuelVolume: params.cellParams.fuelVolume,
                });

            if (z === 0) {
                zeroZvalues.thermalNeutronUtilizationByZero =
                    thermalNeutronUtilization;
            }

            const infiniteMediumNeutronMultiplicationFactor =
                calculateNeutronMultiplication({
                    k_infinite: params.kInfParams.infiniteMultiplicationFactor,
                    theta: thermalNeutronUtilization,
                    theta0: zeroZvalues.thermalNeutronUtilizationByZero,
                    secondaryNeutronsPerAbsorption235UorPu9:
                        averageSecondaryNeutronsPerAbsorption,
                    secondaryNeutrons0PerAbsorption235UorPu9:
                        zeroZvalues.averageSecondaryNeutronsPerAbsorptionByZero,
                });

            const effectiveNeutronMultiplicationFactor =
                calculateEffectiveNeutronMultiplication({
                    diffusionLength,
                    geometricParameter: params.azPhysParams.geometricParameter,
                    thermalNeutronAge:
                        params.neutronDiffusionAgeParams.neutronAge,
                    k_infinite: infiniteMediumNeutronMultiplicationFactor,
                });

            const averageNuclearConcentration235UByBat =
                calculateNuclearConcentrationU5ByBat(
                    params.concentrations.N_05,
                    z,
                );

            const averageNuclearConcentration239PuByBat =
                calculateNuclearConcentrationPuByBat({
                    z,
                    initialNuclearConcentration238U: params.concentrations.N_08,
                    initialNuclearConcentration235U: params.concentrations.N_05,
                    initialNuclearConcentration239Pu: 0,
                    averageAbsorptionCrossSection238U:
                        params.averagedCrossSections.averagedMicroAU8,
                    averageAbsorptionCrossSection235U:
                        params.averagedCrossSections.averagedMicroAU5,
                    averageAbsorptionCrossSection239Pu:
                        params.isotopesParams.averageFissionCrossSection239Pu,
                    fastNeutronReproductionCoefficient:
                        params.kInfParams.fastFissionFactor,
                    resonanceEscapeProbability:
                        params.kInfParams.resonanceEscapeProbability,
                });

            const KRParams: Partial<NuclearConcentrationParamsByKR> = {};
            if (i === 0) {
                KRParams.initialNuclearConcentration235U =
                    params.concentrations.N_05;
                KRParams.initialNuclearConcentration238U =
                    params.concentrations.N_08;
                KRParams.initialNuclearConcentration239Pu = 0;
            } else {
                const lastResult = results[i - 1];
                KRParams.initialNuclearConcentration235U =
                    lastResult.nuclearConcentration235UByKR;
                KRParams.initialNuclearConcentration238U =
                    lastResult.nuclearConcentration238UByKR;
                KRParams.initialNuclearConcentration239Pu =
                    lastResult.nuclearConcentration239PuByKR;
            }

            const {
                nuclearConcentration239PuByKR,
                nuclearConcentration235UByKR,
                nuclearConcentration238UByKR,
            } = calculateNuclearConcentrationByKR({
                dz: 0.01,
                initialNuclearConcentration235U:
                    KRParams.initialNuclearConcentration235U || 0,
                initialNuclearConcentration239Pu:
                    KRParams.initialNuclearConcentration239Pu || 0,
                initialNuclearConcentration238U:
                    KRParams.initialNuclearConcentration238U || 0,
                averageAbsorptionCrossSection238U:
                    params.averagedCrossSections.averagedMicroAU8,
                averageAbsorptionCrossSection235U:
                    params.averagedCrossSections.averagedMicroAU5,
                averageAbsorptionCrossSection239Pu:
                    params.isotopesParams.averageAbsorptionCrossSection239Pu,
                fastNeutronReproductionCoefficient:
                    params.kInfParams.reproductionFactor,
                resonanceEscapeProbability:
                    params.kInfParams.resonanceEscapeProbability,
                averageFissionCrossSection235U:
                    params.averagedCrossSections.averagedMicroFU5,
                averageFissionCrossSection239Pu:
                    params.isotopesParams.averageFissionCrossSection239Pu,
            });

            const reactivity =
                (effectiveNeutronMultiplicationFactor - 1) /
                infiniteMediumNeutronMultiplicationFactor;

            const data: ZRelations = {
                z,
                neutronFluxDensity: neutronFluxDensity,
                averageAbsorptionMacroCrossSection235U:
                    averageAbsorptionMacroCrossSection235U,
                averageAbsorptionMacroCrossSection239Pu:
                    averageAbsorptionMacroCrossSection239Pu,
                averageFissionMacroCrossSection235U:
                    meanMacroscopicFissionCrossSection235U,
                averageFissionMacroCrossSection239Pu:
                    meanMacroscopicFissionCrossSection239Pu,
                averageNuclearConcentrationCell235U:
                    meanNuclearConcentrationU235,
                averageNuclearConcentrationCell239Pu:
                    meanPlutoniumConcentration,
                effectiveNeutronMultiplicationFactor:
                    effectiveNeutronMultiplicationFactor,
                nuclearConcentration235UByRum:
                    averageNuclearConcentration235UByRum,
                infiniteMediumNeutronMultiplicationFactor:
                    infiniteMediumNeutronMultiplicationFactor,
                nuclearConcentration239PuByRum:
                    averageNuclearConcentration239PuByRum,
                reactorOperationalTime: reactorOperationalDays,
                nuclearConcentration235UByBat:
                    averageNuclearConcentration235UByBat,
                nuclearConcentration239PuByBat:
                    averageNuclearConcentration239PuByBat,
                nuclearConcentration235UByKR,
                nuclearConcentration239PuByKR,
                nuclearConcentration238UByKR,
                reactivity,
            };
            if (z === 0) {
                // console.group('data');
                // console.log(
                //     'averageNuclearConcentration235U',
                //     averageNuclearConcentration235UByRum.toExponential(3),
                // );
                // console.log(
                //     'averageNuclearConcentration239PuByRum',
                //     averageNuclearConcentration239PuByRum.toExponential(3),
                // );
                // console.log(
                //     'reactorOperationalDays',
                //     reactorOperationalDays.toExponential(3),
                // );
                // console.log('epsilon', epsilon.toExponential(3));
                // console.log(
                //     'absorptionSlagCrossSection',
                //     absorptionSlagCrossSection.toExponential(3),
                // );
                // console.log(
                //     'meanNuclearConcentrationU235',
                //     meanNuclearConcentrationU235.toExponential(3),
                // );
                // console.log(
                //     'meanPlutoniumConcentration',
                //     meanPlutoniumConcentration.toExponential(3),
                // );
                // console.log(
                //     'meanXenonAbsorptionCrossSection',
                //     meanXenonAbsorptionCrossSection.toExponential(3),
                // );
                // console.log(
                //     'meanMacroscopicFissionCrossSection235U',
                //     meanMacroscopicFissionCrossSection235U.toExponential(3),
                // );
                // console.log(
                //     'averageAbsorptionMacroCrossSection239Pu',
                //     averageAbsorptionMacroCrossSection239Pu.toExponential(3),
                // );
                // console.log(
                //     'averageAbsorptionMacroCrossSection235U',
                //     averageAbsorptionMacroCrossSection235U.toExponential(3),
                // );
                // console.log(
                //     'meanMacroscopicFissionCrossSection239Pu',
                //     meanMacroscopicFissionCrossSection239Pu.toExponential(3),
                // );
                // console.log(
                //     'neutronFluxDensity',
                //     neutronFluxDensity.toExponential(3),
                // );
                // console.log(
                //     'xenonAbsorptionCrossSection',
                //     xenonAbsorptionCrossSection.toExponential(3),
                // );
                // console.log(
                //     'samariumAbsorptionCrossSection',
                //     samariumAbsorptionCrossSection.toExponential(3),
                // );
                // console.log(
                //     'averageSecondaryNeutronsPerAbsorption',
                //     averageSecondaryNeutronsPerAbsorption.toExponential(3),
                // );
                // console.log(
                //     'blockAbsorptionCrossSection',
                //     blockAbsorptionCrossSection.toExponential(3),
                // );
                // console.log(
                //     'transportCrossSectionU235',
                //     transportCrossSectionU235.toExponential(3),
                // );
                // console.log(
                //     'transportCrossSectionPu239',
                //     transportCrossSectionPu239.toExponential(3),
                // );
                // console.log(
                //     'totalTransportCrossSection',
                //     totalTransportCrossSection.toExponential(3),
                // );
                // console.log(
                //     'totalAbsorptionCrossSection',
                //     totalAbsorptionCrossSection.toExponential(3),
                // );
                // console.log(
                //     'diffusionLength',
                //     diffusionLength.toExponential(3),
                // );
                // console.log(
                //     'thermalNeutronUtilization',
                //     thermalNeutronUtilization.toExponential(3),
                // );
                // console.log(
                //     'infiniteMediumNeutronMultiplicationFactor',
                //     infiniteMediumNeutronMultiplicationFactor.toExponential(3),
                // );
                // console.log(
                //     'effectiveNeutronMultiplicationFactor',
                //     effectiveNeutronMultiplicationFactor.toExponential(3),
                // );
                // console.log(
                //     'averageNuclearConcentration239PuByBat',
                //     averageNuclearConcentration239PuByBat.toExponential(3),
                // );
                // console.log(
                //     'averageNuclearConcentration235UByBat',
                //     averageNuclearConcentration235UByBat.toExponential(3),
                // );
                // console.groupEnd();
            }

            results.push(data);
        }

        return results;
    } catch (error) {
        console.error('Ошибка при расчете параметров ZRelations', error);
        throw new Error(`Ошибка при расчете параметров ZRelations: ${error}`);
    }
};
