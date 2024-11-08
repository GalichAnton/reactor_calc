/**
 * Параметры элемента для расчета транспортного макроскопического сечения.
 *
 * @interface ElementParameters
 * @property {number} atomicMass - Атомная масса элемента (A).
 * @property {number} microScatteringCrossSection - Микроскопическое сечение рассеяния (σ_s) в барнах.
 * @property {number} macroAverageCrossSection - 〖Σ_a〗_x  – усредненное макроскопическое сечение поглощения компонента.
 * @property {number} concentration - Концентрация ядер (N) в см^(-3).
 */
export interface ElementParameters {
    atomicMass: number;
    microScatteringCrossSection: number;
    macroAverageCrossSection: number;
    concentration: number;
}

/**
 * Рассчитывает транспортное макроскопическое сечение элемента.
 * Учитывает средний косинус угла рассеяния по формуле μ = 2/(3A).
 *
 * @param {ElementParameters} params - Параметры элемента для расчета.
 * @returns {number} Транспортное макроскопическое сечение в см^(-1).
 */
export function calculateTransportMacroSection(
    params: ElementParameters,
): number {
    // Средний косинус угла рассеяния
    const averageCosTheta = 2 / (3 * params.atomicMass);

    // Транспортное макроскопическое сечение
    return (
        params.macroAverageCrossSection +
        params.microScatteringCrossSection *
            params.concentration *
            (1 - averageCosTheta)
    );
}
