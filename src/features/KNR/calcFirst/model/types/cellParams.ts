import { Param } from '@shared/types/param.ts';

/**
 * Интерфейс для параметров ячейки реактора
 */
export interface CellParams extends Record<string, Param> {
    /**
     * Объем ячейки в кубических сантиметрах см^3.
     * @type {Param}
     */
    cellVolume: Param;

    /**
     * Объем топлива в кубических сантиметрах см^3.
     * @type {Param}
     */
    fuelVolume: Param;

    /**
     * Площадь топлива в квадратных сантиметрах см^2.
     * @type {Param}
     */
    fuelArea: Param;

    /**
     * Объем оболочек ТВЭЛ в кубических сантиметрах см^3.
     * @type {Param}
     */
    claddingVolume: Param;

    /**
     * Объем воды в кубических сантиметрах см^3.
     * @type {Param}
     */
    waterVolume: Param;

    /**
     * Объемная доля топлива.
     * @type {Param}
     */
    fuelFraction: Param;

    /**
     * Объемная доля конструкционного материала (циркония Zr).
     * @type {Param}
     */
    zirconiumFraction: Param;

    /**
     * Объемная доля воды H2O.
     * @type {Param}
     */
    waterFraction: Param;
}
