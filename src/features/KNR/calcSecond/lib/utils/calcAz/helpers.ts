/**
 * Рассчитывает объем активной зоны реактора.
 *
 * @param {number} P - Мощность реактора в мегаваттах (МВт).
 * @param {number} q_v - Удельное выделение тепла в ваттах на кубический сантиметр (Вт/см³).
 * @returns {number} Объем активной зоны в кубических сантиметрах (см³).
 */
export function calculateAZVolume(P: number, q_v: number): number {
    return (P * 1e6) / q_v;
}

/**
 * Рассчитывает диаметр активной зоны реактора.
 * Вычисляет диаметр активной зоны (D) на основе объема (V) и высоты АЗ (H),
 * @param {number} V - Объем активной зоны в кубических сантиметрах (см³).
 * @param {number} H - Высота активной зоны в сантиметрах (см).
 * @returns {number} Диаметр активной зоны в сантиметрах (см).
 */
export function calculateAZDiameter(V: number, H: number): number {
    return Math.sqrt((4 * V) / (Math.PI * H));
}

/**
 * Рассчитывает геометрический параметр B.
 * Данный параметр рассчитывается на основе диаметра (D) и высоты АЗ (H),
 * @param {number} D - Диаметр активной зоны в сантиметрах (см).
 * @param {number} H - Высота активной зоны в сантиметрах (см).
 * @returns {number} Геометрический параметр B в обратных сантиметрах (см⁻¹).
 */
export function calculateGeometricParameter(D: number, H: number): number {
    const part1 = (2 * 2.405) / D;
    const part2 = Math.PI / H;
    return part1 ** 2 + part2 ** 2;
}

/**
 * @param {number} D - Диаметр активной зоны в сантиметрах.
 * @param {number} a - Размер стороны шестигранной ячейки в сантиметрах.
 * @returns {number} Число ТВС (тепловыделяющих сборок).
 */
export function calculateNumberOfTVS(D: number, a: number): number {
    const pi = Math.PI;
    const cosPiOver6 = Math.cos(pi / 6);
    const numerator = pi * D * D;
    const denominator = 4 * a * a * cosPiOver6;
    const N_tvs = numerator / denominator;
    return Math.round(N_tvs); // Округляем результат до ближайшего целого
}

/**
 * @param {number} k_infinity - Бесконечный коэффициент размножения.
 * @param {number} B - Геометрический параметр.
 * @param {number} tau - Толщина активной зоны или эквивалентный параметр.
 * @param {number} L - Характеристика диффузии.
 * @returns {number} Эффективный коэффициент размножения.
 */
export function calculateKeffective(
    k_infinity: number,
    B: number,
    tau: number,
    L: number,
): number {
    const exponentPart = Math.exp(-B * tau);
    const denominator = 1 + B * L;

    return (k_infinity * exponentPart) / denominator;
}

/**
 * @param {number} k_effective - Эффективный коэффициент размножения.
 * @returns {number} Реактивность реактора.
 */
export function calculateReactivity(k_effective: number): number {
    if (k_effective <= 0) {
        throw new Error('k_effective must be greater than zero.');
    }
    return (k_effective - 1) / k_effective;
}
