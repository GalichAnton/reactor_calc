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
     * Ядерная концентрация 235U, в см⁻³.
     */
    nuclearConcentration235U: number; // \(N_{0_5}\)

    /**
     * Усреднённое сечение поглощения 239Pu, в см-1.
     */
    averageAbsorptionMacroCrossSection239Pu: number; // \({\bar{\sigma}}_{a_9}\)

    /**
     * Усреднённое сечение деления 239Pu, в барнах.
     */
    averageFissionMacroCrossSection239Pu: number; // \({\bar{\sigma}}_{f_9}\)

    /**
     * Ядерная концентрация 239Pu, в см⁻³.
     */
    nuclearConcentration239Pu: number; // \(N_{0_9}\)

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
