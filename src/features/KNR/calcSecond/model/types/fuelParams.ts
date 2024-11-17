import { Param, Params } from '@shared/types/param.ts';

/**
 * Интерфейс рассчитанных параметров для ядерного реактора.
 */
export interface FuelParams extends Params {
    /**
     * Масса выгоревшего урана-235 (г).
     */
    depletedUranium235Mass: Param;

    /**
     * Удельный расход горючего (г/МВт∙сут).
     */
    specificFuelConsumption: Param;

    /**
     * Масса загруженного урана-235 в начале кампании (кг).
     */
    initialUranium235Mass: Param;

    /**
     * Масса загруженного урана-238 в начале кампании (кг).
     */
    initialUranium238Mass: Param;

    /**
     * Масса загруженного урана в начале кампании (кг).
     */
    totalInitialUraniumMass: Param;

    /**
     * Обогащение урана (%).
     */
    uraniumEnrichment: Param;

    /**
     * Глубина выгорания топлива за компанию реактора (МВт∙сут/кг).
     */
    fuelBurnupPerCompany: Param;

    /**
     * Глубина выгорания топлива за компанию топлива (МВт∙сут/кг).
     */
    fuelBurnupPerFuelCompany: Param;

    /**
     * Глубина выгорания топлива за год (МВт∙сут/кг).
     */
    fuelBurnupPerYear: Param;

    /**
     * Количество перегрузок.
     */
    numberOfReloads: Param;
}
