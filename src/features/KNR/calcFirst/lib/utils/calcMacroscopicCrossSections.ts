import { elemCharacteristics } from '@shared/constants/elemCharacteristics';

/**
 * Рассчитывает макроскопическое сечение поглощения U235.
 *
 * @param {number} N5 - Ядерная концентрация U235 (см⁻³).
 * @returns {number} Макроскопическое сечение поглощения U235 (см⁻¹).
 */
export function calculateMacroSigmaA5(N5: number): number {
    return elemCharacteristics.U235.crossSectionA * N5;
}

/**
 * Рассчитывает макроскопическое сечение поглощения U238.
 *
 * @param {number} N8 - Ядерная концентрация U238 (см⁻³).
 * @returns {number} Макроскопическое сечение поглощения U238 (см⁻¹).
 */
export function calculateMacroSigmaA8(N8: number): number {
    return elemCharacteristics.U238.crossSectionA * N8;
}

/**
 * Рассчитывает макроскопическое сечение поглощения циркония.
 *
 * @param {number} N_Zr - Ядерная концентрация Zr (см⁻³).
 * @returns {number} Макроскопическое сечение поглощения Zr (см⁻¹).
 */
export function calculateMacroSigmaAZr(N_Zr: number): number {
    return elemCharacteristics.Zr.crossSectionA * N_Zr;
}

/**
 * Рассчитывает макроскопическое сечение поглощения кислорода O2.
 *
 * @param {number} N_O2 - Ядерная концентрация O2 (см⁻³).
 * @returns {number} Макроскопическое сечение поглощения O2 (см⁻¹).
 */
export function calculateMacroSigmaAO2(N_O2: number): number {
    return elemCharacteristics.O.crossSectionA * N_O2;
}

/**
 * Рассчитывает макроскопическое сечение поглощения воды H2O.
 *
 * @param {number} N_H2O - Ядерная концентрация H2O (см⁻³).
 * @returns {number} Макроскопическое сечение поглощения H2O (см⁻¹).
 */
export function calculateMacroSigmaAH2O(N_H2O: number): number {
    return elemCharacteristics.H2O.crossSectionA * N_H2O;
}

/**
 * Рассчитывает суммарное макроскопическое сечение поглощения.
 *
 * @param {number} sigma_a5 - Макроскопическое сечение поглощения U235 (см⁻¹).
 * @param {number} sigma_a8 - Макроскопическое сечение поглощения U238 (см⁻¹).
 * @param {number} sigma_aZr - Макроскопическое сечение поглощения Zr (см⁻¹).
 * @param {number} sigma_aO2 - Макроскопическое сечение поглощения O2 (см⁻¹).
 * @param {number} sigma_aH2O - Макроскопическое сечение поглощения H2O (см⁻¹).
 * @returns {number} Суммарное макроскопическое сечение поглощения (см⁻¹).
 */
export function calculateTotalMacroSigmaA(
    sigma_a5: number,
    sigma_a8: number,
    sigma_aZr: number,
    sigma_aO2: number,
    sigma_aH2O: number,
): number {
    return sigma_a5 + sigma_a8 + sigma_aZr + sigma_aO2 + sigma_aH2O;
}
