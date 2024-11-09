import { Param, Params } from '@shared/types/param.ts';

/**
 * Интерфейс для параметров двухзонной модели
 */
export interface TwoZoneModelParams extends Params {
    /**
     * Объём ячейки в см^3
     * @type {Param}
     */
    twoZoneCellVolume: Param;

    /**
     * Радиус первой зоны (топливо + газовый зазор) в см
     * @type {Param}
     */
    twoZoneFirstZoneRadius: Param;

    /**
     * Радиус всей двухзонной ячейки в см
     * @type {Param}
     */
    twoZoneTotalRadius: Param;

    /**
     * Объём первой зоны (блока) в см^3
     * @type {Param}
     */
    twoZoneFirstZoneVolume: Param;

    /**
     * Объём второй зоны (замедлителя) в см^3
     * @type {Param}
     */
    twoZoneModeratorVolume: Param;

    /**
     * Макроскопическое сечение поглощения в блоке в см^(-1)
     * @type {Param}
     */
    twoZoneBlockAbsorptionCrossSection: Param;

    /**
     * Транспортное макроскопическое сечение в блоке в см^(-1)
     * @type {Param}
     */
    twoZoneBlockTransportCrossSection: Param;

    /**
     * Макроскопическое сечение поглощения в замедлителе в см^(-1)
     * @type {Param}
     */
    twoZoneModeratorAbsorptionCrossSection: Param;

    /**
     * Транспортное макроскопическое сечение в замедлителе в см^(-1)
     * @type {Param}
     */
    twoZoneModeratorTransportCrossSection: Param;
}
