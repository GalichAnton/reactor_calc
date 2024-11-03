/**
 * Интерфейс данных о составе изотопов.
 */
export interface IsotopeComposition {
    /**
     * Начальный коэффициент воспроизводства КВ.
     * Исходное значение коэффициента, характеризующего воспроизводство ядерного топлива в реакторе.
     */
    initialReproductionCoefficient: number;

    /**
     * Фактор S8 поглощения.
     */
    Sa8: number;

    /**
     * Фактор S9 поглощения.
     */
    Sa9: number;

    /**
     * Фактор S5 деления.
     */
    Sf5: number;

    /**
     * Фактор S9 деления.
     */
    Sf9: number;

    /**
     * Усредненное микроскопическое сечение деления плутония-239
     */
    averageFissionCrossSection239Pu: number;

    /**
     * Усредненное микроскопическое сечение поглощения плутония-239
     */
    averageAbsorptionCrossSection239Pu: number;

    /**
     * Средняя удельная мощность, выделяемая в единице объема топлива
     */
    averageSpecificByVolumePower: number;

    /**
     * Число вторичных нейтронов на 1 акт поглощения плутонием-239
     */
    secondaryNeutronsPerAbsorption239Pu: number;
}
