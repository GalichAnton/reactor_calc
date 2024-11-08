import {
    MOLAR_MASS_H2O,
    MOLAR_MASS_UO2,
    MOLAR_MASS_ZR,
    N_A,
} from '@features/KNR/VVER/setInitialValues';

/**
 * Рассчитывает ядерную концентрацию топлива UO2.
 *
 * @param {number} density - Плотность UO2 в граммах на кубический сантиметр (г/см³).
 * @returns {number} Ядерная концентрация UO2 в см⁻³.
 */
export function calculateN0U(density: number): number {
    return (N_A * density) / MOLAR_MASS_UO2;
}

/**
 * Рассчитывает ядерную концентрацию U235.
 *
 * @param {number} N0U - Ядерная концентрация UO2 в см⁻³.
 * @param {number} x - Концентрация U235 в процентах.
 * @returns {number} Ядерная концентрация U235 в см⁻³.
 */
export function calculateN05(N0U: number, x: number): number {
    return N0U * (x / 100);
}

/**
 * Рассчитывает ядерную концентрацию U238.
 *
 * @param {number} N0U - Ядерная концентрация UO2 в см⁻³.
 * @param {number} x - Концентрация U235 в процентах.
 * @returns {number} Ядерная концентрация U238 в см⁻³.
 */
export function calculateN08(N0U: number, x: number): number {
    return N0U * (1 - x / 100);
}

/**
 * Рассчитывает ядерную концентрацию кислорода O2.
 *
 * @param {number} N0U - Ядерная концентрация UO2 в см⁻³.
 * @returns {number} Ядерная концентрация кислорода O2 в см⁻³.
 */
export function calculateN0O2(N0U: number): number {
    return 2 * N0U;
}

/**
 * Рассчитывает ядерную концентрацию воды H2O.
 *
 * @param {number} density - Плотность воды в граммах на кубический сантиметр (г/см³).
 * @returns {number} Ядерная концентрация воды H2O в см⁻³.
 */
export function calculateN0H2O(density: number): number {
    return (N_A * density) / MOLAR_MASS_H2O;
}

/**
 * Рассчитывает ядерную концентрацию циркония Zr.
 *
 * @param {number} density - Плотность циркония в граммах на кубический сантиметр (г/см³).
 * @returns {number} Ядерная концентрация циркония Zr в см⁻³.
 */
export function calculateN0Zr(density: number): number {
    return (N_A * density) / MOLAR_MASS_ZR;
}

/**
 * Рассчитывает среднюю ядерную концентрацию U235 по гомогенной ячейке.
 *
 * @param {number} N05 - Ядерная концентрация U235 в см⁻³.
 * @param {number} epsilonU - Объемная доля топлива ε_U.
 * @returns {number} Средняя ядерная концентрация U235 в см⁻³.
 */
export function calculateAverageN5(N05: number, epsilonU: number): number {
    return N05 * epsilonU;
}

/**
 * Рассчитывает среднюю ядерную концентрацию U238 по гомогенной ячейке.
 *
 * @param {number} N08 - Ядерная концентрация U238 в см⁻³.
 * @param {number} epsilonU - Объемная доля топлива ε_U.
 * @returns {number} Средняя ядерная концентрация U238 в см⁻³.
 */
export function calculateAverageN8(N08: number, epsilonU: number): number {
    return N08 * epsilonU;
}

/**
 * Рассчитывает среднюю ядерную концентрацию кислорода O2 по гомогенной ячейке.
 *
 * @param {number} N0O2 - Ядерная концентрация O2 в см⁻³.
 * @param {number} epsilonU - Объемная доля топлива ε_U.
 * @returns {number} Средняя ядерная концентрация O2 в см⁻³.
 */
export function calculateAverageNO2(N0O2: number, epsilonU: number): number {
    return N0O2 * epsilonU;
}

/**
 * Рассчитывает среднюю ядерную концентрацию воды H2O по гомогенной ячейке.
 *
 * @param {number} N0H2O - Ядерная концентрация H2O в см⁻³.
 * @param {number} epsilonH2O - Объемная доля воды ε_H2O.
 * @returns {number} Средняя ядерная концентрация воды H2O в см⁻³.
 */
export function calculateAverageNH2O(
    N0H2O: number,
    epsilonH2O: number,
): number {
    return N0H2O * epsilonH2O;
}

/**
 * Рассчитывает среднюю ядерную концентрацию циркония Zr по гомогенной ячейке.
 *
 * @param {number} N0Zr - Ядерная концентрация циркония Zr в см⁻³.
 * @param {number} epsilonZr - Объемная доля топлива циркония ε_Zr.
 * @returns {number} Средняя ядерная концентрация циркония Zr в см⁻³.
 */
export function calculateAverageNZr(N0Zr: number, epsilonZr: number): number {
    return N0Zr * epsilonZr;
}
