import {
    AVERAGE_N_PER_F_PU9,
    MICRO_SIGMA_A_PU9,
    MICRO_SIGMA_F_PU9,
    VESKOT_GA_PU9,
    VESKOT_GF_PU9,
} from '@features/KNR/VVER/setInitialValues';

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

/**
 * Вычисляет фактор Sa8, который является отношением средней сечения поглощения 238U к 235U.
 * @param {number} averageAbsorptionCrossSection238U - Среднее сечение поглощения 238U, в барнах.
 * @param {number} averageAbsorptionCrossSection235U - Среднее сечение поглощения 235U, в барнах.
 * @returns Отношение сечений поглощения (Sa8).
 */
export function calculateSa8(
    averageAbsorptionCrossSection238U: number,
    averageAbsorptionCrossSection235U: number,
): number {
    return (
        averageAbsorptionCrossSection238U / averageAbsorptionCrossSection235U
    );
}

/**
 * Вычисляет фактор Sf8, который является отношением средней сечения деления 238U к сечению поглощения 235U.
 * @param {number} averageFissionCrossSection235U - Среднее сечение деления 238U, в барнах.
 * @param {number} averageAbsorptionCrossSection235U - Среднее сечение поглощения 235U, в барнах.
 * @returns Отношение сечений поглощения (Sf8).
 */
export function calculateSf8(
    averageFissionCrossSection235U: number,
    averageAbsorptionCrossSection235U: number,
): number {
    return averageFissionCrossSection235U / averageAbsorptionCrossSection235U;
}

/**
 * Вычисляет фактор Sf9, который является отношением средней сечения деления 239Pu к сечению поглощения 235U.
 * @param {number} averageFissionCrossSection239Pu - Среднее сечение деления 239Pu.
 * @param {number} averageAbsorptionCrossSection235U - Среднее сечение поглощения 235U.
 * @returns Отношение сечений поглощения (Sf9).
 */
export function calculateSf9(
    averageFissionCrossSection239Pu: number,
    averageAbsorptionCrossSection235U: number,
): number {
    return averageFissionCrossSection239Pu / averageAbsorptionCrossSection235U;
}

/**
 * Интерфейс для ввода параметров, необходимых для вычисления коррекционного фактора S9.
 *
 * @interface CorrectionFactorParams
 * @property {number} averageAbsorptionCrossSection239Pu - Среднее сечение поглощения для 239Pu.
 * @property {number} averageAbsorptionCrossSection235U - Среднее сечение поглощения для 235U.
 * @property {number} fastNeutronReproductionCoefficient - Коэффициент воспроизведения быстрых нейтронов.
 * @property {number} secondaryNeutronsPerAbsorption239Pu - Количество вторичных нейтронов на одно поглощение 239Pu.
 * @property {number} resonanceEscapeProbability - Вероятность избегания резонансного поглощения.
 * @property {number} geometricParameter - Геометрический параметр, влияющий на распределение нейтронов.
 * @property {number} thermalNeutronAge - Возраст тепловых нейтронов как мера их возбуждения в ядерном реакторе.
 */
interface CorrectionFactorParams {
    averageAbsorptionCrossSection239Pu: number;
    averageAbsorptionCrossSection235U: number;
    fastNeutronReproductionCoefficient: number;
    secondaryNeutronsPerAbsorption239Pu: number;
    resonanceEscapeProbability: number;
    geometricParameter: number;
    thermalNeutronAge: number;
}

/**
 * Вычисляет коррекционный фактор Sa9 для 239Pu с учетом различных ядерных параметров.
 *
 * @param {CorrectionFactorParams} params - Объект, содержащий параметры для вычисления.
 * @returns {number} - Вычисленный коррекционный фактор Sa9 для 239Pu.
 */
export function calculateSa9(params: CorrectionFactorParams): number {
    const {
        averageAbsorptionCrossSection239Pu,
        averageAbsorptionCrossSection235U,
        fastNeutronReproductionCoefficient,
        secondaryNeutronsPerAbsorption239Pu,
        resonanceEscapeProbability,
        geometricParameter,
        thermalNeutronAge,
    } = params;

    const correctionFactor =
        1 -
        fastNeutronReproductionCoefficient *
            secondaryNeutronsPerAbsorption239Pu *
            (1 - resonanceEscapeProbability) *
            Math.exp(
                -geometricParameter * geometricParameter * thermalNeutronAge,
            );
    return (
        (averageAbsorptionCrossSection239Pu /
            averageAbsorptionCrossSection235U) *
        correctionFactor
    );
}

interface NuclearConcentrationPu9Params {
    nuclearConcentration238U: number;
    initialNuclearConcentration235U: number;
    S8: number;
    S9: number;
    z: number;
    fastNeutronReproductionCoefficient: number;
    secondaryNeutronsPerAbsorption235U: number;
    resonanceEscapeProbability: number;
    geometricParameter: number;
    thermalNeutronAge: number;
}

/**
     Вычисляет ядерную концентрацию 239Pu в ядерном реакторе.
     @param {Object} params - Объект с параметрами.
     @param {number} params.nuclearConcentration238U - Ядерная концентрация 238U.
     @param {number} params.initialNuclearConcentration235U - Начальная ядерная концентрация 235U.
     @param {number} params.S8 - Коррекционный фактор для 238U (S8).
     @param {number} params.S9 - Коррекционный фактор для 239Pu (S9).
     @param {number} params.z - глубина выгорания.
     @param {number} params.fastNeutronReproductionCoefficient - Коэффициент воспроизведения быстрых нейтронов.
     @param {number} params.secondaryNeutronsPerAbsorption235U - Количество вторичных нейтронов на одно поглощение 235U.
     @param {number} params.resonanceEscapeProbability - Вероятность избегания резонансного поглощения.
     @param {number} params.geometricParameter - Геометрический параметр.
     @param {number} params.thermalNeutronAge - Возраст тепловых нейтронов.
     @returns {number} Ядерная концентрация 239Pu.
     */
export function calculateNuclearConcentrationPu9(
    params: NuclearConcentrationPu9Params,
): number {
    const {
        nuclearConcentration238U,
        initialNuclearConcentration235U,
        S8,
        S9,
        z,
        fastNeutronReproductionCoefficient,
        secondaryNeutronsPerAbsorption235U,
        resonanceEscapeProbability,
        geometricParameter,
        thermalNeutronAge,
    } = params;
    const term1 =
        ((nuclearConcentration238U * S8) / S9) * (1 - Math.exp(-S9 * z));
    const term2 =
        ((initialNuclearConcentration235U *
            (fastNeutronReproductionCoefficient *
                secondaryNeutronsPerAbsorption235U *
                (1 - resonanceEscapeProbability) *
                Math.exp(
                    -geometricParameter *
                        geometricParameter *
                        thermalNeutronAge,
                ))) /
            (S9 - 1)) *
        (Math.exp(-z) - Math.exp(-S9 * z));
    return term1 + term2;
}

/**
 * Вычисляет оставшуюся ядерную концентрацию 235U на основе начальной концентрации и истощения за время или расстояние.
 *
 * @param {number} initialNuclearConcentration235U - Начальная ядерная концентрация 235U, в см⁻³.
 * @param {number} z - глубина выгорания.
 * @returns Результирующая ядерная концентрация 235U при заданных условиях (N05).
 */
export function calculateNuclearConcentrationU5(
    initialNuclearConcentration235U: number,
    z: number,
): number {
    return initialNuclearConcentration235U * Math.exp(-z);
}

/**
 * Вычисляет усредненное микроскопическое сечение деления плутония-239.
 * @param {number} neutronGasTemperature - Температура в кельвинах.
 * @returns {number} - Усредненное микроскопическое сечение деления.
 */
export function calcAverageFissionCrossSection239Pu(
    neutronGasTemperature: number,
): number {
    return (
        (Math.sqrt(Math.PI) / 2) *
        MICRO_SIGMA_F_PU9 *
        Math.sqrt(293 / neutronGasTemperature) *
        VESKOT_GF_PU9
    );
}

/**
 * Вычисляет усредненное микроскопическое сечение поглощения плутония-239.
 * @param {number} neutronGasTemperature - Температура нейтронного газа.
 * @returns {number} - Усредненное микроскопическое сечение поглощения.
 */
export function calcAverageAbsorptionCrossSection239Pu(
    neutronGasTemperature: number,
): number {
    return (
        (Math.sqrt(Math.PI) / 2) *
        MICRO_SIGMA_A_PU9 *
        Math.sqrt(293 / neutronGasTemperature) *
        VESKOT_GA_PU9
    );
}

/**
 * Вычисляет число вторичных нейтронов на 1 акт поглощения плутонием-239.
 * @param {number} averageFissionCrossSectionPu9 - Усредненное микроскопическое сечение деления.
 * @param {number} averageAbsorptionCrossSectionPu9 - Усредненное микроскопическое сечение поглощения.
 * @returns {number} - Число вторичных нейтронов на одно поглощение.
 */
export function calcSecondaryNeutronsPerAbsorption239Pu(
    averageFissionCrossSectionPu9: number,
    averageAbsorptionCrossSectionPu9: number,
): number {
    return (
        AVERAGE_N_PER_F_PU9 *
        (averageFissionCrossSectionPu9 / averageAbsorptionCrossSectionPu9)
    );
}
