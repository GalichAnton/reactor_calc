/**
 * Интерфейс для параметров расчета коэффициента воспроизводства.
 */
interface ReproductionParameters {
    /**
     * Усреднённое сечение поглощения 238U, в барнах.
     */
    averageAbsorptionCrossSection238U: number; // {\bar{\sigma}}_{a_8}

    /**
     * Усреднённое сечение поглощения 235U, в барнах.
     */
    averageAbsorptionCrossSection235U: number; // {\bar{\sigma}}_{a_5}

    /**
     * Ядерная концентрация 235U, в см⁻³.
     */
    nuclearConcentration235U: number; // N05

    /**
     * Ядерная концентрация 238U, в см⁻³.
     */
    nuclearConcentration238U: number; // N08

    /**
     * Коэффициент размножения быстрых нейтронов.
     */
    fastNeutronReproductionCoefficient: number; // (μ)

    /**
     * Число вторичных нейтронов на 1 акт захвата 235U
     */
    secondaryNeutronsPerAbsorption235U: number;

    /**
     * Вероятность избежать резонансного захвата
     */
    resonanceEscapeProbability: number;

    /**
     * Геометрический параметр B в обратных сантиметрах (см⁻¹)
     */
    geometricParameter: number;

    /**
     * Возраст тепловых нейтронов
     */
    thermalNeutronAge: number;
}

/**
 * Рассчитывает Коэффициент воспроизводства (КВ) в начале кампании.
 *
 * @param {ReproductionParameters} params - Параметры для расчета.
 * @returns {number} Значение коэффициента воспроизводства (КВ).
 */
export function calculateReproductionCoefficient(
    params: ReproductionParameters,
): number {
    const {
        averageAbsorptionCrossSection235U,
        averageAbsorptionCrossSection238U,
        resonanceEscapeProbability,
        fastNeutronReproductionCoefficient,
        secondaryNeutronsPerAbsorption235U,
        thermalNeutronAge,
        nuclearConcentration238U,
        nuclearConcentration235U,
        geometricParameter,
    } = params;

    const firstTerm =
        (averageAbsorptionCrossSection238U * nuclearConcentration238U) /
        (averageAbsorptionCrossSection235U * nuclearConcentration235U);
    const secondTerm =
        fastNeutronReproductionCoefficient *
        secondaryNeutronsPerAbsorption235U *
        (1 - resonanceEscapeProbability) *
        Math.exp(-(geometricParameter ** 2 * thermalNeutronAge));

    return firstTerm + secondTerm;
}
