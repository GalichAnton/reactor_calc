import { useEffect } from 'react';

import {
    calculateNuclearConcentrationPuByBat,
    calculateNuclearConcentrationByKR,
    calculateNuclearConcentrationPuByRum,
    calculateNuclearConcentrationU5ByBat,
    calculateNuclearConcentrationU5ByRum,
    NuclearConcentrationParamsByKR,
} from '@features/KNR/VVER/calc/lib/utils/calcNuclearConcentrations.ts';
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
} from '@features/KNR/VVER/calc/lib/utils/calcZrelations.ts';
import { useAZPhysParamsStore } from '@features/KNR/VVER/calc/model/store/azPhysParamsStore.ts';
import { useIsotopeCompositionStore } from '@features/KNR/VVER/calc/model/store/isotopeCompositionStore.ts';
import { useZRelationsStore } from '@features/KNR/VVER/calc/model/store/zRelationStore.ts';
import { ZRelations } from '@features/KNR/VVER/calc/model/types/zRelations.ts';
import { START_Z, useAZStore } from '@features/KNR/VVER/setInitialValues';

export const useZrelationsCalc = () => {
    const {
        Sa8,
        Sa9,
        Sf9,
        Sf5,
        averageAbsorptionCrossSection239Pu,
        averageFissionCrossSection239Pu,
        secondaryNeutronsPerAbsorption239Pu,
        averageSpecificByVolumePower,
    } = useIsotopeCompositionStore((state) => state.isotopesParams);
    const {
        nuclearConcentration235U,
        nuclearConcentration238U,
        thermalNeutronAge,
        resonanceEscapeProbability,
        fastNeutronReproductionCoefficient,
        secondaryNeutronsPerAbsorption235U,
        fuelVolume,
        cellVolume,
        neutronGasTemperature,
        averageFissionCrossSection235U,
        averageAbsorptionCrossSection235U,
        averageAbsorptionCrossSection238U,

        blockVolume,
        macroscopicAbsorptionCrossSectionBlock,
        transportMacroscopicCrossSectionOxygen,
        transportMacroscopicCrossSectionH2O,
        transportMacroscopicCrossSectionZirconium,
        transportMacroscopicCrossSection238U,
        moderatorVolume,
        macroscopicAbsorptionCrossSectionModerator,
        reproductionLossCoefficient,
        infiniteNeutronMultiplicationCoefficient,
    } = useAZStore((state) => state.AZCharacteristics);

    const { geometricParameter } = useAZPhysParamsStore(
        (state) => state.azPhysParams,
    );

    const { setZRelationProperties, resetStore } = useZRelationsStore();

    useEffect(() => {
        const zeroZvalues = {
            averageNuclearConcentration235UByZero: 0,
            averageAbsorptionMacroCrossSection235UByZero: 0,
            averageSecondaryNeutronsPerAbsorptionByZero: 0,
            thermalNeutronUtilizationByZero: 0,
        };

        const epsilon = fuelVolume / cellVolume;

        START_Z.forEach((z, i) => {
            const averageNuclearConcentration235UByRum =
                calculateNuclearConcentrationU5ByRum(
                    nuclearConcentration235U,
                    z,
                );

            if (z === 0) {
                zeroZvalues.averageNuclearConcentration235UByZero =
                    averageNuclearConcentration235UByRum;
            }

            const averageNuclearConcentration239PuByRum =
                calculateNuclearConcentrationPuByRum({
                    nuclearConcentration238U,
                    initialNuclearConcentration235U:
                        zeroZvalues.averageNuclearConcentration235UByZero,
                    thermalNeutronAge,
                    fastNeutronReproductionCoefficient,
                    secondaryNeutronsPerAbsorption235U,
                    resonanceEscapeProbability,
                    geometricParameter,
                    Sa8,
                    Sa9,
                    z,
                });

            const reactorOperationalDays = calculateReactorOperationalDays({
                z,
                thermalNeutronAge,
                resonanceEscapeProbability,
                nuclearConcentration239PUbyZ:
                    averageNuclearConcentration239PuByRum,
                nuclearConcentration235Uby0:
                    zeroZvalues.averageNuclearConcentration235UByZero,
                averageSpecificByVolumePower,
                Sf9,
                Sf5,
                Sa9,
                Sa8,
                secondaryNeutronsPerAbsorption235U,
                fastNeutronReproductionCoefficient,
                geometricParameter,
                nuclearConcentration238U,
            });

            const absorptionSlagCrossSection =
                calculateAbsorptionSlagCrossSection({
                    t: reactorOperationalDays,
                    averageSpecificByVolumePower,
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
                calculateMeanXenonAbsorptionCrossSection(neutronGasTemperature);

            const meanMacroscopicFissionCrossSection235U =
                calculateMeanMacroscopicFissionCrossSection({
                    meanNuclearConcentrationU235: meanNuclearConcentrationU235,
                    averageFissionCrossSection235U,
                });

            const averageAbsorptionMacroCrossSection235U =
                calculateMeanMacroscopicAbsorptionCrossSectionU235({
                    meanNuclearConcentrationU235: meanNuclearConcentrationU235,
                    averageAbsorptionCrossSection235U,
                });

            if (z === 0) {
                zeroZvalues.averageAbsorptionMacroCrossSection235UByZero =
                    averageAbsorptionMacroCrossSection235U;
            }

            const averageAbsorptionMacroCrossSection239Pu =
                calculateMeanMacroscopicAbsorptionCrossSectionPu239({
                    meanPlutoniumConcentration: meanPlutoniumConcentration,
                    averageAbsorptionCrossSection239Pu,
                });

            const meanMacroscopicFissionCrossSection239Pu =
                calculateMeanMacroscopicFissionCrossSectionPu239({
                    meanPlutoniumConcentration: meanPlutoniumConcentration,
                    averageFissionCrossSection239Pu,
                });

            const neutronFluxDensity = calculateNeutronFlux({
                averageSpecificByVolumePower,
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
                    secondaryNeutronsPerAbsorption235U,
                    secondaryNeutronsPerAbsorption239Pu,
                });

            if (z === 0) {
                zeroZvalues.averageSecondaryNeutronsPerAbsorptionByZero =
                    averageSecondaryNeutronsPerAbsorption;
            }

            const blockAbsorptionCrossSection =
                calculateBlockAbsorptionCrossSection({
                    blockVolume,
                    meanAbsorptionCrossSection5:
                        averageAbsorptionMacroCrossSection235U,
                    meanAbsorptionCrossSection9:
                        averageAbsorptionMacroCrossSection239Pu,
                    uraniumVolume: fuelVolume,
                    initialAbsorptionCrossSection:
                        macroscopicAbsorptionCrossSectionBlock,
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
                        transportMacroscopicCrossSection238U,
                    meanTransportCrossSectionH2O:
                        transportMacroscopicCrossSectionH2O,
                    meanTransportCrossSectionZr:
                        transportMacroscopicCrossSectionZirconium,
                    meanTransportCrossSectionU5: transportCrossSectionU235,
                    meanTransportCrossSectionPu9: transportCrossSectionPu239,
                    meanTransportCrossSectionO2:
                        transportMacroscopicCrossSectionOxygen,
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
                    V_U: fuelVolume,
                    V_moderator: moderatorVolume,
                    averageAbsorptionCrossSection5:
                        averageAbsorptionMacroCrossSection235U,
                    averageAbsorptionCrossSection9:
                        averageAbsorptionMacroCrossSection239Pu,
                    averageAbsorptionCrossSection: blockAbsorptionCrossSection,
                    d: reproductionLossCoefficient,
                    moderatorAbsorptionCrossSection:
                        macroscopicAbsorptionCrossSectionModerator,
                });

            if (z === 0) {
                zeroZvalues.thermalNeutronUtilizationByZero =
                    thermalNeutronUtilization;
            }

            const infiniteMediumNeutronMultiplicationFactor =
                calculateNeutronMultiplication({
                    k_infinite: infiniteNeutronMultiplicationCoefficient,
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
                    geometricParameter,
                    thermalNeutronAge,
                    k_infinite: infiniteMediumNeutronMultiplicationFactor,
                });

            const averageNuclearConcentration235UByBat =
                calculateNuclearConcentrationU5ByBat(
                    nuclearConcentration235U,
                    z,
                );

            const averageNuclearConcentration239PuByBat =
                calculateNuclearConcentrationPuByBat({
                    z,
                    initialNuclearConcentration238U: nuclearConcentration238U,
                    initialNuclearConcentration235U: nuclearConcentration235U,
                    initialNuclearConcentration239Pu: 0,
                    averageAbsorptionCrossSection238U,
                    averageAbsorptionCrossSection235U,
                    averageAbsorptionCrossSection239Pu,
                    fastNeutronReproductionCoefficient,
                    resonanceEscapeProbability,
                });

            const currentState = useZRelationsStore.getState();
            const lastIndex = i - 1;
            const KRParams: Partial<NuclearConcentrationParamsByKR> = {};

            if (z === 0) {
                KRParams.initialNuclearConcentration235U =
                    nuclearConcentration235U;
                KRParams.initialNuclearConcentration238U =
                    nuclearConcentration238U;
                KRParams.initialNuclearConcentration239Pu = 0;
            } else {
                if (!currentState.zRelationsParams) {
                    return;
                }
                KRParams.initialNuclearConcentration235U =
                    currentState.zRelationsParams[
                        lastIndex
                    ].nuclearConcentration235UByKR;
                KRParams.initialNuclearConcentration238U =
                    currentState.zRelationsParams[
                        lastIndex
                    ].nuclearConcentration238UByKR;
                KRParams.initialNuclearConcentration239Pu =
                    currentState.zRelationsParams[
                        lastIndex
                    ].nuclearConcentration239PuByKR;
            }

            const {
                nuclearConcentration239PuByKR,
                nuclearConcentration235UByKR,
                nuclearConcentration238UByKR,
            } = calculateNuclearConcentrationByKR({
                dz: 0.01,
                initialNuclearConcentration235U:
                    KRParams.initialNuclearConcentration235U,
                initialNuclearConcentration239Pu:
                    KRParams.initialNuclearConcentration239Pu,
                initialNuclearConcentration238U:
                    KRParams.initialNuclearConcentration238U,
                averageAbsorptionCrossSection238U,
                averageAbsorptionCrossSection235U,
                averageAbsorptionCrossSection239Pu,
                fastNeutronReproductionCoefficient,
                resonanceEscapeProbability,
            });

            // Собираем объект данных для текущей итерации
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
            };

            if (z === 0.98) {
                console.group('data');
                console.log(
                    'averageNuclearConcentration235U',
                    averageNuclearConcentration235UByRum.toExponential(3),
                );
                console.log(
                    'averageNuclearConcentration239PuByRum',
                    averageNuclearConcentration239PuByRum.toExponential(3),
                );
                console.log(
                    'reactorOperationalDays',
                    reactorOperationalDays.toExponential(3),
                );
                console.log('epsilon', epsilon.toExponential(3));
                console.log(
                    'absorptionSlagCrossSection',
                    absorptionSlagCrossSection.toExponential(3),
                );
                console.log(
                    'meanNuclearConcentrationU235',
                    meanNuclearConcentrationU235.toExponential(3),
                );
                console.log(
                    'meanPlutoniumConcentration',
                    meanPlutoniumConcentration.toExponential(3),
                );
                console.log(
                    'meanXenonAbsorptionCrossSection',
                    meanXenonAbsorptionCrossSection.toExponential(3),
                );
                console.log(
                    'meanMacroscopicFissionCrossSection235U',
                    meanMacroscopicFissionCrossSection235U.toExponential(3),
                );
                console.log(
                    'averageAbsorptionMacroCrossSection239Pu',
                    averageAbsorptionMacroCrossSection239Pu.toExponential(3),
                );
                console.log(
                    'averageAbsorptionMacroCrossSection235U',
                    averageAbsorptionMacroCrossSection235U.toExponential(3),
                );
                console.log(
                    'meanMacroscopicFissionCrossSection239Pu',
                    meanMacroscopicFissionCrossSection239Pu.toExponential(3),
                );
                console.log(
                    'neutronFluxDensity',
                    neutronFluxDensity.toExponential(3),
                );
                console.log(
                    'xenonAbsorptionCrossSection',
                    xenonAbsorptionCrossSection.toExponential(3),
                );
                console.log(
                    'samariumAbsorptionCrossSection',
                    samariumAbsorptionCrossSection.toExponential(3),
                );
                console.log(
                    'averageSecondaryNeutronsPerAbsorption',
                    averageSecondaryNeutronsPerAbsorption.toExponential(3),
                );
                console.log(
                    'blockAbsorptionCrossSection',
                    blockAbsorptionCrossSection.toExponential(3),
                );
                console.log(
                    'transportCrossSectionU235',
                    transportCrossSectionU235.toExponential(3),
                );
                console.log(
                    'transportCrossSectionPu239',
                    transportCrossSectionPu239.toExponential(3),
                );
                console.log(
                    'totalTransportCrossSection',
                    totalTransportCrossSection.toExponential(3),
                );
                console.log(
                    'totalAbsorptionCrossSection',
                    totalAbsorptionCrossSection.toExponential(3),
                );
                console.log(
                    'diffusionLength',
                    diffusionLength.toExponential(3),
                );
                console.log(
                    'thermalNeutronUtilization',
                    thermalNeutronUtilization.toExponential(3),
                );
                console.log(
                    'infiniteMediumNeutronMultiplicationFactor',
                    infiniteMediumNeutronMultiplicationFactor.toExponential(3),
                );
                console.log(
                    'effectiveNeutronMultiplicationFactor',
                    effectiveNeutronMultiplicationFactor.toExponential(3),
                );
                console.log(
                    'averageNuclearConcentration239PuByBat',
                    averageNuclearConcentration239PuByBat.toExponential(3),
                );
                console.log(
                    'averageNuclearConcentration235UByBat',
                    averageNuclearConcentration235UByBat.toExponential(3),
                );
                console.groupEnd();
            }

            setZRelationProperties(data);
        });

        return () => resetStore();
    }, [
        nuclearConcentration235U,
        nuclearConcentration238U,
        thermalNeutronAge,
        resonanceEscapeProbability,
        fastNeutronReproductionCoefficient,
        secondaryNeutronsPerAbsorption235U,
        fuelVolume,
        cellVolume,
        neutronGasTemperature,
        averageFissionCrossSection235U,
        averageAbsorptionCrossSection235U,
        blockVolume,
        macroscopicAbsorptionCrossSectionBlock,
        transportMacroscopicCrossSectionOxygen,
        transportMacroscopicCrossSectionH2O,
        transportMacroscopicCrossSectionZirconium,
        transportMacroscopicCrossSection238U,
        moderatorVolume,
        macroscopicAbsorptionCrossSectionModerator,
        reproductionLossCoefficient,
        infiniteNeutronMultiplicationCoefficient,
        Sa8,
        Sa9,
        Sf9,
        Sf5,
        averageAbsorptionCrossSection239Pu,
        averageFissionCrossSection239Pu,
        secondaryNeutronsPerAbsorption239Pu,
        averageSpecificByVolumePower,
    ]);
};
