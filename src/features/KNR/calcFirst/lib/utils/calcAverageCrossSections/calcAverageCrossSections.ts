import { elemCharacteristics } from '@shared/constants/elemCharacteristics.ts';
import { SetParams } from '@shared/types/param.ts';

import { calculateCrossSections } from './helpers.ts';
import { AveragedCrossSections } from '../../../model/types/averagedMicroCrossSections.ts';

/**
 * Интерфейс входных параметров для расчета усредненных сечений
 */
interface CrossSectionsInputParams {
    /** Концентрации элементов */
    concentrations: {
        /** Средняя концентрация U235 */
        averageN_5: number;
        /** Средняя концентрация U238 */
        averageN_8: number;
        /** Средняя концентрация H2O */
        averageN_H2O: number;
        /** Средняя концентрация O2 */
        averageN_O2: number;
        /** Средняя концентрация Zr */
        averageN_Zr: number;
    };
    /** Параметры нейтронного газа */
    neutronGasParams: {
        /** Округленная температура */
        roundedTemperature: number;
        /** g-фактор Вескотта для поглощения U235 */
        gVeskottFactorA5: number;
        /** g-фактор Вескотта для деления U235 */
        gVeskottFactorF5: number;
    };
}

/**
 * Рассчитывает усредненные микро- и макроскопические сечения для различных элементов
 *
 * @param {CrossSectionsInputParams} params - Входные параметры для расчета
 * @returns {Promise<CrossSectionsOutput>} Объект с рассчитанными сечениями
 * @throws {Error} Ошибка при расчете усредненных сечений
 */
export const calculateAverageCrossSections = async (
    params: CrossSectionsInputParams,
): Promise<SetParams<AveragedCrossSections>> => {
    try {
        const {
            concentrations: {
                averageN_5,
                averageN_8,
                averageN_H2O,
                averageN_O2,
                averageN_Zr,
            },
            neutronGasParams: {
                roundedTemperature,
                gVeskottFactorA5,
                gVeskottFactorF5,
            },
        } = params;

        // Расчет сечений для U235
        const [averagedMicroAU5, averagedMacroAU5] = calculateCrossSections(
            elemCharacteristics.U235.crossSectionA,
            roundedTemperature,
            gVeskottFactorA5,
            averageN_5,
        );

        const [averagedMicroFU5, averagedMacroFU5] = calculateCrossSections(
            elemCharacteristics.U235.crossSectionF,
            roundedTemperature,
            gVeskottFactorF5,
            averageN_5,
        );

        // Расчет сечений для U238
        const [averagedMicroAU8, averagedMacroAU8] = calculateCrossSections(
            elemCharacteristics.U238.crossSectionA,
            roundedTemperature,
            1,
            averageN_8,
        );

        // Расчет сечений для H2O
        const [averagedMicroAH2O, averagedMacroAH2O] = calculateCrossSections(
            elemCharacteristics.H2O.crossSectionA,
            roundedTemperature,
            1,
            averageN_H2O,
        );

        // Расчет сечений для O2
        const [averagedMicroAO2, averagedMacroAO2] = calculateCrossSections(
            elemCharacteristics.O.crossSectionA,
            roundedTemperature,
            1,
            averageN_O2,
        );

        // Расчет сечений для Zr
        const [averagedMicroAZr, averagedMacroAZr] = calculateCrossSections(
            elemCharacteristics.Zr.crossSectionA,
            roundedTemperature,
            1,
            averageN_Zr,
        );

        // Расчет полного макроскопического сечения
        const averagedMacroATotal =
            averagedMacroAZr +
            averagedMacroAO2 +
            averagedMacroAH2O +
            averagedMacroAU8 +
            averagedMacroFU5 +
            averagedMacroAU5;

        return {
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
    } catch (error) {
        throw new Error(`Ошибка при расчете усредненных сечений: ${error}`);
    }
};
