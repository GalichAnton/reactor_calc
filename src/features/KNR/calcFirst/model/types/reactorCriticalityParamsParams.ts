import { Param, Params } from '@shared/types/param.ts';

/**
 * Интерфейс для параметров расчета критичности реактора
 */
export interface ReactorCriticalityParams extends Params {
    /**
     * Площадь миграции (M²)
     * @type {Param}
     */
    migrationArea: Param;

    /**
     * Материальный параметр (k²)
     * @type {Param}
     * @unit см⁻²
     */
    materialParameter: Param;

    /**
     * Геометрический параметр (B²)
     * @type {Param}
     * @unit см⁻²
     */
    geometricParameter: Param;

    /**
     * Первый корень функции Бесселя (ξ₀)
     * @type {Param}
     */
    besselRoot: Param;

    /**
     * Отношение высоты к диаметру активной зоны (H/D)
     * @type {Param}
     */
    heightToDiameterRatio: Param;

    /**
     * Эффективный коэффициент размножения (kэф)
     * @type {Param}
     */
    kEff: Param;

    /**
     * Реактивность реактора (ρ)
     * @type {Param}
     */
    reactivity: Param;

    /**
     * Высота активной зоны (H)
     * @type {Param}
     * @unit см
     */
    coreHeight: Param;

    /**
     * Диаметр активной зоны (D)
     * @type {Param}
     * @unit см
     */
    coreDiameter: Param;
}
