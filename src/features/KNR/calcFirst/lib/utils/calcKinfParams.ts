import {
    AVERAGE_N_PER_F_PU235,
    NUCLEUS_MASS_UO2,
} from '@shared/constants/general.ts';

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
    /** Коэффициент проигрыша */
    lossFactor: number;
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
        lossFactor,
        moderatorVolume,
        moderatorMacroAbsorptionCrossSection,
    } = params;

    const numerator =
        blockVolume * u235Concentration * u235AbsorptionCrossSection;
    const denominator =
        blockVolume * blockMacroAbsorptionCrossSection +
        lossFactor * moderatorVolume * moderatorMacroAbsorptionCrossSection;

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
    density?: number;
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
    const { volume, density = 1, concentration } = params;

    if (concentration) {
        // Для урана
        return volume * (concentration / NUCLEUS_MASS_UO2);
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

interface TvelParams {
    uraniumVolume: number; // V_U
    uraniumSurface: number; // S_U
}

/**
 * Рассчитывает усреднённую хорду ТВЭЛ
 * @param params Параметры ТВЭЛ
 * @returns Усреднённая хорда в см
 */
export function calculateAverageTvelChord(params: TvelParams): number {
    const { uraniumVolume, uraniumSurface } = params;
    return (4 * uraniumVolume) / uraniumSurface;
}

interface ResonanceEscapeParams {
    V0: number; // Замедляющая способность
    xiSigmaS: number; // ξΣ_s
    uraniumSurface: number; // S_U
    uraniumTemp: number; // T_U
    uraniumVolume: number; // V_U
    N0U: number; // Концентрация ядер урана
}

/**
 * Рассчитывает вероятность избежать резонансного захвата
 * @param params Параметры для расчета вероятности
 * @returns Вероятность избежать резонансного захвата
 */
export function calculateResonanceEscapeProbability(
    params: ResonanceEscapeParams,
): number {
    const { V0, xiSigmaS, uraniumSurface, uraniumTemp, uraniumVolume, N0U } =
        params;

    const averageChord = calculateAverageTvelChord({
        uraniumVolume,
        uraniumSurface,
    });

    const term1 = 0.4 * uraniumSurface * (1 + 0.0175 * Math.sqrt(uraniumTemp));
    const term2 = Math.sqrt(averageChord * N0U * 1e-24);
    const term3 = 4.9 * uraniumVolume * N0U * 1e-24;

    return Math.exp((-1 / (V0 * xiSigmaS)) * (term1 * term2 + term3));
}

interface InfiniteMultiplicationParams {
    mu: number; // Коэффициент размножения на быстрых нейтронах
    phi: number; // Вероятность избежать резонансного захвата
    theta: number; // Коэффициент использования тепловых нейтронов
    eta: number; // Выход нейтронов на один поглощенный
}

/**
 * Рассчитывает коэффициент размножения в бесконечной среде
 * @param params Параметры для расчета коэффициента размножения
 * @returns Коэффициент размножения в бесконечной среде
 */
export function calculateInfiniteMultiplication(
    params: InfiniteMultiplicationParams,
): number {
    const { mu, phi, theta, eta } = params;
    return mu * phi * theta * eta;
}
