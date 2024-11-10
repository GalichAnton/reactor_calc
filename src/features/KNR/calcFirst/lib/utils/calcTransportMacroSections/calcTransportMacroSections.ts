import { elemCharacteristics } from '@shared/constants/elemCharacteristics.ts';
import { SetParams } from '@shared/types/param.ts';

import { calculateTransportMacroSection } from './helpers.ts';
import { TransportMacroscopicCrossSections } from '../../../model/types/transportMacroscopicCrossSections.ts';

/**
 * Интерфейс входных параметров для расчета транспортных макросечений
 */
interface TransportMacroSectionsProps {
    /** Усредненное макросечение для Zr */
    averagedMacroAZr: number;
    /** Усредненное макросечение для O2 */
    averagedMacroAO2: number;
    /** Усредненное макросечение для U-238 */
    averagedMacroAU8: number;
    /** Усредненное макросечение для U-235 */
    averagedMacroAU5: number;
    /** Средняя ядерная концентрация U-235 */
    averageN_5: number;
    /** Средняя ядерная концентрация H2O */
    averageN_H2O: number;
    /** Средняя ядерная концентрация O2 */
    averageN_O2: number;
    /** Средняя ядерная концентрация U-238 */
    averageN_8: number;
    /** Средняя ядерная концентрация Zr */
    averageN_Zr: number;
    /** Округленная температура */
    roundedTemperature: number;
}

/**
 * Рассчитывает транспортные макросечения компонентов ядерного реактора
 *
 * @param params - Объект с входными параметрами
 * @returns {Promise<TransportMacroSections>} Объект с рассчитанными транспортными макросечениями
 * @throws {Error} Ошибка при некорректных входных данных
 */
export const calculateTransportMacroSections = async (
    params: TransportMacroSectionsProps,
): Promise<SetParams<TransportMacroscopicCrossSections>> => {
    try {
        const {
            averagedMacroAZr,
            averagedMacroAO2,
            averagedMacroAU8,
            averagedMacroAU5,
            averageN_5,
            averageN_H2O,
            averageN_O2,
            averageN_8,
            averageN_Zr,
            roundedTemperature,
        } = params;

        // Расчет транспортного сечения для U235
        const transportMacroU235 = calculateTransportMacroSection({
            atomicMass: 235,
            macroAverageCrossSection: averagedMacroAU5,
            concentration: averageN_5,
            microScatteringCrossSection: elemCharacteristics.U235.crossSectionS,
        });

        // Расчет транспортного сечения для H2O
        const transportMacroH2O =
            69e-24 * averageN_H2O * Math.sqrt(293 / roundedTemperature);

        // Расчет транспортного сечения для O2
        const transportMacroO2 = calculateTransportMacroSection({
            atomicMass: 17,
            macroAverageCrossSection: averagedMacroAO2,
            concentration: averageN_O2,
            microScatteringCrossSection: elemCharacteristics.O.crossSectionS,
        });

        // Расчет транспортного сечения для U238
        const transportMacroU238 = calculateTransportMacroSection({
            atomicMass: 238,
            macroAverageCrossSection: averagedMacroAU8,
            concentration: averageN_8,
            microScatteringCrossSection: elemCharacteristics.U238.crossSectionS,
        });

        // Расчет транспортного сечения для Zr
        const transportMacroZr = calculateTransportMacroSection({
            atomicMass: 91,
            macroAverageCrossSection: averagedMacroAZr,
            concentration: averageN_Zr,
            microScatteringCrossSection: elemCharacteristics.Zr.crossSectionS,
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
            elemCharacteristics.U235.crossSectionTr * averageN_5 +
            elemCharacteristics.U238.crossSectionTr * averageN_8 +
            elemCharacteristics.H2O.crossSectionTr * averageN_H2O +
            elemCharacteristics.O.crossSectionTr * averageN_O2 +
            elemCharacteristics.Zr.crossSectionTr * averageN_Zr;

        return {
            transportMacroH2O,
            transportMacroO2,
            transportMacroU235,
            transportMacroU238,
            transportMacroZr,
            transportMacroTotal,
            transportMacroTotal1eV,
        };
    } catch (error) {
        throw new Error(
            `Ошибка при расчете транспортных макросечений: ${error}`,
        );
    }
};
