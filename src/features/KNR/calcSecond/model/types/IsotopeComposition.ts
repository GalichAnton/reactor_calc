import { Param, Params } from '@shared/types/param.ts';

/**
 * Интерфейс данных о составе изотопов.
 */
export interface IsotopeComposition extends Params {
    /**
     * Начальный коэффициент воспроизводства КВ.
     * Исходное значение коэффициента, характеризующего воспроизводство ядерного топлива в реакторе.
     */
    initialReproductionCoefficient: Param;

    /**
     * Фактор S8 поглощения.
     */
    Sa8: Param;

    /**
     * Фактор S9 поглощения.
     */
    Sa9: Param;

    /**
     * Фактор S5 деления.
     */
    Sf5: Param;

    /**
     * Фактор S9 деления.
     */
    Sf9: Param;

    /**
     * Усредненное микроскопическое сечение деления плутония-239
     */
    averageFissionCrossSection239Pu: Param;

    /**
     * Усредненное микроскопическое сечение поглощения плутония-239
     */
    averageAbsorptionCrossSection239Pu: Param;

    /**
     * Средняя удельная мощность, выделяемая в единице объема топлива
     */
    averageSpecificByVolumePower: Param;

    /**
     * Число вторичных нейтронов на 1 акт поглощения плутонием-239
     */
    secondaryNeutronsPerAbsorption239Pu: Param;
}
