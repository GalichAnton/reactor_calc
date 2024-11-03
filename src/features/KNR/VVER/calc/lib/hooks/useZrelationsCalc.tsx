import { useEffect } from 'react';

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
    calculateNuclearConcentrationPu9,
    calculateNuclearConcentrationU5,
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

    const { setZRelationProperties } = useZRelationsStore();

    useEffect(() => {
        const zeroZvalues = {
            averageNuclearConcentration235U: 0,
            averageAbsorptionMacroCrossSection235U: 0,
            averageSecondaryNeutronsPerAbsorption: 0,
            thermalNeutronUtilization: 0,
        };

        const epsilon = fuelVolume / cellVolume;

        START_Z.forEach((z) => {
            const averageNuclearConcentration235U =
                calculateNuclearConcentrationU5(nuclearConcentration235U, z);

            if (z === 0) {
                zeroZvalues.averageNuclearConcentration235U =
                    averageNuclearConcentration235U;
            }

            const averageNuclearConcentration239Pu =
                calculateNuclearConcentrationPu9({
                    nuclearConcentration238U,
                    initialNuclearConcentration235U:
                        zeroZvalues.averageNuclearConcentration235U,
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
                nuclearConcentration239PUbyZ: averageNuclearConcentration239Pu,
                nuclearConcentration235Uby0:
                    zeroZvalues.averageNuclearConcentration235U,
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
                    N05_z: averageNuclearConcentration235U,
                });

            const meanPlutoniumConcentration =
                calculateMeanPlutoniumConcentration({
                    epsilon_U: epsilon,
                    N09_z: averageNuclearConcentration239Pu,
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
                zeroZvalues.averageAbsorptionMacroCrossSection235U =
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
                zeroZvalues.averageSecondaryNeutronsPerAbsorption =
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
                        zeroZvalues.averageAbsorptionMacroCrossSection235U,
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
                    nuclearConcentrationPu239: averageNuclearConcentration239Pu,
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
                zeroZvalues.thermalNeutronUtilization =
                    thermalNeutronUtilization;
            }

            const infiniteMediumNeutronMultiplicationFactor =
                calculateNeutronMultiplication({
                    k_infinite: infiniteNeutronMultiplicationCoefficient,
                    theta: thermalNeutronUtilization,
                    theta0: zeroZvalues.thermalNeutronUtilization,
                    secondaryNeutronsPerAbsorption235UorPu9:
                        averageSecondaryNeutronsPerAbsorption,
                    secondaryNeutrons0PerAbsorption235UorPu9:
                        zeroZvalues.averageSecondaryNeutronsPerAbsorption,
                });

            const effectiveNeutronMultiplicationFactor =
                calculateEffectiveNeutronMultiplication({
                    diffusionLength,
                    geometricParameter,
                    thermalNeutronAge,
                    k_infinite: infiniteMediumNeutronMultiplicationFactor,
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

                nuclearConcentration235U: averageNuclearConcentration235U,
                infiniteMediumNeutronMultiplicationFactor:
                    infiniteMediumNeutronMultiplicationFactor,

                nuclearConcentration239Pu: averageNuclearConcentration239Pu,
                reactorOperationalTime: reactorOperationalDays,
            };
            if (z.toFixed(3) === '0.855') {
                console.group('data');
                console.log(
                    'averageNuclearConcentration235U',
                    averageNuclearConcentration235U.toExponential(3),
                );
                console.log(
                    'averageNuclearConcentration239Pu',
                    averageNuclearConcentration239Pu.toExponential(3),
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
                console.groupEnd();
            }

            setZRelationProperties(data);
        });

        console.log('zeroZvalues', zeroZvalues);
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
