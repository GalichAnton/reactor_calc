import { Param, Params } from '@shared/types/param.ts';

/**
 * Интерфейс для параметров расчета длины диффузии и возраста тепловых нейтронов
 */
export interface NeutronDiffusionAgeParams extends Params {
    /**
     * Квадрат длины диффузии, см^2
     * @type {Param}
     */
    diffusionLengthSquared: Param;

    /**
     * Эквивалентный объем урана, см^3
     * @type {Param}
     */
    uraniumEquivalentVolume: Param;

    /**
     * Возраст тепловых нейтронов, см^2
     * @type {Param}
     */
    neutronAge: Param;

    /**
     * Отношение объемов по которому находим z
     * @type {Param}
     */
    Vrel: Param;

    /**
     * Параметр z
     * @type {Param}
     */
    z: Param;
}
