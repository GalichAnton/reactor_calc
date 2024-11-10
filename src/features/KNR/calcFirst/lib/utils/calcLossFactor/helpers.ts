/**
 * Рассчитывает параметр p (отношение макросечений).
 *
 * @param {number} ksiS5 - ξΣ для U5
 * @param {number} ksiS8 - ξΣ для U8
 * @param {number} ksiSO2 - ξΣ для O2
 * @param {number} ksiSH2O - ξΣ для H2O
 * @param {number} ksiSZr - ξΣ для Zr
 * @returns {number} Значение параметра p
 */
export function calculateP(
    ksiS5: number,
    ksiS8: number,
    ksiSO2: number,
    ksiSH2O: number,
    ksiSZr: number,
): number {
    return (ksiS5 + ksiS8 + ksiSO2) / (ksiSH2O + ksiSZr);
}

/**
 * Рассчитывает коэффициент диффузии.
 *
 * @param {number} sigmaTr - Транспортное макросечение
 * @returns {number} Коэффициент диффузии в сантиметрах
 */
export function calculateDiffusionCoefficient(sigmaTr: number): number {
    return 1 / (3 * sigmaTr);
}

/**
 * Рассчитывает обратную длину диффузии.
 *
 * @param {number} sigmaA - Макросечение поглощения
 * @param {number} D - Коэффициент диффузии
 * @returns {number} Обратная длина диффузии в см^-1
 */
export function calculateInverseDiffusionLength(
    sigmaA: number,
    D: number,
): number {
    return Math.sqrt(sigmaA / D);
}

/**
 * Рассчитывает плотность потока для блока.
 *
 * @param {Object} params - Параметры расчета
 * @returns {number} Плотность потока для блока
 */
export function calculateBlockFlux(params: {
    blockInverseDiffLength: number;
    moderatorInverseDiffLength: number;
    blockDiffusionCoef: number;
    moderatorDiffusionCoef: number;
    twoZoneBlockAbsorptionCrossSection: number;
    twoZoneModeratorAbsorptionCrossSection: number;
    powerRatio: number;
    G0: number;
    G1: number;
    I0: number;
    I1: number;
    R1: number;
}): number {
    const {
        blockInverseDiffLength,
        moderatorInverseDiffLength,
        blockDiffusionCoef,
        moderatorDiffusionCoef,
        twoZoneBlockAbsorptionCrossSection,
        twoZoneModeratorAbsorptionCrossSection,
        powerRatio,
        G0,
        G1,
        I0,
        I1,
        R1,
    } = params;

    const numerator =
        moderatorInverseDiffLength *
        moderatorDiffusionCoef *
        G1 *
        (twoZoneBlockAbsorptionCrossSection -
            powerRatio * twoZoneModeratorAbsorptionCrossSection) *
        2 *
        I1;
    const denominator =
        twoZoneModeratorAbsorptionCrossSection *
        twoZoneBlockAbsorptionCrossSection *
        (moderatorInverseDiffLength * moderatorDiffusionCoef * G1 * I0 -
            blockInverseDiffLength * blockDiffusionCoef * G0 * I1) *
        blockInverseDiffLength *
        R1;

    return (
        numerator / denominator +
        powerRatio / twoZoneBlockAbsorptionCrossSection
    );
}

/**
 * Рассчитывает плотность потока для замедлителя.
 *
 * @param {Object} params - Параметры расчета
 * @returns {number} Плотность потока для замедлителя
 */
export function calculateModeratorFlux(params: {
    blockInverseDiffLength: number; // α'
    moderatorInverseDiffLength: number; // α''
    blockDiffusionCoef: number; // D'
    moderatorDiffusionCoef: number; // D''
    twoZoneBlockAbsorptionCrossSection: number; // Σ'_a
    twoZoneModeratorAbsorptionCrossSection: number; // Σ''_a
    powerRatio: number; // p
    R1: number; // R₁
    R2: number; // R₂
    G0: number; // G₀
    G1: number; // G₁
    I0: number; // I₀
    I1: number; // I₁
}): number {
    const {
        blockInverseDiffLength,
        moderatorInverseDiffLength,
        blockDiffusionCoef,
        moderatorDiffusionCoef,
        twoZoneBlockAbsorptionCrossSection,
        twoZoneModeratorAbsorptionCrossSection,
        powerRatio,
        R1,
        R2,
        G0,
        G1,
        I0,
        I1,
    } = params;

    const numerator =
        blockInverseDiffLength *
        blockDiffusionCoef *
        I1 *
        (powerRatio * twoZoneModeratorAbsorptionCrossSection -
            twoZoneBlockAbsorptionCrossSection) *
        2 *
        R1 *
        G1;

    const denominator =
        twoZoneModeratorAbsorptionCrossSection *
        twoZoneBlockAbsorptionCrossSection *
        (moderatorInverseDiffLength * moderatorDiffusionCoef * G1 * I0 -
            blockInverseDiffLength * blockDiffusionCoef * G0 * I1) *
        moderatorInverseDiffLength *
        (R2 * R2 - R1 * R1);

    return numerator / denominator + 1 / twoZoneModeratorAbsorptionCrossSection;
}

/**
 * Рассчитывает коэффициент проигрыша.
 *
 * @param {number} moderatorFluxDensity - Поток в замедлителе
 * @param {number} blockFluxDensity - Поток в блоке
 * @returns {number} Коэффициент проигрыша
 */
export function calculateLossFactorSimple(
    blockFluxDensity: number,
    moderatorFluxDensity: number,
): number {
    return moderatorFluxDensity / blockFluxDensity;
}

/**
 * Рассчитывает коэффициент проигрыша по альтернативной методике.
 *
 * @param {Object} params - Параметры расчета
 * @returns {number} Коэффициент проигрыша
 */
export function calculateLossFactorOther(params: {
    R1: number;
    R2: number;
    twoZoneBlockAbsorptionCrossSection: number;
    moderatorDiffusionCoef: number;
    powerRatio: number;
    blockInverseDiffLength: number;
    blockDiffusionCoef: number;
    I0: number;
    I1: number;
}): number {
    const {
        R1,
        R2,
        twoZoneBlockAbsorptionCrossSection,
        moderatorDiffusionCoef,
        powerRatio,
        blockInverseDiffLength,
        blockDiffusionCoef,
        I0,
        I1,
    } = params;

    const term1 =
        (Math.pow(R1, 2) * twoZoneBlockAbsorptionCrossSection) /
        (Math.pow(R2, 2) - Math.pow(R1, 2) + Math.pow(R1, 2) * powerRatio);

    const term2 =
        (Math.pow(R2, 4) /
            (2 *
                moderatorDiffusionCoef *
                (Math.pow(R2, 2) - Math.pow(R1, 2)))) *
        Math.log(R2 / R1);

    const term3 =
        -(3 * Math.pow(R2, 2) - Math.pow(R1, 2)) / (8 * moderatorDiffusionCoef);

    const term4 = powerRatio / twoZoneBlockAbsorptionCrossSection;

    const term5 =
        ((Math.pow(R2, 2) - Math.pow(R1, 2)) * I0) /
        (2 * R1 * blockInverseDiffLength * blockDiffusionCoef * I1);

    return term1 * (term2 + term3 + term4 + term5);
}

/**
 * Вспомогательная функция для расчета G0 замедлителя
 */
export const calculateModeratorG0 = (
    moderatorInverseDiffLength: number,
    R1: number,
    R2: number,
    besselI: Function,
    besselK: Function,
): number => {
    return (
        besselI(moderatorInverseDiffLength * R1, 0) +
        (besselI(moderatorInverseDiffLength * R2, 1) /
            besselK(moderatorInverseDiffLength * R2, 1)) *
            besselK(moderatorInverseDiffLength * R1, 0)
    );
};

/**
 * Вспомогательная функция для расчета G1 замедлителя
 */
export const calculateModeratorG1 = (
    moderatorInverseDiffLength: number,
    R1: number,
    R2: number,
    besselI: Function,
    besselK: Function,
): number => {
    return (
        besselI(moderatorInverseDiffLength * R1, 1) -
        (besselI(moderatorInverseDiffLength * R2, 1) /
            besselK(moderatorInverseDiffLength * R2, 1)) *
            besselK(moderatorInverseDiffLength * R1, 1)
    );
};
