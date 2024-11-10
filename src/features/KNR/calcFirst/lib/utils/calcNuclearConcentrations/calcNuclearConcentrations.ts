import { DENSITY_UO2, DENSITY_ZR } from '@shared/constants/general.ts';
import { getWaterDensity } from '@shared/lib/utils';
import { SetParams } from '@shared/types/param.ts';

import {
    calculateN05,
    calculateN08,
    calculateN0H2O,
    calculateN0O2,
    calculateN0U,
    calculateN0Zr,
    calculateAverageN5,
    calculateAverageN8,
    calculateAverageNH2O,
    calculateAverageNO2,
    calculateAverageNZr,
} from './helpers.ts';
import { AzComponentsNuclearConcentrations } from '../../../model/types/azComponentsNuclearConcentrations.ts';

/**
 * Интерфейс входных параметров для расчета концентраций
 */
interface ConcentrationParamsProps {
    /** Обогащение урана */
    uraniumEnrichment: number;
    /** Температура теплоносителя */
    coolantTemperature: number;
    /** Объемная доля топлива */
    fuelFraction: number;
    /** Объемная доля воды */
    waterFraction: number;
    /** Объемная доля циркония */
    zirconiumFraction: number;
}

/**
 * Рассчитывает концентрации различных элементов в ядерном топливе
 *
 * @param {ConcentrationParamsProps} params - Входные параметры для расчета
 * @returns {Promise<SetParams<ConcentrationParams>>} Объект с рассчитанными концентрациями
 * @throws {Error} Ошибка при некорректных входных данных
 */
export const calculateConcentrationParams = async (
    params: ConcentrationParamsProps,
): Promise<SetParams<AzComponentsNuclearConcentrations>> => {
    const {
        uraniumEnrichment,
        coolantTemperature,
        fuelFraction,
        waterFraction,
        zirconiumFraction,
    } = params;

    try {
        const N_0U = calculateN0U(DENSITY_UO2);
        const N_05 = calculateN05(N_0U, uraniumEnrichment);
        const N_08 = calculateN08(N_0U, uraniumEnrichment);
        const N_0O2 = calculateN0O2(N_0U);
        const N_0H2O = calculateN0H2O(getWaterDensity(coolantTemperature));
        const N_0Zr = calculateN0Zr(DENSITY_ZR);

        const averageN_5 = calculateAverageN5(N_05, fuelFraction);
        const averageN_8 = calculateAverageN8(N_08, fuelFraction);
        const averageN_O2 = calculateAverageNO2(N_0O2, fuelFraction);
        const averageN_H2O = calculateAverageNH2O(N_0H2O, waterFraction);
        const averageN_Zr = calculateAverageNZr(N_0Zr, zirconiumFraction);

        return {
            N_0U,
            N_05,
            N_08,
            N_0O2,
            averageN_5,
            averageN_8,
            averageN_O2,
            averageN_H2O,
            averageN_Zr,
            N_0H2O,
            N_0Zr,
        };
    } catch (error) {
        throw new Error(`Ошибка при расчете концентраций: ${error}`);
    }
};
