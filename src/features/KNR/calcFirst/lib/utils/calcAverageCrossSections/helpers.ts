/**
 * Рассчитывает усредненные микроскопическое и макроскопическое сечения компонента.
 *
 * @param {number} microSigmaAverage - Усредненное микроскопическое сечение компонента (σ_x).
 * @param {number} temperature - Температура нейтронного газа в Кельвинах (T_н).
 * @param {number} gFactor - Фактор Весткотта (g_x(T_н)_i).
 * @param {number} nuclearConcentration - Средняя ядерная концентрация компонента (N_x).
 * @returns {[number, number]} Массив из двух значений:
 * [0] - усредненное микроскопическое сечение ((σ_x)̅),
 * [1] - усредненное макроскопическое сечение ((Σ_x)̅).
 */
export function calculateCrossSections(
    microSigmaAverage: number,
    temperature: number,
    gFactor: number,
    nuclearConcentration: number,
): [number, number] {
    const averageMicroCrossSection =
        (Math.sqrt(Math.PI) / 2) *
        microSigmaAverage *
        Math.sqrt(293 / temperature) *
        gFactor;

    const averageMacroCrossSection =
        averageMicroCrossSection * nuclearConcentration;

    return [averageMicroCrossSection, averageMacroCrossSection];
}
