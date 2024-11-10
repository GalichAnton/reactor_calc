import { SetParams } from '@shared/types/param.ts';

import {
    calculateMacroSigmaA5,
    calculateMacroSigmaA8,
    calculateMacroSigmaAH2O,
    calculateMacroSigmaAO2,
    calculateMacroSigmaAZr,
    calculateTotalMacroSigmaA,
} from './helpers.ts';
import { MacroscopicCrossSections } from '../../../model/types/macroscopicCrossSections.ts';

/**
 * Интерфейс входных параметров для расчета макроскопических сечений
 */
interface NuclearConcentrationsProps {
    /** Средняя концентрация U-235 */
    averageN_5: number;
    /** Средняя концентрация U-238 */
    averageN_8: number;
    /** Средняя концентрация циркония */
    averageN_Zr: number;
    /** Средняя концентрация кислорода */
    averageN_O2: number;
    /** Средняя концентрация воды */
    averageN_H2O: number;
}

/**
 * Вычисляет макроскопические сечения поглощения для различных компонентов
 *
 * @param {NuclearConcentrationsProps} concentrations Объект с концентрациями нуклидов
 * @returns {Promise<MacroscopicCrossSections>} Объект с рассчитанными макроскопическими сечениями
 * @throws {Error} Ошибка при некорректных входных данных
 */
export const calculateMacroscopicCrossSections = async (
    concentrations: NuclearConcentrationsProps,
): Promise<SetParams<MacroscopicCrossSections>> => {
    try {
        const {
            averageN_5,
            averageN_8,
            averageN_Zr,
            averageN_O2,
            averageN_H2O,
        } = concentrations;

        const macroSigmaA5 = calculateMacroSigmaA5(averageN_5);
        const macroSigmaA8 = calculateMacroSigmaA8(averageN_8);
        const macroSigmaAH2O = calculateMacroSigmaAH2O(averageN_H2O);
        const macroSigmaAO2 = calculateMacroSigmaAO2(averageN_O2);
        const macroSigmaAZr = calculateMacroSigmaAZr(averageN_Zr);

        const macroSigmaATotal = calculateTotalMacroSigmaA(
            macroSigmaA5,
            macroSigmaA8,
            macroSigmaAH2O,
            macroSigmaAO2,
            macroSigmaAZr,
        );

        return {
            macroSigmaA5,
            macroSigmaA8,
            macroSigmaAH2O,
            macroSigmaAO2,
            macroSigmaAZr,
            macroSigmaATotal,
        };
    } catch (error) {
        throw new Error(
            `Ошибка при вычислении макроскопических сечений: ${error}`,
        );
    }
};
