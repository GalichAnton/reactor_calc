import { Param, Params } from '@shared/types/param.ts';

/**
 * Интерфейс для параметров расчета регулирующих стержней реактора
 */
export interface ControlRodCalculationParams extends Params {
    /**
     * Радиус регулирующего стержня (ПЭЛ)
     * @type {Param}
     * @unit см
     */
    rodRadius: Param;

    /**
     * Макроскопическое транспортное сечение среды
     * @type {Param}
     * @unit см⁻¹
     */
    sigmaTr: Param;

    /**
     * Макроскопическое транспортное сечение стержня
     * @type {Param}
     * @unit см⁻¹
     */
    sigmaTrRod: Param;

    /**
     * Время жизни быстрых нейтронов (τ)
     * @type {Param}
     * @unit см²
     */
    fastNeutronLifetime: Param;

    /**
     * Квадрат длины диффузии (L²)
     * @type {Param}
     * @unit см²
     */
    diffusionLengthSquared: Param;

    /**
     * Геометрический параметр (B²)
     * @type {Param}
     * @unit см⁻²
     */
    geometricParameter: Param;

    /**
     * Диаметр активной зоны
     * @type {Param}
     * @unit см
     */
    coreZoneDiameter: Param;

    /**
     * Температурный эффект реактивности (Δρ)
     * @type {Param}
     * @unit отн.ед.
     */
    temperatureReactivityEffect: Param;

    /**
     * Коэффициент черноты стержня
     * @type {Param}
     * @unit отн.ед.
     */
    rodBlackness: Param;
}
