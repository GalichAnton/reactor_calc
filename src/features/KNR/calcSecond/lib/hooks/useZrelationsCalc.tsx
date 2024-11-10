import {
    useAveragedCrossSectionsStore,
    useNuclearConcentrationsStore,
    useCellParamsStore,
    useKInfParamsStore,
    useLossFactorParamsStore,
    useNeutronDiffusionAgeStore,
    useNeutronGasParamsStore,
    useTwoZoneModelParamsStore,
    useTransportMacroStore,
} from '@features/KNR/calcFirst';
import { START_Z } from '@features/KNR/VVER/setInitialValues';

import { ZRelations } from '../..//model/types/zRelations.ts';
import { useAZPhysParamsStore } from '../../model/store/azPhysParamsStore.ts';
import { useIsotopeCompositionStore } from '../../model/store/isotopeCompositionStore.ts';
import { useZRelationsStore } from '../../model/store/zRelationStore.ts';
import {
    calculateNuclearConcentrationPuByBat,
    calculateNuclearConcentrationByKR,
    calculateNuclearConcentrationPuByRum,
    calculateNuclearConcentrationU5ByBat,
    calculateNuclearConcentrationU5ByRum,
    NuclearConcentrationParamsByKR,
} from '../utils/calcNuclearConcentrations/calcNuclearConcentrations.ts';
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
} from '../utils/calcZrelations/helpers.ts';

export const useZrelationsCalc = () => {
    const { setZRelationProperties, resetStore } = useZRelationsStore();

    const computeZrelationsParams = async () => {
        const {
            isotopesParams: {
                Sa8,
                Sa9,
                Sf9,
                Sf5,
                averageAbsorptionCrossSection239Pu,
                averageFissionCrossSection239Pu,
                secondaryNeutronsPerAbsorption239Pu,
                averageSpecificByVolumePower,
            },
        } = useIsotopeCompositionStore.getState();

        const {
            azPhysParams: { geometricParameter },
        } = useAZPhysParamsStore.getState();

        const {
            cellParams: { fuelVolume, cellVolume },
        } = useCellParamsStore.getState();

        const {
            concentrations: { N_05, N_08 },
        } = useNuclearConcentrationsStore.getState();

        const {
            kInfParams: {
                reproductionFactor,
                fastFissionFactor,
                resonanceEscapeProbability,
                infiniteMultiplicationFactor,
                thermalUtilization,
            },
        } = useKInfParamsStore.getState();

        const {
            neutronDiffusionAgeParams: { neutronAge },
        } = useNeutronDiffusionAgeStore.getState();

        const {
            neutronGasParams: { neutronGasTemperature },
        } = useNeutronGasParamsStore.getState();

        const {
            averagedCrossSections: {
                averagedMicroFU5,
                averagedMicroAU5,
                averagedMicroAU8,
                averagedMacroAU5,
            },
        } = useAveragedCrossSectionsStore.getState();

        const {
            params: {
                twoZoneFirstZoneVolume,
                twoZoneBlockAbsorptionCrossSection,
                twoZoneModeratorAbsorptionCrossSection,
                twoZoneModeratorVolume,
            },
        } = useTwoZoneModelParamsStore.getState();

        const {
            transportMacroCrossSections: {
                transportMacroH2O,
                transportMacroU238,
                transportMacroO2,
                transportMacroZr,
            },
        } = useTransportMacroStore.getState();

        const {
            lossFactorParams: { lossFactor },
        } = useLossFactorParamsStore.getState();

        const epsilon = fuelVolume.value / cellVolume.value;

        resetStore();

        try {
            START_Z.forEach((z, i) => {
                const averageNuclearConcentration235UByRum =
                    calculateNuclearConcentrationU5ByRum(N_05.value, z);

                const averageNuclearConcentration239PuByRum =
                    calculateNuclearConcentrationPuByRum({
                        nuclearConcentration238U: N_08.value,
                        initialNuclearConcentration235U: N_05.value,
                        thermalNeutronAge: neutronAge.value,
                        fastNeutronReproductionCoefficient:
                            fastFissionFactor.value,
                        secondaryNeutronsPerAbsorption235U:
                            reproductionFactor.value,
                        resonanceEscapeProbability:
                            resonanceEscapeProbability.value,
                        geometricParameter: geometricParameter.value,
                        Sa8: Sa8.value,
                        Sa9: Sa9.value,
                        z,
                    });

                const reactorOperationalDays = calculateReactorOperationalDays({
                    z,
                    thermalNeutronAge: neutronAge.value,
                    resonanceEscapeProbability:
                        resonanceEscapeProbability.value,
                    nuclearConcentration239PUbyZ:
                        averageNuclearConcentration239PuByRum,
                    nuclearConcentration235Uby0: N_05.value,
                    averageSpecificByVolumePower:
                        averageSpecificByVolumePower.value,
                    Sf9: Sf9.value,
                    Sf5: Sf5.value,
                    Sa9: Sa9.value,
                    Sa8: Sa8.value,
                    secondaryNeutronsPerAbsorption235U:
                        reproductionFactor.value,
                    fastNeutronReproductionCoefficient: fastFissionFactor.value,
                    geometricParameter: geometricParameter.value,
                    nuclearConcentration238U: N_05.value,
                });

                const absorptionSlagCrossSection =
                    calculateAbsorptionSlagCrossSection({
                        t: reactorOperationalDays,
                        averageSpecificByVolumePower:
                            averageSpecificByVolumePower.value,
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
                        neutronGasTemperature.value,
                    );

                const meanMacroscopicFissionCrossSection235U =
                    calculateMeanMacroscopicFissionCrossSection({
                        meanNuclearConcentrationU235:
                            meanNuclearConcentrationU235,
                        averageFissionCrossSection235U: averagedMicroFU5.value,
                    });

                const averageAbsorptionMacroCrossSection235U =
                    calculateMeanMacroscopicAbsorptionCrossSectionU235({
                        meanNuclearConcentrationU235:
                            meanNuclearConcentrationU235,
                        averageAbsorptionCrossSection235U:
                            averagedMicroAU5.value,
                    });

                const averageAbsorptionMacroCrossSection239Pu =
                    calculateMeanMacroscopicAbsorptionCrossSectionPu239({
                        meanPlutoniumConcentration: meanPlutoniumConcentration,
                        averageAbsorptionCrossSection239Pu:
                            averageAbsorptionCrossSection239Pu.value,
                    });

                const meanMacroscopicFissionCrossSection239Pu =
                    calculateMeanMacroscopicFissionCrossSectionPu239({
                        meanPlutoniumConcentration: meanPlutoniumConcentration,
                        averageFissionCrossSection239Pu:
                            averageFissionCrossSection239Pu.value,
                    });

                const neutronFluxDensity = calculateNeutronFlux({
                    averageSpecificByVolumePower:
                        averageSpecificByVolumePower.value,
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
                            reproductionFactor.value,
                        secondaryNeutronsPerAbsorption239Pu:
                            secondaryNeutronsPerAbsorption239Pu.value,
                    });

                const blockAbsorptionCrossSection =
                    calculateBlockAbsorptionCrossSection({
                        blockVolume: twoZoneFirstZoneVolume.value,
                        meanAbsorptionCrossSection5:
                            averageAbsorptionMacroCrossSection235U,
                        meanAbsorptionCrossSection9:
                            averageAbsorptionMacroCrossSection239Pu,
                        uraniumVolume: fuelVolume.value,
                        initialAbsorptionCrossSection:
                            twoZoneBlockAbsorptionCrossSection.value,
                        meanSlagAbsorptionCrossSection:
                            absorptionSlagCrossSection,
                        meanXenonAbsorptionCrossSection:
                            xenonAbsorptionCrossSection,
                        meanSamariumAbsorptionCrossSection:
                            samariumAbsorptionCrossSection,
                        meanMacroscopicAbsorptionCrossSectionU235By0:
                            averagedMacroAU5.value,
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
                        meanTransportCrossSection8: transportMacroU238.value,
                        meanTransportCrossSectionH2O: transportMacroH2O.value,
                        meanTransportCrossSectionZr: transportMacroZr.value,
                        meanTransportCrossSectionU5: transportCrossSectionU235,
                        meanTransportCrossSectionPu9:
                            transportCrossSectionPu239,
                        meanTransportCrossSectionO2: transportMacroO2.value,
                    });

                const totalAbsorptionCrossSection =
                    calculateTotalAbsorptionCrossSection({
                        meanAbsorptionCrossSectionU5:
                            averageAbsorptionMacroCrossSection235U,
                        meanAbsorptionCrossSectionPu9:
                            averageAbsorptionMacroCrossSection239Pu,
                        meanAbsorptionCrossSectionMisc:
                            absorptionSlagCrossSection,
                        meanAbsorptionCrossSectionXe:
                            xenonAbsorptionCrossSection,
                        meanAbsorptionCrossSectionSm:
                            samariumAbsorptionCrossSection,
                    });

                const diffusionLength = calculateDiffusionLength({
                    averageSumAbsorptionCrossSection:
                        totalAbsorptionCrossSection,
                    averageSumTransportCrossSection: totalTransportCrossSection,
                });

                const thermalNeutronUtilization =
                    calculateThermalNeutronUtilization({
                        V_U: fuelVolume.value,
                        V_moderator: twoZoneModeratorVolume.value,
                        averageAbsorptionCrossSection5:
                            averageAbsorptionMacroCrossSection235U,
                        averageAbsorptionCrossSection9:
                            averageAbsorptionMacroCrossSection239Pu,
                        averageAbsorptionCrossSection:
                            blockAbsorptionCrossSection,
                        d: lossFactor.value,
                        moderatorAbsorptionCrossSection:
                            twoZoneModeratorAbsorptionCrossSection.value,
                    });

                const infiniteMediumNeutronMultiplicationFactor =
                    calculateNeutronMultiplication({
                        k_infinite: infiniteMultiplicationFactor.value,
                        theta: thermalNeutronUtilization,
                        theta0: thermalUtilization.value,
                        secondaryNeutronsPerAbsorption235UorPu9:
                            averageSecondaryNeutronsPerAbsorption,
                        secondaryNeutrons0PerAbsorption235UorPu9:
                            reproductionFactor.value,
                    });

                const effectiveNeutronMultiplicationFactor =
                    calculateEffectiveNeutronMultiplication({
                        diffusionLength,
                        geometricParameter: geometricParameter.value,
                        thermalNeutronAge: neutronAge.value,
                        k_infinite: infiniteMediumNeutronMultiplicationFactor,
                    });

                const averageNuclearConcentration235UByBat =
                    calculateNuclearConcentrationU5ByBat(N_05.value, z);

                const averageNuclearConcentration239PuByBat =
                    calculateNuclearConcentrationPuByBat({
                        z,
                        initialNuclearConcentration238U: N_08.value,
                        initialNuclearConcentration235U: N_05.value,
                        initialNuclearConcentration239Pu: 0,
                        averageAbsorptionCrossSection238U:
                            averagedMicroAU8.value,
                        averageAbsorptionCrossSection235U:
                            averagedMicroAU5.value,
                        averageAbsorptionCrossSection239Pu:
                            averageFissionCrossSection239Pu.value,
                        fastNeutronReproductionCoefficient:
                            fastFissionFactor.value,
                        resonanceEscapeProbability:
                            resonanceEscapeProbability.value,
                    });

                const currentState = useZRelationsStore.getState();
                const lastIndex = i - 1;
                const KRParams: Partial<NuclearConcentrationParamsByKR> = {};

                if (i === 0) {
                    KRParams.initialNuclearConcentration235U = N_05.value;
                    KRParams.initialNuclearConcentration238U = N_08.value;
                    KRParams.initialNuclearConcentration239Pu = 0;
                } else {
                    if (!currentState.zRelationsParams?.length) {
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
                        KRParams.initialNuclearConcentration235U || 0,
                    initialNuclearConcentration239Pu:
                        KRParams.initialNuclearConcentration239Pu || 0,
                    initialNuclearConcentration238U:
                        KRParams.initialNuclearConcentration238U || 0,
                    averageAbsorptionCrossSection238U: averagedMicroAU8.value,
                    averageAbsorptionCrossSection235U: averagedMicroAU5.value,
                    averageAbsorptionCrossSection239Pu:
                        averageAbsorptionCrossSection239Pu.value,
                    fastNeutronReproductionCoefficient:
                        reproductionFactor.value,
                    resonanceEscapeProbability:
                        resonanceEscapeProbability.value,
                    averageFissionCrossSection235U: averagedMicroFU5.value,
                    averageFissionCrossSection239Pu:
                        averageFissionCrossSection239Pu.value,
                });

                const reactivity =
                    (effectiveNeutronMultiplicationFactor - 1) /
                    infiniteMediumNeutronMultiplicationFactor;

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
                    reactivity,
                };

                // if (z === 0.98) {
                //     console.group('data');
                //     console.log(
                //         'averageNuclearConcentration235U',
                //         averageNuclearConcentration235UByRum.toExponential(3),
                //     );
                //     console.log(
                //         'averageNuclearConcentration239PuByRum',
                //         averageNuclearConcentration239PuByRum.toExponential(3),
                //     );
                //     console.log(
                //         'reactorOperationalDays',
                //         reactorOperationalDays.toExponential(3),
                //     );
                //     console.log('epsilon', epsilon.toExponential(3));
                //     console.log(
                //         'absorptionSlagCrossSection',
                //         absorptionSlagCrossSection.toExponential(3),
                //     );
                //     console.log(
                //         'meanNuclearConcentrationU235',
                //         meanNuclearConcentrationU235.toExponential(3),
                //     );
                //     console.log(
                //         'meanPlutoniumConcentration',
                //         meanPlutoniumConcentration.toExponential(3),
                //     );
                //     console.log(
                //         'meanXenonAbsorptionCrossSection',
                //         meanXenonAbsorptionCrossSection.toExponential(3),
                //     );
                //     console.log(
                //         'meanMacroscopicFissionCrossSection235U',
                //         meanMacroscopicFissionCrossSection235U.toExponential(3),
                //     );
                //     console.log(
                //         'averageAbsorptionMacroCrossSection239Pu',
                //         averageAbsorptionMacroCrossSection239Pu.toExponential(
                //             3,
                //         ),
                //     );
                //     console.log(
                //         'averageAbsorptionMacroCrossSection235U',
                //         averageAbsorptionMacroCrossSection235U.toExponential(3),
                //     );
                //     console.log(
                //         'meanMacroscopicFissionCrossSection239Pu',
                //         meanMacroscopicFissionCrossSection239Pu.toExponential(
                //             3,
                //         ),
                //     );
                //     console.log(
                //         'neutronFluxDensity',
                //         neutronFluxDensity.toExponential(3),
                //     );
                //     console.log(
                //         'xenonAbsorptionCrossSection',
                //         xenonAbsorptionCrossSection.toExponential(3),
                //     );
                //     console.log(
                //         'samariumAbsorptionCrossSection',
                //         samariumAbsorptionCrossSection.toExponential(3),
                //     );
                //     console.log(
                //         'averageSecondaryNeutronsPerAbsorption',
                //         averageSecondaryNeutronsPerAbsorption.toExponential(3),
                //     );
                //     console.log(
                //         'blockAbsorptionCrossSection',
                //         blockAbsorptionCrossSection.toExponential(3),
                //     );
                //     console.log(
                //         'transportCrossSectionU235',
                //         transportCrossSectionU235.toExponential(3),
                //     );
                //     console.log(
                //         'transportCrossSectionPu239',
                //         transportCrossSectionPu239.toExponential(3),
                //     );
                //     console.log(
                //         'totalTransportCrossSection',
                //         totalTransportCrossSection.toExponential(3),
                //     );
                //     console.log(
                //         'totalAbsorptionCrossSection',
                //         totalAbsorptionCrossSection.toExponential(3),
                //     );
                //     console.log(
                //         'diffusionLength',
                //         diffusionLength.toExponential(3),
                //     );
                //     console.log(
                //         'thermalNeutronUtilization',
                //         thermalNeutronUtilization.toExponential(3),
                //     );
                //     console.log(
                //         'infiniteMediumNeutronMultiplicationFactor',
                //         infiniteMediumNeutronMultiplicationFactor.toExponential(
                //             3,
                //         ),
                //     );
                //     console.log(
                //         'effectiveNeutronMultiplicationFactor',
                //         effectiveNeutronMultiplicationFactor.toExponential(3),
                //     );
                //     console.log(
                //         'averageNuclearConcentration239PuByBat',
                //         averageNuclearConcentration239PuByBat.toExponential(3),
                //     );
                //     console.log(
                //         'averageNuclearConcentration235UByBat',
                //         averageNuclearConcentration235UByBat.toExponential(3),
                //     );
                //     console.groupEnd();
                // }

                setZRelationProperties(data);
            });
        } catch (error) {
            console.error(
                'Ошибка при расчете параметров нейтронного газа',
                error,
            );
        }
    };

    return { computeZrelationsParams };
};
