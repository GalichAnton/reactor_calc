import { useNuclearConcentrationsStore } from '../../model/stores/azCompNucConStore.ts';
import { useMacroscopicCrossSectionsStore } from '../../model/stores/macroscopicCrossSectionsStore.ts';
import {
    calculateMacroSigmaA5,
    calculateMacroSigmaA8,
    calculateMacroSigmaAH2O,
    calculateMacroSigmaAO2,
    calculateMacroSigmaAZr,
    calculateTotalMacroSigmaA,
} from '../utils/calcMacroscopicCrossSections.ts';

export const useCalcMacroscopicCrossSections = () => {
    const { setMacroscopicCrossSections } = useMacroscopicCrossSectionsStore();

    const computeMacroscopicCrossSections = async () => {
        try {
            const {
                concentrations: {
                    averageN_5,
                    averageN_8,
                    averageN_Zr,
                    averageN_O2,
                    averageN_H2O,
                },
            } = useNuclearConcentrationsStore.getState();

            const macroSigmaA5 = calculateMacroSigmaA5(averageN_5.value);
            const macroSigmaA8 = calculateMacroSigmaA8(averageN_8.value);
            const macroSigmaAH2O = calculateMacroSigmaAH2O(averageN_H2O.value);
            const macroSigmaAO2 = calculateMacroSigmaAO2(averageN_O2.value);
            const macroSigmaAZr = calculateMacroSigmaAZr(averageN_Zr.value);

            const macroSigmaATotal = calculateTotalMacroSigmaA(
                macroSigmaA5,
                macroSigmaA8,
                macroSigmaAH2O,
                macroSigmaAO2,
                macroSigmaAZr,
            );

            const crossSections = {
                macroSigmaA5,
                macroSigmaA8,
                macroSigmaAH2O,
                macroSigmaAO2,
                macroSigmaAZr,
                macroSigmaATotal,
            };

            setMacroscopicCrossSections(crossSections);
        } catch (error) {
            console.error(
                'Ошибка при вычислении макроскопических сечений:',
                error,
            );
        }
    };

    return { computeMacroscopicCrossSections };
};
