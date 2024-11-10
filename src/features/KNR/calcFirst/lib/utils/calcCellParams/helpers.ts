/**
 * Рассчитывает объем ячейки.
 *
 * @param {number} a - Сторона ячейки в сантиметрах (см).
 * @returns {number} Объем ячейки в кубических сантиметрах (см³).
 */
export function calculateCellVolume(a: number): number {
    return Math.pow(a, 2) * Math.cos(Math.PI / 6);
}

/**
 * Рассчитывает объем топлива.
 *
 * @param {number} r1 - Радиус топливного стержня в сантиметрах (см).
 * @returns {number} Объем топлива в кубических сантиметрах (см³).
 */
export function calculateFuelVolume(r1: number): number {
    return Math.pow(r1, 2) * Math.PI;
}

/**
 * Рассчитывает площадь поверхности топлива.
 *
 * @param {number} r1 - Радиус топливного стержня в сантиметрах (см).
 * @returns {number} Площадь поверхности топлива в квадратных сантиметрах (см²).
 */
export function calculateFuelSurfaceArea(r1: number): number {
    return 2 * Math.PI * r1;
}

/**
 * Рассчитывает объем оболочек ТВЭЛ.
 *
 * @param {number} r2 - Внутренний радиус оболочки в сантиметрах (см).
 * @param {number} r3 - Внешний радиус оболочки в сантиметрах (см).
 * @returns {number} Объем оболочек ТВЭЛ в кубических сантиметрах (см³).
 */
export function calculateCladdingVolume(r2: number, r3: number): number {
    return Math.PI * (Math.pow(r3, 2) - Math.pow(r2, 2));
}

/**
 * Рассчитывает объем воды.
 *
 * @param {number} a - Сторона ячейки в сантиметрах (см).
 * @param {number} r3 - Внешний радиус оболочки в сантиметрах (см).
 * @returns {number} Объем воды в кубических сантиметрах (см³).
 */
export function calculateWaterVolume(a: number, r3: number): number {
    return Math.pow(a, 2) * Math.cos(Math.PI / 6) - Math.pow(r3, 2) * Math.PI;
}

/**
 * Рассчитывает объемную долю топлива.
 *
 * @param {number} VU - Объем топлива в кубических сантиметрах (см³).
 * @param {number} V0 - Объем ячейки в кубических сантиметрах (см³).
 * @returns {number} Объемная доля топлива.
 */
export function calculateFuelVolumeFraction(VU: number, V0: number): number {
    return VU / V0;
}

/**
 * Рассчитывает объемную долю конструкционного материала (циркония Zr).
 *
 * @param {number} VZr - Объем оболочек ТВЭЛ в кубических сантиметрах (см³).
 * @param {number} V0 - Объем ячейки в кубических сантиметрах (см³).
 * @returns {number} Объемная доля конструкционного материала.
 */
export function calculateCladdingVolumeFraction(
    VZr: number,
    V0: number,
): number {
    return VZr / V0;
}

/**
 * Рассчитывает объемную долю воды.
 *
 * @param {number} VH2O - Объем воды в кубических сантиметрах (см³).
 * @param {number} V0 - Объем ячейки в кубических сантиметрах (см³).
 * @returns {number} Объемная доля воды.
 */
export function calculateWaterVolumeFraction(VH2O: number, V0: number): number {
    return VH2O / V0;
}
