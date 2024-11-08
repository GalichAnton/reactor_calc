import { Param, Params } from '@shared/types/param.ts';

/**
 * Интерфейс для усредненных микроскопических сечений
 */
export interface AveragedCrossSections extends Params {
    // Микроскопические сечения
    /**
     * Усредненное микроскопическое сечение деления U235 в см^2
     * @type {Param}
     */
    averagedMicroFU5: Param;

    /**
     * Усредненное микроскопическое сечение поглощения U235 в см^2
     * @type {Param}
     */
    averagedMicroAU5: Param;

    /**
     * Усредненное микроскопическое сечение поглощения U238 в см^2
     * @type {Param}
     */
    averagedMicroAU8: Param;

    /**
     * Усредненное микроскопическое сечение поглощения кислорода O2 в см^2
     * @type {Param}
     */
    averagedMicroAO2: Param;

    /**
     * Усредненное микроскопическое сечение поглощения воды H2O в см^2
     * @type {Param}
     */
    averagedMicroAH2O: Param;

    /**
     * Усредненное микроскопическое сечение поглощения циркония Zr в см^2
     * @type {Param}
     */
    averagedMicroAZr: Param;

    // Макроскопические сечения
    /**
     * Усредненное макроскопическое сечение деления U235 в см^(-1)
     * @type {Param}
     */
    averagedMacroFU5: Param;

    /**
     * Усредненное макроскопическое сечение поглощения U235 в см^(-1)
     * @type {Param}
     */
    averagedMacroAU5: Param;

    /**
     * Усредненное макроскопическое сечение поглощения U238 в см^(-1)
     * @type {Param}
     */
    averagedMacroAU8: Param;

    /**
     * Усредненное макроскопическое сечение поглощения кислорода O2 в см^(-1)
     * @type {Param}
     */
    averagedMacroAO2: Param;

    /**
     * Усредненное макроскопическое сечение поглощения воды H2O в см^(-1)
     * @type {Param}
     */
    averagedMacroAH2O: Param;

    /**
     * Усредненное макроскопическое сечение поглощения циркония Zr в см^(-1)
     * @type {Param}
     */
    averagedMacroAZr: Param;

    /**
     * Суммарное усредненное макроскопическое сечение поглощения в см^(-1)
     * @type {Param}
     */
    averagedMacroATotal: Param;
}
