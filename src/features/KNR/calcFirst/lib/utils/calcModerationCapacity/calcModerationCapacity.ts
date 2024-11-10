import { SetParams } from '@shared/types/param.ts';

import {
    calculateModerationCapacityH2O,
    calculateModerationCapacityO2,
    calculateModerationCapacityU235,
    calculateModerationCapacityU238,
    calculateModerationCapacityZr,
    calculateTotalModerationCapacity,
} from './helpers.ts';
import { ModerationCapacity } from '../../../model/types/moderationCapacity.ts';

/**
 * Интерфейс входных параметров для расчета замедляющих способностей
 */
interface ModerationCapacityProps {
    /** Средняя ядерная концентрация U-235 */
    averageN_5: number;
    /** Средняя ядерная концентрация H2O */
    averageN_H2O: number;
    /** Средняя ядерная концентрация O2 */
    averageN_O2: number;
    /** Средняя ядерная концентрация Zr */
    averageN_Zr: number;
    /** Средняя ядерная концентрация U-238 */
    averageN_8: number;
}

/**
 * Рассчитывает параметры замедляющих способностей компонентов ядерного реактора
 *
 * @param params - Объект с входными параметрами
 * @returns {Promise<ModerationCapacityParams>} Объект с рассчитанными параметрами
 * @throws {Error} Ошибка при некорректных входных данных
 */
export const calculateModerationCapacity = async (
    params: ModerationCapacityProps,
): Promise<SetParams<ModerationCapacity>> => {
    const { averageN_5, averageN_H2O, averageN_O2, averageN_Zr, averageN_8 } =
        params;

    try {
        const moderationCapacityU235 =
            calculateModerationCapacityU235(averageN_5);
        const moderationCapacityU238 =
            calculateModerationCapacityU238(averageN_8);
        const moderationCapacityO2 = calculateModerationCapacityO2(averageN_O2);
        const moderationCapacityH2O =
            calculateModerationCapacityH2O(averageN_H2O);
        const moderationCapacityZr = calculateModerationCapacityZr(averageN_Zr);

        const totalModerationCapacity = calculateTotalModerationCapacity(
            moderationCapacityU235,
            moderationCapacityU238,
            moderationCapacityO2,
            moderationCapacityH2O,
            moderationCapacityZr,
        );

        return {
            moderationCapacityU235,
            moderationCapacityU238,
            moderationCapacityO2,
            moderationCapacityH2O,
            moderationCapacityZr,
            totalModerationCapacity,
        };
    } catch (error) {
        throw new Error(
            `Ошибка при расчете замедляющих способностей: ${error}`,
        );
    }
};
