/**
 * Интерфейс для описания характеристик кассеты ТВС.
 */
export interface TVS {
    /**
     * Число ТВЭЛ в ТВС, в штуках.
     */
    ntvel: number;

    /**
     * Шаг решетки ТВС, в сантиметрах.
     */
    latticePitch: number;

    /**
     * Радиус топливной таблетки, в сантиметрах.
     */
    fuelPelletRadius: number;

    /**
     * Внутренний радиус оболочки ТВЭЛ, в сантиметрах.
     */
    innerCladdingRadius: number;

    /**
     * Наружный радиус оболочки ТВЭЛ, в сантиметрах.
     */
    outerCladdingRadius: number;

    /**
     * Радиус регулирующего стержня (ПЭЛ), в сантиметрах.
     */
    controlRodRadius: number;

    /**
     * Материал оболочки ТВЭЛ.
     */
    claddingMaterial: string;
}
