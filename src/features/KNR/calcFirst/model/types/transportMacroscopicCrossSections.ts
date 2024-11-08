import { Param, Params } from '@shared/types/param.ts';

/**
 * Интерфейс для транспортных макроскопических сечений
 */
export interface TransportMacroscopicCrossSections extends Params {
    /**
     * Транспортное макроскопическое сечение H2O в см^(-1)
     * @type {Param}
     */
    transportMacroH2O: Param;

    /**
     * Транспортное макроскопическое сечение U235 в см^(-1)
     * @type {Param}
     */
    transportMacroU235: Param;

    /**
     * Транспортное макроскопическое сечение U238 в см^(-1)
     * @type {Param}
     */
    transportMacroU238: Param;

    /**
     * Транспортное макроскопическое сечение O2 в см^(-1)
     * @type {Param}
     */
    transportMacroO2: Param;

    /**
     * Транспортное макроскопическое сечение Zr в см^(-1)
     * @type {Param}
     */
    transportMacroZr: Param;

    /**
     * Суммарное транспортное макроскопическое сечение в см^(-1)
     * @type {Param}
     */
    transportMacroTotal: Param;

    /**
     * Суммарное транспортное макроскопическое сечение на 1эВ в см^(-1)
     * @type {Param}
     */
    transportMacroTotal1eV: Param;
}
