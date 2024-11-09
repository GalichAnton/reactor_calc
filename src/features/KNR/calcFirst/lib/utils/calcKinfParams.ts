import { AVERAGE_N_PER_F_PU235 } from '@shared/constants/general.ts';

/**
 * Параметры для расчета температуры урана
 * @interface
 */
interface UraniumTempParams {
    /** Температура воды в Кельвинах */
    waterTemp: number;
}

/**
 * Рассчитывает температуру урана
 * @param params Параметры расчета
 * @returns Температура урана в Кельвинах
 */
export function calculateUraniumTemp(params: UraniumTempParams): number {
    const { waterTemp } = params;
    return 293 + 4.126 * (waterTemp - 293);
}

/**
 * Параметры для расчета коэффициента использования тепловых нейтронов
 * @interface
 */
interface ThermalNeutronParams {
    /** Объем блока */
    blockVolume: number;
    /** Концентрация U-235 */
    u235Concentration: number;
    /** Сечение поглощения U-235 */
    u235AbsorptionCrossSection: number;
    /** Макроскопическое сечение поглощения блока */
    blockMacroAbsorptionCrossSection: number;
    /** Коэффициент для замедлителя */
    moderatorCoef: number;
    /** Объем замедлителя */
    moderatorVolume: number;
    /** Макроскопическое сечение поглощения замедлителя */
    moderatorMacroAbsorptionCrossSection: number;
}

/**
 * Рассчитывает коэффициент использования тепловых нейтронов
 * @param params Параметры расчета
 * @returns Коэффициент использования тепловых нейтронов
 */
export function calculateThermalNeutronCoef(
    params: ThermalNeutronParams,
): number {
    const {
        blockVolume,
        u235Concentration,
        u235AbsorptionCrossSection,
        blockMacroAbsorptionCrossSection,
        moderatorCoef,
        moderatorVolume,
        moderatorMacroAbsorptionCrossSection,
    } = params;

    const numerator =
        blockVolume * u235Concentration * u235AbsorptionCrossSection;
    const denominator =
        blockVolume * blockMacroAbsorptionCrossSection +
        moderatorCoef * moderatorVolume * moderatorMacroAbsorptionCrossSection;

    return numerator / denominator;
}

/**
 * Параметры для расчета числа вторичных нейтронов
 * @interface
 */
interface SecondaryNeutronsParams {
    /** Сечение деления U-235 */
    u235FissionCrossSection: number;
    /** Сечение поглощения U-235 */
    u235AbsorptionCrossSection: number;
}

/**
 * Рассчитывает число вторичных нейтронов на 1 акт захвата ураном-235
 * @param params Параметры расчета
 * @returns Число вторичных нейтронов
 */
export function calculateSecondaryNeutrons(
    params: SecondaryNeutronsParams,
): number {
    const { u235FissionCrossSection, u235AbsorptionCrossSection } = params;

    return (
        (u235FissionCrossSection / u235AbsorptionCrossSection) *
        AVERAGE_N_PER_F_PU235
    );
}

/**
 * Параметры для расчета нормализованного объема
 * @interface
 */
interface NormalizedVolumeParams {
    /** Исходный объем */
    volume: number;
    /** Плотность */
    density: number;
    /** Нормальная плотность (для урана) */
    normalDensity?: number;
    /** Концентрация (для урана) */
    concentration?: number;
}

/**
 * Рассчитывает объём воды/урана, приведённый к нормальной плотности
 * @param params Параметры расчета
 * @returns Нормализованный объем
 */
export function calculateNormalizedVolume(
    params: NormalizedVolumeParams,
): number {
    const { volume, density, normalDensity, concentration } = params;

    if (normalDensity && concentration) {
        // Для урана
        return (volume * concentration) / (normalDensity * 1e24);
    }
    // Для воды
    return volume * density;
}

/**
 * Параметры для расчета коэффициента размножения на быстрых нейтронах
 * @interface
 */
interface FastNeutronMultiplicationParams {
    /** Нормализованный объем урана */
    normalizedUraniumVolume: number;
    /** Нормализованный объем воды */
    normalizedWaterVolume: number;
}

/**
 * Рассчитывает коэффициент размножения на быстрых нейтронах
 * @param params Параметры расчета
 * @returns Коэффициент размножения
 */
export function calculateFastNeutronMultiplication(
    params: FastNeutronMultiplicationParams,
): number {
    const { normalizedUraniumVolume, normalizedWaterVolume } = params;
    return (
        1 +
        (0.19 * normalizedUraniumVolume) /
            (normalizedUraniumVolume + normalizedWaterVolume)
    );
}
