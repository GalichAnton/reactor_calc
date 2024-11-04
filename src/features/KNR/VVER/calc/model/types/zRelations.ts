export interface ZRelations {
    /**
     * Степень выгорания.
     */
    z: number;

    /**
     * Усреднённое сечение поглощения 235U, в см-1.
     */
    averageAbsorptionMacroCrossSection235U: number; // \({\bar{\sigma}}_{a_5}\)

    /**
     * Усреднённое сечение деления 235U, в см-1.
     */
    averageFissionMacroCrossSection235U: number; // \({\bar{\sigma}}_{f_5}\)

    /**
     * Ядерная концентрация 235U, в см⁻³ методом Румянцева.
     */
    nuclearConcentration235UByRum: number; // \(N_{0_5}\)

    /**
     * Ядерная концентрация 239Pu, в см⁻³ методом Румянцева.
     */
    nuclearConcentration239PuByRum: number; // \(N_{0_9}\)

    /**
     * Ядерная концентрация 235U, в см⁻³ конечно-разностным методом.
     */
    nuclearConcentration235UByKR: number; // \(N_{0_5}\)

    /**
     * Ядерная концентрация 239Pu, в см⁻³ конечно-разностным методом.
     */
    nuclearConcentration239PuByKR: number; // \(N_{0_9}\)

    /**
     * Ядерная концентрация 238U, в см⁻³ конечно-разностным методом.
     */
    nuclearConcentration238UByKR: number; // \(N_{0_9}\)

    /**
     * Ядерная концентрация 235U, в см⁻³ методом Бать.
     */
    nuclearConcentration235UByBat: number; // \(N_{0_5}\)

    /**
     * Ядерная концентрация 239Pu, в см⁻³ методом Бать.
     */
    nuclearConcentration239PuByBat: number; // \(N_{0_9}\)

    /**
     * Усреднённое сечение поглощения 239Pu, в см-1.
     */
    averageAbsorptionMacroCrossSection239Pu: number; // \({\bar{\sigma}}_{a_9}\)

    /**
     * Усреднённое сечение деления 239Pu, в барнах.
     */
    averageFissionMacroCrossSection239Pu: number; // \({\bar{\sigma}}_{f_9}\)

    /**
     * Время работы реактора, в сутках.
     */
    reactorOperationalTime: number; // \(\text{Days}\)

    /**
     * Средняя ядерная концентрация урана-235 по гомогенной ячейке, в см⁻³.
     */
    averageNuclearConcentrationCell235U: number; // \({\bar{N}}_{cell_5}\)

    /**
     * Средняя ядерная концентрация плутония-239 по гомогенной ячейке, в см⁻³.
     */
    averageNuclearConcentrationCell239Pu: number; // \({\bar{N}}_{cell_9}\)

    /**
     * Плотность потока нейтронов, в нейтронах/(см²·с).
     */
    neutronFluxDensity: number; // \(\Phi\)

    /**
     * Коэффициент размножения нейтронов в бесконечной среде.
     */
    infiniteMediumNeutronMultiplicationFactor: number; // \(k_{\infty}\)

    /**
     * Эффективный коэффициент размножения нейтронов.
     */
    effectiveNeutronMultiplicationFactor: number; // \(k_{\text{eff}}\)
}
