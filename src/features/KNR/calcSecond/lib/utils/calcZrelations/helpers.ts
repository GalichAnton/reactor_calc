import {
    DECAY_CONSTANT_XE,
    MICRO_SIGMA_A_XE135,
    YIELD_PER_FISSION_SM,
    YIELD_PER_FISSION_XE,
} from '@features/KNR/VVER/setInitialValues';

interface CalcReactorRuntime {
    z: number;
    secondaryNeutronsPerAbsorption235U: number;
    Sf5: number;
    Sf9: number;
    Sa9: number;
    Sa8: number;
    fastNeutronReproductionCoefficient: number;
    resonanceEscapeProbability: number;
    thermalNeutronAge: number;
    geometricParameter: number;
    nuclearConcentration238U: number;
    nuclearConcentration235Uby0: number;
    nuclearConcentration239PUbyZ: number;
    averageSpecificByVolumePower: number;
}

/**
 * Вычисляет время работы реактора в сутках в зависимости от глубины выгорания z.
 * @param {Object} params - Объект с параметрами.
 * @param {number} params.z - глубина выгорания.
 * @param {number} params.averageSpecificByVolumePower - средняя удельная мощность, выделяемую в единице объема топлива.
 * @param {number} params.Sf5 - Фактор S5 деления.
 * @param {number} params.nuclearConcentration238U - начальная концентрация 235U.
 * @param {number} params.Sf9 - Фактор S9 деления.
 * @param {number} params.secondaryNeutronsPerAbsorption235U - коэффициент размножения нейтронов для 235U.
 * @param {number} params.Sa9 - Фактор S9 поглощения.
 * @param {number} params.fastNeutronReproductionCoefficient - коэффициент размножения быстрых нейтронов.
 * @param {number} params.resonanceEscapeProbability - Вероятность избежать резонансного захвата.
 * @param {number} params.geometricParameter - параметр рассеяния.
 * @param {number} params.thermalNeutronAge - Возраст тепловых нейтронов, в квадратных сантиметрах.
 * @param {number} params.nuclearConcentration235Uby0 - начальная концентрация 238U.
 * @param {number} params.Sa8 - Фактор S8 поглощения.
 * @param {number} params.nuclearConcentration239PUbyZ - концентрация 239Pu в зависимости от z.
 * @returns Время работы реактора в сутках.
 */
export function calculateReactorOperationalDays(params: CalcReactorRuntime) {
    const {
        z,
        Sf5,
        nuclearConcentration235Uby0,
        Sf9,
        secondaryNeutronsPerAbsorption235U,
        Sa9,
        fastNeutronReproductionCoefficient,
        resonanceEscapeProbability,
        geometricParameter,
        thermalNeutronAge,
        nuclearConcentration238U,
        Sa8,
        nuclearConcentration239PUbyZ,
        averageSpecificByVolumePower,
    } = params;

    const term1 = Sf5 * nuclearConcentration235Uby0 * (1 - Math.exp(-z));
    const term2 =
        ((Sf9 * secondaryNeutronsPerAbsorption235U) / (Sf5 * Sa9)) *
        fastNeutronReproductionCoefficient *
        (1 - resonanceEscapeProbability) *
        Math.exp(
            -(geometricParameter * geometricParameter) * thermalNeutronAge,
        );
    const term3 =
        (Sf9 / Sa9) *
        (nuclearConcentration238U * Sa8 * z - nuclearConcentration239PUbyZ);

    const operationalTime =
        (0.351e-18 / averageSpecificByVolumePower) *
        (term1 * (1 + term2) + term3);
    return operationalTime;
}

/**
 * Общий интерфейс для параметров функции.
 */
interface ReactorParameters {
    t: number;
    averageSpecificByVolumePower: number;
}

/**
 * Вычисляет ¯Σ_a^шл (z) на основе времени работы реактора и начальной концентрации нейтронов.
 * @param {ReactorParameters} params - Параметры реактора.
 * @returns Значение ¯Σ_a^шл(z) в см^(-1).
 */
export function calculateAbsorptionSlagCrossSection(
    params: ReactorParameters,
): number {
    const { t, averageSpecificByVolumePower } = params;

    // Вычисляем число пар осколков
    const fragmentPairs = 2.85e18 * averageSpecificByVolumePower * t;

    // Константа для расчёта второго выражения
    const absorptionCrossSection = 50e-24;

    // Возвращаем результат второй функции
    return absorptionCrossSection * fragmentPairs;
}

interface NuclearConcentrationParameters {
    N05_z: number; // Начальная концентрация
    epsilon_U: number; // Объёмная доля урана
}

/**
 * Вычисляет объёмную долю урана.
 * @param {number} V_U - Объём урана.
 * @param {number} V_0 - Общий объём.
 * @returns Объёмная доля урана.
 */
export function calculateEpsilonU(V_U: number, V_0: number): number {
    return V_U / V_0;
}

/**
 * Вычисляет среднюю ядерную концентрацию по гомогенной ячейке.
 * @param {NuclearConcentrationParameters} params - Параметры для вычисления.
 * @returns Средняя ядерная концентрация.
 */
export function calculateMeanNuclearConcentrationU235(
    params: NuclearConcentrationParameters,
): number {
    const { N05_z, epsilon_U } = params;
    return N05_z * epsilon_U;
}

// Вычисление средней ядерной концентрации плутония-239

interface PlutoniumConcentrationParameters {
    N09_z: number; // Начальная концентрация плутония-239
    epsilon_U: number; // Объёмная доля урана
}

/**
 * Вычисляет среднюю ядерную концентрацию плутония-239.
 * @param {PlutoniumConcentrationParameters} params - Параметры для вычисления.
 * @returns Средняя ядерная концентрация плутония-239.
 */
export function calculateMeanPlutoniumConcentration(
    params: PlutoniumConcentrationParameters,
): number {
    const { N09_z, epsilon_U } = params;
    return N09_z * epsilon_U;
}

/**
 * Вычисляет усредненное микроскопическое сечение поглощения ксенона-135.
 * @param {number} neutronGasTemperature -  температура нейтронного газа.
 * @returns Микроскопическое сечение поглощения ксенона-135.
 */
export function calculateMeanXenonAbsorptionCrossSection(
    neutronGasTemperature: number,
): number {
    const sqrtFactor =
        (Math.sqrt(Math.PI) / 2) * Math.sqrt(293 / neutronGasTemperature);
    return MICRO_SIGMA_A_XE135 * sqrtFactor;
}

// Усредненное макроскопическое сечение деления урана-235

interface UraniumFissionCrossSectionParameters {
    meanNuclearConcentrationU235: number; // Концентрация ядер урана-235
    averageFissionCrossSection235U: number; // Усредненное микроскопическое сечение деления урана-235
}

/**
 * Вычисляет усредненное макроскопическое сечение деления урана-235.
 * @param {UraniumFissionCrossSectionParameters} params - Параметры для вычисления.
 * @returns Усредненное макроскопическое сечение деления урана-235.
 */
export function calculateMeanMacroscopicFissionCrossSection(
    params: UraniumFissionCrossSectionParameters,
): number {
    const { meanNuclearConcentrationU235, averageFissionCrossSection235U } =
        params;
    return meanNuclearConcentrationU235 * averageFissionCrossSection235U;
}

// Усредненное макроскопическое сечение поглощения урана-235

interface UraniumAbsorptionCrossSectionParameters {
    meanNuclearConcentrationU235: number; // Концентрация ядер урана-235
    averageAbsorptionCrossSection235U: number; // Усредненное микроскопическое сечение поглощения урана-235
}

/**
 * Вычисляет усредненное макроскопическое сечение поглощения урана-235.
 * @param {UraniumAbsorptionCrossSectionParameters} params - Параметры для вычисления.
 * @returns Усредненное макроскопическое сечение поглощения урана-235.
 */
export function calculateMeanMacroscopicAbsorptionCrossSectionU235(
    params: UraniumAbsorptionCrossSectionParameters,
): number {
    const { meanNuclearConcentrationU235, averageAbsorptionCrossSection235U } =
        params;
    return meanNuclearConcentrationU235 * averageAbsorptionCrossSection235U;
}

// Усредненное макроскопическое сечение поглощения плутония-239

interface PlutoniumAbsorptionCrossSectionParameters {
    meanPlutoniumConcentration: number; // Концентрация ядер плутония-239
    averageAbsorptionCrossSection239Pu: number; // Усредненное микроскопическое сечение поглощения плутония-239
}

/**
 * Вычисляет усредненное макроскопическое сечение поглощения плутония-239.
 * @param {PlutoniumAbsorptionCrossSectionParameters} params - Параметры для вычисления.
 * @returns Усредненное макроскопическое сечение поглощения плутония-239.
 */
export function calculateMeanMacroscopicAbsorptionCrossSectionPu239(
    params: PlutoniumAbsorptionCrossSectionParameters,
): number {
    const { meanPlutoniumConcentration, averageAbsorptionCrossSection239Pu } =
        params;
    return meanPlutoniumConcentration * averageAbsorptionCrossSection239Pu;
}

interface PlutoniumFissionCrossSectionParameters {
    meanPlutoniumConcentration: number;
    averageFissionCrossSection239Pu: number;
}
// Усредненное макроскопическое сечение деления плутония-239
/**
 * Вычисляет усредненное макроскопическое сечение деления плутония-239.
 * @param {PlutoniumFissionCrossSectionParameters} params - Параметры для вычисления.
 * @returns Усредненное макроскопическое сечение деления плутония-239.
 */
export function calculateMeanMacroscopicFissionCrossSectionPu239(
    params: PlutoniumFissionCrossSectionParameters,
): number {
    const { averageFissionCrossSection239Pu, meanPlutoniumConcentration } =
        params;
    return meanPlutoniumConcentration * averageFissionCrossSection239Pu;
}

interface NeutronFluxParameters {
    averageSpecificByVolumePower: number; // N'_0
    meanMacroscopicFissionCrossSection5: number; // ¯Σ_f5(z)
    meanMacroscopicFissionCrossSection9: number; // ¯Σ_f9(z)
}

/**
 * Вычисляет плотность потока нейтронов.
 * @param {NeutronFluxParameters} params - Параметры для вычисления.
 * @returns Плотность потока нейтронов в нейтронах/(см²·с).
 */
export function calculateNeutronFlux(params: NeutronFluxParameters): number {
    const {
        averageSpecificByVolumePower,
        meanMacroscopicFissionCrossSection5,
        meanMacroscopicFissionCrossSection9,
    } = params;
    const numerator = 3.3e13 * averageSpecificByVolumePower;
    const denominator =
        meanMacroscopicFissionCrossSection5 +
        meanMacroscopicFissionCrossSection9;
    return numerator / denominator;
}

interface XenonAbsorptionParameters {
    meanFissionCrossSection5: number; // ¯Σ_f5(z)
    meanFissionCrossSection9: number; // ¯Σ_f9(z)
    neutronFlux: number; // Φ
    meanAbsorptionCrossSectionXe: number; // ¯σ_a^Xe
}

/**
 * Вычисляет равновесное макроскопическое сечение поглощения тепловых нейтронов ксеноном.
 * @param {XenonAbsorptionParameters} params - Параметры для вычисления.
 * @returns Равновесное макроскопическое сечение поглощения ксеноном в см⁻¹.
 */
export function calculateXenonAbsorptionCrossSection(
    params: XenonAbsorptionParameters,
): number {
    const {
        meanFissionCrossSection5,
        meanFissionCrossSection9,
        neutronFlux,
        meanAbsorptionCrossSectionXe,
    } = params;
    const numerator =
        YIELD_PER_FISSION_XE *
        (meanFissionCrossSection5 + meanFissionCrossSection9);
    const denominator =
        1 + DECAY_CONSTANT_XE / (neutronFlux * meanAbsorptionCrossSectionXe);
    return numerator / denominator;
}

interface SamariumAbsorptionParameters {
    meanFissionCrossSection5: number; // ¯Σ_f5(z)
    meanFissionCrossSection9: number; // ¯Σ_f9(z)
}

/**
 * Вычисляет равновесное макроскопическое сечение поглощения тепловых нейтронов самарием.
 * @param {SamariumAbsorptionParameters} params - Параметры для вычисления.
 * @returns Равновесное макроскопическое сечение поглощения самарием в см⁻¹.
 */
export function calculateSamariumAbsorptionCrossSection(
    params: SamariumAbsorptionParameters,
): number {
    const { meanFissionCrossSection5, meanFissionCrossSection9 } = params;
    return (
        YIELD_PER_FISSION_SM *
        (meanFissionCrossSection5 + meanFissionCrossSection9)
    );
}

interface AverageNeutronsParameters {
    meanAbsorptionCrossSection5: number; // ¯Σ_a^5(z)
    meanAbsorptionCrossSection9: number; // ¯Σ_a^9(z)
    secondaryNeutronsPerAbsorption235U: number; // среднее число вторичных нейтронов на акт поглощения ураном-235
    secondaryNeutronsPerAbsorption239Pu: number; // среднее число вторичных нейтронов на акт поглощения плутонием-239
}

/**
 * Вычисляет среднее число вторичных нейтронов на акт поглощения.
 * @param {AverageNeutronsParameters} params - Параметры для вычисления.
 * @returns Среднее число вторичных нейтронов.
 */
export function calculateAverageSecondaryNeutronsPerAbsorption(
    params: AverageNeutronsParameters,
): number {
    const {
        meanAbsorptionCrossSection5,
        meanAbsorptionCrossSection9,
        secondaryNeutronsPerAbsorption239Pu,
        secondaryNeutronsPerAbsorption235U,
    } = params;

    return (
        (secondaryNeutronsPerAbsorption235U * meanAbsorptionCrossSection5 +
            secondaryNeutronsPerAbsorption239Pu * meanAbsorptionCrossSection9) /
        (meanAbsorptionCrossSection5 + meanAbsorptionCrossSection9)
    );
}

interface BlockAbsorptionCrossSectionParameters {
    blockVolume: number; // V_бл
    uraniumVolume: number; // V_U
    initialAbsorptionCrossSection: number; // Σ'_a0
    meanSlagAbsorptionCrossSection: number; // ¯Σ_a^шл(z)
    meanXenonAbsorptionCrossSection: number; // ¯Σ_a^Xe(z)
    meanSamariumAbsorptionCrossSection: number; // ¯Σ_a^Sm(z)
    meanAbsorptionCrossSection9: number; // ¯Σ_a^9(z)
    meanAbsorptionCrossSection5: number; // ¯Σ_a^5(z)
    meanMacroscopicAbsorptionCrossSectionU235By0: number; // ¯Σ_a^5(0)
}

/**
 * Пересчитывает макроскопическое сечение поглощения в блоке.
 * @param {BlockAbsorptionCrossSectionParameters} params - Параметры для вычисления.
 * @returns Пересчитанное макроскопическое сечение поглощения в блоке.
 */
export function calculateBlockAbsorptionCrossSection(
    params: BlockAbsorptionCrossSectionParameters,
): number {
    const {
        blockVolume,
        uraniumVolume,
        initialAbsorptionCrossSection,
        meanSlagAbsorptionCrossSection,
        meanXenonAbsorptionCrossSection,
        meanSamariumAbsorptionCrossSection,
        meanAbsorptionCrossSection9,
        meanAbsorptionCrossSection5,
        meanMacroscopicAbsorptionCrossSectionU235By0,
    } = params;

    const sumCrossSections =
        meanSlagAbsorptionCrossSection +
        meanXenonAbsorptionCrossSection +
        meanSamariumAbsorptionCrossSection +
        meanAbsorptionCrossSection9 +
        meanAbsorptionCrossSection5 -
        meanMacroscopicAbsorptionCrossSectionU235By0;

    return (
        (blockVolume * initialAbsorptionCrossSection +
            uraniumVolume * sumCrossSections) /
        blockVolume
    );
}

interface UraniumTransportCrossSectionParams {
    meanMacroscopicAbsorptionCrossSectionU235: number; // ¯Σ_a^5(z)
    nuclearConcentrationU235: number; // N_5(z)
    cosineTheta5: number; // cosθ_5
}

/**
 * Вычисляет транспортное макроскопическое сечение урана-235.
 * @returns Транспортное макроскопическое сечение урана-235 в см⁻¹.
 */
export function calculateTransportCrossSectionU235(
    params: UraniumTransportCrossSectionParams,
): number {
    const {
        meanMacroscopicAbsorptionCrossSectionU235,
        nuclearConcentrationU235,
        cosineTheta5,
    } = params;

    return (
        meanMacroscopicAbsorptionCrossSectionU235 +
        10 * nuclearConcentrationU235 * (1 - cosineTheta5)
    );
}

interface PlutoniumTransportCrossSectionParams {
    meanMacroscopicAbsorptionCrossSectionPu239: number; // ¯Σ_a^9(z)
    nuclearConcentrationPu239: number; // N_9(z)
    cosineTheta9: number; // cosθ_9
}

/**
 * Вычисляет транспортное макроскопическое сечение плутония-239.
 * @returns Транспортное макроскопическое сечение плутония-239 в см⁻¹.
 */
export function calculateTransportCrossSectionPu239(
    params: PlutoniumTransportCrossSectionParams,
): number {
    const {
        meanMacroscopicAbsorptionCrossSectionPu239,
        nuclearConcentrationPu239,
        cosineTheta9,
    } = params;

    return (
        meanMacroscopicAbsorptionCrossSectionPu239 +
        10 * nuclearConcentrationPu239 * (1 - cosineTheta9)
    );
}

interface TransportCrossSectionParameters {
    meanTransportCrossSectionU5: number; // ¯Σ_tr^5 (z)
    meanTransportCrossSectionPu9: number; // ¯Σ_tr^9 (z)
    meanTransportCrossSectionH2O: number; // Σ_tr of H2O
    meanTransportCrossSection8: number; // Σ_tr of 8
    meanTransportCrossSectionO2: number; // Σ_tr of O
    meanTransportCrossSectionZr: number; // Σ_tr of km
}

export function calculateTotalTransportCrossSection(
    params: TransportCrossSectionParameters,
): number {
    const {
        meanTransportCrossSectionU5,
        meanTransportCrossSectionPu9,
        meanTransportCrossSectionH2O,
        meanTransportCrossSection8,
        meanTransportCrossSectionO2,
        meanTransportCrossSectionZr,
    } = params;

    return (
        meanTransportCrossSectionH2O +
        meanTransportCrossSectionU5 +
        meanTransportCrossSectionPu9 +
        meanTransportCrossSection8 +
        meanTransportCrossSectionO2 +
        meanTransportCrossSectionZr
    );
}

interface AbsorptionCrossSectionParameters {
    meanAbsorptionCrossSectionH2O?: number;
    meanAbsorptionCrossSectionU5: number; // ¯Σ_a^5 (z)
    meanAbsorptionCrossSectionPu9: number; // ¯Σ_a^9 (z)
    meanAbsorptionCrossSection8?: number; // Σ_(a_8 )
    meanAbsorptionCrossSectionO2?: number; // Σ_(a_O)
    meanAbsorptionCrossSectionZr?: number; // Σ_(a_км)
    meanAbsorptionCrossSectionXe: number; // ¯Σ_a^Xe
    meanAbsorptionCrossSectionSm: number; // ¯Σ_a^Sm
    meanAbsorptionCrossSectionMisc: number; // ¯Σ_a^шл (z)
}

// Implement the function to calculate the total absorption cross-section
export function calculateTotalAbsorptionCrossSection(
    params: AbsorptionCrossSectionParameters,
): number {
    const {
        meanAbsorptionCrossSectionH2O = 4.978e-3,
        meanAbsorptionCrossSectionU5,
        meanAbsorptionCrossSectionPu9,
        meanAbsorptionCrossSection8 = 9.24e-3,
        meanAbsorptionCrossSectionO2 = 1.434e-6,
        meanAbsorptionCrossSectionZr = 5.316e-4,
        meanAbsorptionCrossSectionXe,
        meanAbsorptionCrossSectionSm,
        meanAbsorptionCrossSectionMisc,
    } = params;

    return (
        meanAbsorptionCrossSectionH2O +
        meanAbsorptionCrossSectionU5 +
        meanAbsorptionCrossSectionPu9 +
        meanAbsorptionCrossSection8 +
        meanAbsorptionCrossSectionO2 +
        meanAbsorptionCrossSectionZr +
        meanAbsorptionCrossSectionXe +
        meanAbsorptionCrossSectionSm +
        meanAbsorptionCrossSectionMisc
    );
}

/**
 * Интерфейс для ввода параметров, необходимых для вычисления длины диффузии.
 * @interface DiffusionLengthParams
 * @property {number} averageSumAbsorptionCrossSection - Среднее сечение поглощения.
 * @property {number} averageSumTransportCrossSection - Среднее транспортное сечение.
 */
interface DiffusionLengthParams {
    averageSumAbsorptionCrossSection: number;
    averageSumTransportCrossSection: number;
}

/**
 * Вычисляет длину диффузии L(z) на основе заданных параметров.
 *
 * @param {DiffusionLengthParams} params - Объект, содержащий параметры для вычисления.
 * @returns {number} - Вычисленная длина диффузии L(z).
 */
export function calculateDiffusionLength(
    params: DiffusionLengthParams,
): number {
    const {
        averageSumAbsorptionCrossSection,
        averageSumTransportCrossSection,
    } = params;

    return (
        1 /
        (3 * averageSumAbsorptionCrossSection * averageSumTransportCrossSection)
    );
}

/**
 * Параметры для расчета коэффициента использования тепловых нейтронов
 * @interface
 */
interface ThermalNeutronParams {
    /** Объем блока */
    blockVolume: number;
    /** Объем топлива */
    fuelVolume: number;
    /** Макро сечение поглощения U-235 */
    u235MacroAbsorptionCrossSection: number;
    /** Макро сечение поглощения Pu-239 */
    PuMacroAbsorptionCrossSection: number;
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
 * Вычисляет коэффициент использования тепловых нейтронов θ(z) на основе заданных параметров.
 * @param {ThermalNeutronUtilizationParams} params - Объект, содержащий параметры для вычисления.
 * @returns {number} - Вычисленный коэффициент использования тепловых нейтронов θ(z).
 */
export function calculateThermalNeutronUtilization(
    params: ThermalNeutronParams,
): number {
    const {
        blockVolume,
        fuelVolume,
        u235MacroAbsorptionCrossSection,
        PuMacroAbsorptionCrossSection,
        blockMacroAbsorptionCrossSection,
        lossFactor,
        moderatorVolume,
        moderatorMacroAbsorptionCrossSection,
    } = params;

    const numerator =
        blockVolume *
        (u235MacroAbsorptionCrossSection + PuMacroAbsorptionCrossSection);
    const denominator =
        fuelVolume * blockMacroAbsorptionCrossSection +
        lossFactor * moderatorVolume * moderatorMacroAbsorptionCrossSection;

    return numerator / denominator;
}

/**
 * Интерфейс для ввода параметров, необходимых для вычисления коэффициента размножения нейтронов в бесконечной среде.
 *
 * @interface NeutronMultiplicationParams
 * @property {number} k_infinite - Базовый коэффициент размножения нейтронов.
 * @property {number} theta - Коэффициент использования тепловых нейтронов.
 * @property {number} secondaryNeutronsPerAbsorption235UorPu9 - Среднее число вторичных нейтронов от z.
 * @property {number} secondaryNeutrons0PerAbsorption235UorPu9 - Среднее число вторичных нейтронов от 0.
 */
interface NeutronMultiplicationParams {
    k_infinite: number;
    theta: number;
    theta0: number;
    secondaryNeutronsPerAbsorption235UorPu9: number;
    secondaryNeutrons0PerAbsorption235UorPu9: number;
}

/**
 * Вычисляет коэффициент размножения нейтронов в бесконечной среде k_∞ (z/2) на основе заданных параметров.
 *
 * @param {NeutronMultiplicationParams} params - Объект, содержащий параметры для вычисления.
 * @returns {number} - Вычисленный коэффициент размножения нейтронов k_∞ (z/2).
 */
export function calculateNeutronMultiplication(
    params: NeutronMultiplicationParams,
): number {
    const {
        k_infinite,
        theta,
        theta0,
        secondaryNeutronsPerAbsorption235UorPu9,
        secondaryNeutrons0PerAbsorption235UorPu9,
    } = params;

    return (
        k_infinite *
        ((theta * secondaryNeutronsPerAbsorption235UorPu9) /
            (theta0 * secondaryNeutrons0PerAbsorption235UorPu9))
    );
}

/**
 * Интерфейс для ввода параметров, необходимых для вычисления эффективного коэффициента размножения нейтронов.
 *
 * @interface EffectiveNeutronMultiplicationParams
 * @property {number} k_infinite - Коэффициент размножения нейтронов k_∞ (z).
 * @property {number} geometricParameter - Геометрический фактор поглощения.
 * @property {number} thermalNeutronAge - Временной фактор.
 * @property {number} diffusionLength - Мерная длина нейтронного диффузионного расстояния L^2 (z/2).
 */
interface EffectiveNeutronMultiplicationParams {
    k_infinite: number;
    geometricParameter: number;
    thermalNeutronAge: number;
    diffusionLength: number;
}

/**
 * Вычисляет эффективный коэффициент размножения нейтронов k_эф (z/2) на основе заданных параметров.
 *
 * @param {EffectiveNeutronMultiplicationParams} params - Объект, содержащий параметры для вычисления.
 * @returns {number} - Вычисленный эффективный коэффициент размножения нейтронов k_эф (z/2).
 */
export function calculateEffectiveNeutronMultiplication(
    params: EffectiveNeutronMultiplicationParams,
): number {
    const {
        k_infinite,
        geometricParameter,
        thermalNeutronAge,
        diffusionLength,
    } = params;

    return (
        (k_infinite * Math.exp(-geometricParameter * thermalNeutronAge)) /
        (1 + geometricParameter * diffusionLength)
    );
}
