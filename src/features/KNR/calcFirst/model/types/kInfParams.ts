import { Param, Params } from '@shared/types/param.ts';

/**
 * Интерфейс для параметров расчета коэффициента размножения нейтронов
 */
export interface KInfParams extends Params {
    /**
     * Температура урана в Кельвинах
     * @type {Param}
     */
    uraniumTemperature: Param;

    /**
     * Коэффициент использования тепловых нейтронов (безразмерный)
     * @type {Param}
     */
    thermalUtilization: Param;

    /**
     * Число вторичных нейтронов на один акт захвата ураном-235
     * @type {Param}
     */
    reproductionFactor: Param;

    /**
     * Объём воды, приведённый к нормальной плотности, см^3
     * @type {Param}
     */
    normalizedWaterVolume: Param;

    /**
     * Объём урана, приведённый к нормальной плотности, см^3
     * @type {Param}
     */
    normalizedUraniumVolume: Param;

    /**
     * Коэффициент размножения на быстрых нейтронах
     * @type {Param}
     */
    fastFissionFactor: Param;

    /**
     * Усреднённая хорда ТВЭЛ, см
     * @type {Param}
     */
    averageChord: Param;

    /**
     * Вероятность избежать резонансного захвата
     * @type {Param}
     */
    resonanceEscapeProbability: Param;

    /**
     * Коэффициент размножения в бесконечной среде
     * @type {Param}
     */
    infiniteMultiplicationFactor: Param;
}
