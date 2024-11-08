import { elemCharacteristics } from '@shared/constants/elemCharacteristics.ts';

/**
 * Рассчитывает замедляющую способность U235.
 *
 * @param {number} n - Ядерная концентрация N (в см^-3).
 * @returns {number} Замедляющая способность в см^-1.
 */
export function calculateModerationCapacityU235(n: number): number {
    return elemCharacteristics.U235.xiCrossSectionS * n;
}

/**
 * Рассчитывает замедляющую способность U238.
 *
 * @param {number} n - Ядерная концентрация N (в см^-3).
 * @returns {number} Замедляющая способность в см^-1.
 */
export function calculateModerationCapacityU238(n: number): number {
    return elemCharacteristics.U238.xiCrossSectionS * n;
}

/**
 * Рассчитывает замедляющую способность O2.
 *
 * @param {number} n - Ядерная концентрация N (в см^-3).
 * @returns {number} Замедляющая способность в см^-1.
 */
export function calculateModerationCapacityO2(n: number): number {
    return elemCharacteristics.O.xiCrossSectionS * n;
}

/**
 * Рассчитывает замедляющую способность H2O.
 *
 * @param {number} n - Ядерная концентрация N (в см^-3).
 * @returns {number} Замедляющая способность в см^-1.
 */
export function calculateModerationCapacityH2O(n: number): number {
    return elemCharacteristics.H2O.xiCrossSectionS * n;
}

/**
 * Рассчитывает замедляющую способность Zr.
 * @param {number} n - Ядерная концентрация N (в см^-3).
 * @returns {number} Замедляющая способность в см^-1.
 */
export function calculateModerationCapacityZr(n: number): number {
    return elemCharacteristics.Zr.xiCrossSectionS * n;
}

/**
 * Рассчитывает суммарную замедляющую способность.
 * @param {number} ModerationCapacityU235 -Замедляющая способность U235 в см^-1
 * @param {number} ModerationCapacityU238 -Замедляющая способность U238 в см^-1
 * @param {number} ModerationCapacityO2 -Замедляющая способность O2 в см^-1
 * @param {number} ModerationCapacityH2O -Замедляющая способность H2O в см^-1
 * @param {number} ModerationCapacityZr -Замедляющая способность Zr в см^-1
 * @returns {number} Суммарная замедляющая способность в см^-1.
 */
export function calculateTotalModerationCapacity(
    ModerationCapacityU235: number,
    ModerationCapacityU238: number,
    ModerationCapacityO2: number,
    ModerationCapacityH2O: number,
    ModerationCapacityZr: number,
): number {
    return (
        ModerationCapacityU235 +
        ModerationCapacityU238 +
        ModerationCapacityO2 +
        ModerationCapacityH2O +
        ModerationCapacityZr
    );
}
