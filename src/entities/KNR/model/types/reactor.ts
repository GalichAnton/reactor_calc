import { REACTOR_TYPES } from '@entities/reactor';

/**

 Интерфейс для характеристик прототипа реактора ВВЭР-1000.
 **/
export interface ReactorCharacteristics {
    /**
 Электрическая мощность реактора в мегаваттах.
 @type {number}
 **/
    electricalPower: number;
    /**
 Тепловая мощность реактора в мегаваттах.
 @type {number}
 */
    thermalPower: number;
    /**

 Давление в первом контуре в мегапаскалях.
 @type {number}
 */
    primaryCircuitPressure: number;
    /**

 Температура теплоносителя в Кельвинах.
 @type {number}
 */
    coolantTemperature: number;
    /**

 Обогащение урана в процентах.
 @type {number}
 */
    uraniumEnrichment: number;
    /**

 Энергонапряжённость активной зоны в мегаваттах на кубический метр.
 @type {number}
 */
    corePowerDensity: number;

    /**
 Высота активной зоны в сантиметрах.
 @type {number}
 */
    coreHeight: number;

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
