import { REACTOR_TYPES } from '@entities/reactor';

/**
 Интерфейс для исходных данных
 **/
export interface InitialParams {
    /**
     * Электрическая мощность реактора в мегаваттах.
     * @type {number}
     **/
    electricalPower: number;

    /**
     * Тепловая мощность реактора в мегаваттах.
     * @type {number}
     */
    thermalPower: number;

    /**
     * Давление в первом контуре в мегапаскалях.
     * @type {number}
     */
    primaryCircuitPressure: number;

    /**
     Высота активной зоны в сантиметрах.
     @type {number}
     */
    coreHeight: number;

    /**
     * Температура теплоносителя в Кельвинах.
     * @type {number}
     */
    coolantTemperature: number;

    /**
     * Обогащение урана в процентах.
     * @type {number}
     */
    uraniumEnrichment: number;

    /**
     * Энергонапряжённость активной зоны в мегаваттах на кубический метр.
     * @type {number}
     */
    corePowerDensity: number;

    /**
     * Число ТВЭЛ в ТВС, в штуках.
     * @type {number}
     */
    nTvel: number;

    /**
     * Шаг решетки ТВС, в сантиметрах.
     * @type {number}
     */
    latticePitch: number;

    /**
     * Шаг решетки ТВЭЛ, в сантиметрах.
     * @type {number}
     */
    fuelRodLatticePitch: number;

    /**
     * Размер ТВС «под ключ», в сантиметрах.
     * @type {number}
     */
    assemblySizeAcrossFlats: number;

    /**
     * Радиус топливной таблетки, в сантиметрах.
     * @type {number}
     */
    fuelPelletRadius: number;

    /**
     * Внутренний радиус оболочки ТВЭЛ, в сантиметрах.
     * @type {number}
     */
    claddingInnerRadius: number;

    /**
     * Наружный радиус оболочки ТВЭЛ, в сантиметрах.
     * @type {number}
     */
    claddingOuterRadius: number;

    /**
     * Радиус регулирующего стержня (ПЭЛ), в сантиметрах.
     */
    controlRodRadius: number;

    /**
     * Материал оболочки ТВЭЛ.
     * @type {string}
     */
    claddingMaterial?: string;

    /**
     Тип реактора.
     @type {number}
     */
    reactorType: REACTOR_TYPES;

    /**
     Номинальная электрическая мощность.
     @type {number}
     */
    nominalPower: number | null;
}
