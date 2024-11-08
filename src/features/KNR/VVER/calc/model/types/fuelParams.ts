/**
 * Интерфейс рассчитанных параметров для ядерного реактора.
 */
export interface FuelParams {
    /**
     * Масса выгоревшего урана-235 (г).
     */
    depletedUranium235Mass: number;

    /**
     * Удельный расход горючего (г/МВт∙сут).
     */
    specificFuelConsumption: number;

    /**
     * Масса загруженного урана-235 в начале кампании (кг).
     */
    initialUranium235Mass: number;

    /**
     * Масса загруженного урана-238 в начале кампании (кг).
     */
    initialUranium238Mass: number;

    /**
     * Масса загруженного урана в начале кампании (кг).
     */
    totalInitialUraniumMass: number;

    /**
     * Обогащение урана (%).
     */
    uraniumEnrichment: number;

    /**
     * Глубина выгорания топлива за компанию (МВт∙сут/кг).
     */
    fuelBurnupPerCompany: number;

    /**
     * Глубина выгорания топлива за год (МВт∙сут/кг).
     */
    fuelBurnupPerYear: number;

    /**
     * Количество перегрузок.
     */
    numberOfReloads: number;
}
