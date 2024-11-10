import { useAveragedCrossSectionsStore } from '@features/KNR/calcFirst/model/stores/averagedCrossSectionsStore.ts';
import { elemCharacteristics } from '@shared/constants/elemCharacteristics.ts';

import { calculateTransportMacroSection } from '../../lib/utils/calcTransportMacroSections.ts';
import { useNuclearConcentrationsStore } from '../../model/stores/azCompNucConStore.ts';
import { useNeutronGasParamsStore } from '../../model/stores/neutronGasStore.ts';
import { useTransportMacroStore } from '../../model/stores/transportMacroStore.ts';

export const useCalcTransportMacroSections = () => {
    const { setTransportMacroCrossSections } = useTransportMacroStore();

    const computeTransportMacroSections = async () => {
        try {
            const {
                averagedCrossSections: {
                    averagedMacroAZr,
                    averagedMacroAO2,
                    averagedMacroAU8,
                    averagedMacroAU5,
                },
            } = useAveragedCrossSectionsStore.getState();

            const {
                concentrations: {
                    averageN_5,
                    averageN_H2O,
                    averageN_O2,
                    averageN_8,
                    averageN_Zr,
                },
            } = useNuclearConcentrationsStore.getState();

            const {
                neutronGasParams: { roundedTemperature },
            } = useNeutronGasParamsStore.getState();

            // Расчет транспортного сечения для U235
            const transportMacroU235 = calculateTransportMacroSection({
                atomicMass: 235,
                macroAverageCrossSection: averagedMacroAU5.value,
                concentration: averageN_5.value,
                microScatteringCrossSection:
                    elemCharacteristics.U235.crossSectionS,
            });

            // Расчет транспортного сечения для H2O
            const transportMacroH2O =
                69e-24 *
                averageN_H2O.value *
                Math.sqrt(293 / roundedTemperature.value);

            // Расчет транспортного сечения для O2
            const transportMacroO2 = calculateTransportMacroSection({
                atomicMass: 17,
                macroAverageCrossSection: averagedMacroAO2.value,
                concentration: averageN_O2.value,
                microScatteringCrossSection:
                    elemCharacteristics.O.crossSectionS,
            });

            // Расчет транспортного сечения для U238
            const transportMacroU238 = calculateTransportMacroSection({
                atomicMass: 238,
                macroAverageCrossSection: averagedMacroAU8.value,
                concentration: averageN_8.value,
                microScatteringCrossSection:
                    elemCharacteristics.U238.crossSectionS,
            });

            // Расчет транспортного сечения для Zr
            const transportMacroZr = calculateTransportMacroSection({
                atomicMass: 91,
                macroAverageCrossSection: averagedMacroAZr.value,
                concentration: averageN_Zr.value,
                microScatteringCrossSection:
                    elemCharacteristics.Zr.crossSectionS,
            });

            // Расчет полного транспортного сечения
            const transportMacroTotal =
                transportMacroU235 +
                transportMacroH2O +
                transportMacroO2 +
                transportMacroU238 +
                transportMacroZr;

            // Расчет полного транспортного сечения при 1 эВ
            const transportMacroTotal1eV =
                elemCharacteristics.U235.crossSectionTr * averageN_5.value +
                elemCharacteristics.U238.crossSectionTr * averageN_8.value +
                elemCharacteristics.H2O.crossSectionTr * averageN_H2O.value +
                elemCharacteristics.O.crossSectionTr * averageN_O2.value +
                elemCharacteristics.Zr.crossSectionTr * averageN_Zr.value;

            const transportMacroSections = {
                transportMacroH2O,
                transportMacroO2,
                transportMacroU235,
                transportMacroU238,
                transportMacroZr,
                transportMacroTotal,
                transportMacroTotal1eV,
            };

            setTransportMacroCrossSections(transportMacroSections);
        } catch (error) {
            console.error(
                'Ошибка при расчете транспортных макросечений',
                error,
            );
        }
    };

    return { computeTransportMacroSections };
};
