import { elemCharacteristics } from '@shared/constants/elemCharacteristics.ts';

import { useAveragedCrossSectionsStore } from '../../model/stores/averagedCrossSectionsStore.ts';
import { useNuclearConcentrationsStore } from '../../model/stores/azCompNucConStore.ts';
import { useNeutronGasParamsStore } from '../../model/stores/neutronGasStore.ts';
import { calculateCrossSections } from '../utils/calcAverageCrossSections.ts';

export const useCalcAverageCrossSections = () => {
    const { setAveragedCrossSections } = useAveragedCrossSectionsStore();

    const computeAverageCrossSections = async () => {
        try {
            const {
                concentrations: {
                    averageN_5,
                    averageN_8,
                    averageN_H2O,
                    averageN_O2,
                    averageN_Zr,
                },
            } = useNuclearConcentrationsStore.getState();

            const {
                neutronGasParams: {
                    roundedTemperature,
                    gVeskottFactorA5,
                    gVeskottFactorF5,
                },
            } = useNeutronGasParamsStore.getState();

            // Расчет сечений для U235
            const [averagedMicroAU5, averagedMacroAU5] = calculateCrossSections(
                elemCharacteristics.U235.crossSectionA,
                roundedTemperature.value,
                gVeskottFactorA5.value,
                averageN_5.value,
            );

            const [averagedMicroFU5, averagedMacroFU5] = calculateCrossSections(
                elemCharacteristics.U235.crossSectionF,
                roundedTemperature.value,
                gVeskottFactorF5.value,
                averageN_5.value,
            );

            // Расчет сечений для U238
            const [averagedMicroAU8, averagedMacroAU8] = calculateCrossSections(
                elemCharacteristics.U238.crossSectionA,
                roundedTemperature.value,
                1,
                averageN_8.value,
            );

            // Расчет сечений для H2O
            const [averagedMicroAH2O, averagedMacroAH2O] =
                calculateCrossSections(
                    elemCharacteristics.H2O.crossSectionA,
                    roundedTemperature.value,
                    1,
                    averageN_H2O.value,
                );

            // Расчет сечений для O2
            const [averagedMicroAO2, averagedMacroAO2] = calculateCrossSections(
                elemCharacteristics.O.crossSectionA,
                roundedTemperature.value,
                1,
                averageN_O2.value,
            );

            // Расчет сечений для Zr
            const [averagedMicroAZr, averagedMacroAZr] = calculateCrossSections(
                elemCharacteristics.Zr.crossSectionA,
                roundedTemperature.value,
                1,
                averageN_Zr.value,
            );

            // Расчет полного макроскопического сечения
            const averagedMacroATotal =
                averagedMacroAZr +
                averagedMacroAO2 +
                averagedMacroAH2O +
                averagedMacroAU8 +
                averagedMacroFU5 +
                averagedMacroAU5;

            const crossSections = {
                averagedMicroAU5,
                averagedMacroAU5,
                averagedMicroAU8,
                averagedMacroAU8,
                averagedMicroFU5,
                averagedMacroFU5,
                averagedMicroAH2O,
                averagedMacroAH2O,
                averagedMicroAO2,
                averagedMacroAO2,
                averagedMicroAZr,
                averagedMacroAZr,
                averagedMacroATotal,
            };

            setAveragedCrossSections(crossSections);
        } catch (error) {
            console.error('Ошибка при расчете усредненных сечений', error);
        }
    };

    return { computeAverageCrossSections };
};
