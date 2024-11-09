import { Param, Params } from '@shared/types/param.ts';

/**
 * Интерфейс для параметров расчета коэффициента проигрыша
 */
export interface LossFactorParams extends Params {
    /**
     * Отношение мощностей источников тепловых нейтронов
     * @type {Param}
     */
    powerRatio: Param;

    /**
     * Коэффициент диффузии тепловых нейтронов в блоке
     * @type {Param}
     */
    blockDiffusionCoef: Param;

    /**
     * Обратная длина диффузии тепловых нейтронов в блоке
     * @type {Param}
     */
    blockInverseDiffLength: Param;

    /**
     * Коэффициент диффузии тепловых нейтронов в замедлителе
     * @type {Param}
     */
    moderatorDiffusionCoef: Param;

    /**
     * Обратная длина диффузии тепловых нейтронов в замедлителе
     * @type {Param}
     */
    moderatorInverseDiffLength: Param;

    /**
     * Функция Бесселя I1(α'R1)
     * @type {Param}
     */
    besselI1: Param;

    /**
     * Функция Бесселя I0(α'R1)
     * @type {Param}
     */
    besselI0: Param;

    /**
     * Функция G1 для замедлителя
     * @type {Param}
     */
    moderatorG1: Param;

    /**
     * Функция G0 для замедлителя
     * @type {Param}
     */
    moderatorG0: Param;

    /**
     * Плотность потока для блока
     * @type {Param}
     */
    blockFluxDensity: Param;

    /**
     * Плотность потока для замедлителя
     * @type {Param}
     */
    moderatorFluxDensity: Param;

    /**
     * Коэффициент проигрыша
     * @type {Param}
     */
    lossFactor: Param;

    /**
     * Коэффициент проигрыша по другой методике
     * @type {Param}
     */
    lossFactorOther: Param;
}
