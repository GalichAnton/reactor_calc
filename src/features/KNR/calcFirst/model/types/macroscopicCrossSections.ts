import { Param, Params } from '@shared/types/param.ts';

/**
 * Интерфейс для макроскопических сечений поглощения
 */
export interface MacroscopicCrossSections extends Params {
    /**
     * Макроскопическое сечение поглощения U235 в см^(-1).
     * Σ_a5 = σ_a5 * N_5
     * @type {Param}
     */
    macroSigmaA5: Param;

    /**
     * Макроскопическое сечение поглощения U238 в см^(-1).
     * Σ_a8 = σ_a8 * N_8
     * @type {Param}
     */
    macroSigmaA8: Param;

    /**
     * Макроскопическое сечение поглощения конструкционного материала (Zr) в см^(-1).
     * Σ_aZr = σ_(aZr+1%Nb) * N_Zr
     * @type {Param}
     */
    macroSigmaAZr: Param;

    /**
     * Макроскопическое сечение поглощения кислорода O2 в см^(-1).
     * Σ_aO2 = σ_aO2 * N_O2
     * @type {Param}
     */
    macroSigmaAO2: Param;

    /**
     * Макроскопическое сечение поглощения воды H2O в см^(-1).
     * Σ_aH2O = σ_aH2O * N_H2O
     * @type {Param}
     */
    macroSigmaAH2O: Param;

    /**
     * Суммарное макроскопическое сечение поглощения в см^(-1).
     * Σ_aΣ = Σ_a5 + Σ_a8 + Σ_aZr + Σ_aO2 + Σ_aH2O
     * @type {Param}
     */
    macroSigmaATotal: Param;
}
