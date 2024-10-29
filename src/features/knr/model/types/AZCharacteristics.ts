/**
 * Интерфейс для описания различных физических свойств ядерной установки.
 */
export interface AZCharacteristics {
    /**
     * Объём блока, в кубических сантиметрах.
     */
    blockVolume: number; // Vбл

    /**
     * Объём замедлителя, в кубических сантиметрах.
     */
    moderatorVolume: number; // Vзам

    /**
     * Объём ячейки, в кубических сантиметрах.
     */
    cellVolume: number; // V0

    /**
     * Объём топлива, в кубических сантиметрах.
     */
    fuelVolume: number; // VU

    /**
     * Усреднённое сечение поглощения 238U, в барнах.
     */
    averageAbsorptionCrossSection238U: number; // {\bar{\sigma}}_{a_8}

    /**
     * Усреднённое сечение поглощения 235U, в барнах.
     */
    averageAbsorptionCrossSection235U: number; // {\bar{\sigma}}_{a_5}

    /**
     * Усреднённое сечение деления 235U, в барнах.
     */
    averageFissionCrossSection235U: number; // {\bar{\sigma}}_{f_5}

    /**
     * Ядерная концентрация 235U, в см⁻³.
     */
    nuclearConcentration235U: number; // N05

    /**
     * Ядерная концентрация 238U, в см⁻³.
     */
    nuclearConcentration238U: number; // N08

    /**
     * Транспортное макроскопическое сечение воды H2O, в см⁻¹.
     */
    transportMacroscopicCrossSectionH2O: number; // ΣtrH2O

    /**
     * Транспортное макроскопическое сечение 238U, в см⁻¹.
     */
    transportMacroscopicCrossSection238U: number; // Σtr8

    /**
     * Транспортное макроскопическое сечение кислорода, в см⁻¹.
     */
    transportMacroscopicCrossSectionOxygen: number; // ΣtrO

    /**
     * Транспортное макроскопическое сечение циркония, в см⁻¹.
     */
    transportMacroscopicCrossSectionZirconium: number; // Σtrкм

    /**
     * Суммарное транспортное макроскопическое сечение (1 эВ), в см⁻¹.
     */
    totalTransportMacroscopicCrossSection: number; // Σtr

    /**
     * Макроскопическое сечение поглощения в блоке, в см⁻¹.
     */
    macroscopicAbsorptionCrossSectionBlock: number; // {\Sigma`}_a

    /**
     * Макроскопическое сечение поглощения в замедлителе, в см⁻¹.
     */
    macroscopicAbsorptionCrossSectionModerator: number; // {\Sigma``}_a

    /**
     * Температура нейтронного газа, в градусах Цельсия.
     */
    neutronGasTemperature: number; // Tн

    /**
     * Коэффициент проигрыша.
     */
    reproductionLossCoefficient: number; // d

    /**
     * Коэффициент использования тепловых нейтронов.
     */
    thermalNeutronUtilizationCoefficient: number; // θ

    /**
     * Коэффициент размножения быстрых нейтронов.
     */
    fastNeutronReproductionCoefficient: number; // μ

    /**
     * Вероятность избежать резонансного захвата.
     */
    resonanceEscapeProbability: number; // φ

    /**
     * Число вторичных нейтронов на один акт захвата 235U.
     */
    secondaryNeutronsPerAbsorption235U: number; // \eta_{a5}

    /**
     * Коэффициент размножения нейтронов в бесконечной среде.
     */
    infiniteMediumNeutronMultiplicationCoefficient: number; // k∞

    /**
     * Возраст тепловых нейтронов, в квадратных сантиметрах.
     */
    thermalNeutronAge: number; // τ

    /**
     * Длина диффузии, в сантиметрах.
     */
    diffusionLength: number; // L
}
