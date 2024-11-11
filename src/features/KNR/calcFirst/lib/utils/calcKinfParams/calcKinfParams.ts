import { getWaterDensity } from '@shared/lib/utils';
import { SetParams } from '@shared/types/param.ts';

import {
    calculateFastNeutronMultiplication,
    calculateInfiniteMultiplication,
    calculateNormalizedVolume,
    calculateResonanceEscapeProbability,
    calculateSecondaryNeutrons,
    calculateThermalNeutronCoef,
    calculateUraniumTemp,
} from './helpers.ts';
import { KInfParams } from '../../../model/types/kInfParams.ts';

/**
 * Интерфейс входных параметров для расчета нейтронно-физических характеристик
 */
interface CalcKInfParamsProps {
    // Усредненные микросечения
    /** Усредненное микроскопическое сечение поглощения U-235 */
    averagedMicroAU5: number;
    /** Усредненное макроскопическое сечение поглощения U-235 */
    averagedMacroAU5: number;
    /** Усредненное микроскопическое сечение деления U-235 */
    averagedMicroFU5: number;

    // Параметры теплоносителя
    /** Температура теплоносителя в градусах Цельсия */
    coolantTemperature: number;

    // Параметры двухзонной модели
    /** Объем ячейки в двухзонной модели */
    twoZoneCellVolume: number;
    /** Макроскопическое сечение поглощения блока в двухзонной модели */
    twoZoneBlockAbsorptionCrossSection: number;
    /** Макроскопическое сечение поглощения замедлителя в двухзонной модели */
    twoZoneModeratorAbsorptionCrossSection: number;
    /** Объем замедлителя в двухзонной модели */
    twoZoneModeratorVolume: number;

    // Фактор потерь
    /** Фактор потерь нейтронов */
    lossFactor: number;

    // Ядерные концентрации
    /** Средняя ядерная концентрация U-235 */
    averageN_5: number;
    /** Ядерная концентрация U-238 */
    N_0U: number;

    // Параметры ячейки
    /** Объем воды в ячейке */
    waterVolume: number;
    /** Объем топлива в ячейке */
    fuelVolume: number;
    /** Площадь поперечного сечения топлива */
    fuelArea: number;
    /** Общий объем ячейки */
    cellVolume: number;

    // Замедляющая способность
    /** Общая замедляющая способность */
    totalModerationCapacity: number;
}

/**
 * Рассчитывает нейтронно-физические параметры размножения
 *
 * @param params - Входные параметры для расчета
 * @returns {Promise<SetParams<KInfParams>>} Объект с рассчитанными параметрами
 * @throws {Error} Ошибка при некорректных входных данных
 */
export const calculateKInfParams = async (
    params: CalcKInfParamsProps,
): Promise<SetParams<KInfParams>> => {
    try {
        const {
            averagedMicroAU5,
            averagedMacroAU5,
            averagedMicroFU5,
            coolantTemperature,
            twoZoneCellVolume,
            twoZoneBlockAbsorptionCrossSection,
            twoZoneModeratorAbsorptionCrossSection,
            twoZoneModeratorVolume,
            lossFactor,
            N_0U,
            waterVolume,
            fuelVolume,
            fuelArea,
            cellVolume,
            totalModerationCapacity,
        } = params;

        const uraniumTemperature = calculateUraniumTemp({
            waterTemp: coolantTemperature,
        });

        const thermalUtilization = calculateThermalNeutronCoef({
            blockVolume: twoZoneCellVolume,
            blockMacroAbsorptionCrossSection:
                twoZoneBlockAbsorptionCrossSection,
            moderatorMacroAbsorptionCrossSection:
                twoZoneModeratorAbsorptionCrossSection,
            moderatorVolume: twoZoneModeratorVolume,
            lossFactor,
            u235MacroAbsorptionCrossSection: averagedMacroAU5,
            fuelVolume: fuelVolume,
        });

        const reproductionFactor = calculateSecondaryNeutrons({
            u235AbsorptionCrossSection: averagedMicroAU5,
            u235FissionCrossSection: averagedMicroFU5,
        });

        const normalizedWaterVolume = calculateNormalizedVolume({
            volume: waterVolume,
            density: getWaterDensity(coolantTemperature),
        });

        const normalizedUraniumVolume = calculateNormalizedVolume({
            volume: fuelVolume,
            concentration: N_0U,
        });

        const fastFissionFactor = calculateFastNeutronMultiplication({
            normalizedUraniumVolume,
            normalizedWaterVolume,
        });

        const resonanceEscapeProbability = calculateResonanceEscapeProbability({
            uraniumSurface: fuelArea,
            uraniumVolume: fuelVolume,
            uraniumTemp: uraniumTemperature,
            V0: cellVolume,
            xiSigmaS: totalModerationCapacity,
            N0U: N_0U,
        });

        const infiniteMultiplicationFactor = calculateInfiniteMultiplication({
            mu: fastFissionFactor,
            theta: thermalUtilization,
            eta: reproductionFactor,
            phi: resonanceEscapeProbability,
        });

        return {
            fastFissionFactor,
            reproductionFactor,
            resonanceEscapeProbability,
            uraniumTemperature,
            normalizedUraniumVolume,
            normalizedWaterVolume,
            infiniteMultiplicationFactor,
            thermalUtilization,
        };
    } catch (error) {
        throw new Error(
            `Ошибка при расчете параметров размножения нейтронов: ${error}`,
        );
    }
};
