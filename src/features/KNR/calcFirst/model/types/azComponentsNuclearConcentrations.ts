import { Param, Params } from '@shared/types/param.ts';

/**
 * Интерфейс для ядерных концентраций.
 */
export interface AzComponentsNuclearConcentrations extends Params {
    /**
     * Ядерная концентрация топлива UO2 в см^(-3).
     * @type {Param}
     */
    N_0U: Param;

    /**
     * Ядерная концентрация U235 в см^(-3).
     * @type {Param}
     */
    N_05: Param;

    /**
     * Ядерная концентрация U238 в см^(-3).
     * @type {Param}
     */
    N_08: Param;

    /**
     * Ядерная концентрация кислорода O2 в см^(-3).
     * @type {Param}
     */
    N_0O2: Param;

    /**
     * Ядерная концентрация воды H2O в см^(-3).
     * @type {Param}
     */
    N_0H2O: Param;

    /**
     * Ядерная концентрация циркония Zr в см^(-3).
     * @type {Param}
     */
    N_0Zr: Param;

    /**
     * Средняя ядерная концентрация U235 по гомогенной ячейке в см^(-3).
     * @type {Param}
     */
    averageN_5: Param;

    /**
     * Средняя ядерная концентрация U238 по гомогенной ячейке в см^(-3).
     * @type {Param}
     */
    averageN_8: Param;

    /**
     * Средняя ядерная концентрация кислорода O2 по гомогенной ячейке в см^(-3).
     * @type {Param}
     */
    averageN_O2: Param;

    /**
     * Средняя ядерная концентрация воды H2O по гомогенной ячейке в см^(-3).
     * @type {Param}
     */
    averageN_H2O: Param;

    /**
     * Средняя ядерная концентрация циркония Zr по гомогенной ячейке в см^(-3).
     * @type {Param}
     */
    averageN_Zr: Param;
}
