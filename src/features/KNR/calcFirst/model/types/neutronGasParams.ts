import { Param, Params } from '@shared/types/param.ts';

/**
 * Интерфейс для параметров нейтронного газа
 */
export interface NeutronGasParams extends Params {
    /**
     * Температура нейтронного газа в K.
     * @type {Param}
     */
    neutronGasTemperature: Param;

    /**
     * Cуммарное макроскопическое сечение поглощения при температуре замедлителя см^-1.
     * @type {Param}
     */
    totalMacroSigmaA: Param;

    /**
     * g-фактор (фактор Весткотта) поглощения U235 в зависимости от температуры.
     * @type {Param}
     */
    gVeskottFactorA5: Param;

    /**
     * g-фактор (фактор Весткотта) деления U235 в зависимости от температуры.
     * @type {Param}
     */
    gVeskottFactorF5: Param;

    /**
     * Округленная температура нейтронного газа в K.
     * @type {Param}
     */
    roundedTemperature: Param;
}
