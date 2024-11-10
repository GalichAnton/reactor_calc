interface NuclearConcentrationPu9ParamsByRum {
    nuclearConcentration238U: number;
    initialNuclearConcentration235U: number;
    Sa8: number;
    Sa9: number;
    z: number;
    fastNeutronReproductionCoefficient: number;
    secondaryNeutronsPerAbsorption235U: number;
    resonanceEscapeProbability: number;
    geometricParameter: number;
    thermalNeutronAge: number;
}

/**
 Вычисляет ядерную концентрацию 239Pu в зависимости от z ядерном реакторе по методу Румянцева.
 @param {Object} params - Объект с параметрами.
 @param {number} params.nuclearConcentration238U - Ядерная концентрация 238U.
 @param {number} params.initialNuclearConcentration235U - Начальная ядерная концентрация 235U.
 @param {number} params.Sa8 - Коррекционный фактор для 238U (S8).
 @param {number} params.Sa9 - Коррекционный фактор для 239Pu (S9).
 @param {number} params.z - глубина выгорания.
 @param {number} params.fastNeutronReproductionCoefficient - Коэффициент воспроизведения быстрых нейтронов.
 @param {number} params.secondaryNeutronsPerAbsorption235U - Количество вторичных нейтронов на одно поглощение 235U.
 @param {number} params.resonanceEscapeProbability - Вероятность избегания резонансного поглощения.
 @param {number} params.geometricParameter - Геометрический параметр.
 @param {number} params.thermalNeutronAge - Возраст тепловых нейтронов.
 @returns {number} Ядерная концентрация 239Pu.
 */
export function calculateNuclearConcentrationPuByRum(
    params: NuclearConcentrationPu9ParamsByRum,
): number {
    const {
        nuclearConcentration238U,
        initialNuclearConcentration235U,
        Sa8,
        Sa9,
        z,
        fastNeutronReproductionCoefficient,
        secondaryNeutronsPerAbsorption235U,
        resonanceEscapeProbability,
        geometricParameter,
        thermalNeutronAge,
    } = params;
    const term1 =
        nuclearConcentration238U * (Sa8 / Sa9) * (1 - Math.exp(-Sa9 * z));
    const term2 =
        ((initialNuclearConcentration235U *
            (fastNeutronReproductionCoefficient *
                secondaryNeutronsPerAbsorption235U *
                (1 - resonanceEscapeProbability) *
                Math.exp(
                    -Math.pow(geometricParameter, 2) * thermalNeutronAge,
                ))) /
            (Sa9 - 1)) *
        (Math.exp(-z) - Math.exp(-Sa9 * z));
    return term1 + term2;
}

/**
 * Вычисляет оставшуюся ядерную концентрацию 235U на основе начальной концентрации по методу Румянцева.
 * @param {number} initialNuclearConcentration235U - Начальная ядерная концентрация 235U, в см⁻³.
 * @param {number} z - глубина выгорания.
 * @returns Результирующая ядерная концентрация 235U при заданных условиях (N05).
 */
export function calculateNuclearConcentrationU5ByRum(
    initialNuclearConcentration235U: number,
    z: number,
): number {
    return initialNuclearConcentration235U * Math.exp(-z);
}

/**
 * Вычисляет оставшуюся ядерную концентрацию 235U на основе начальной концентрации по методу Бать.
 * @param {number} initialNuclearConcentration235U - Начальная ядерная концентрация 235U, в см⁻³.
 * @param {number} z - глубина выгорания.
 * @returns Результирующая ядерная концентрация 235U при заданных условиях (N05).
 */
export function calculateNuclearConcentrationU5ByBat(
    initialNuclearConcentration235U: number,
    z: number,
): number {
    return initialNuclearConcentration235U * Math.exp(-z);
}

interface NuclearConcentrationPu9ParamsByBat {
    averageAbsorptionCrossSection238U: number;
    averageAbsorptionCrossSection235U: number;
    initialNuclearConcentration235U: number;
    averageAbsorptionCrossSection239Pu: number;
    initialNuclearConcentration238U: number;
    initialNuclearConcentration239Pu: number;
    fastNeutronReproductionCoefficient: number;
    resonanceEscapeProbability: number;
    z: number;
}

/**
 Вычисляет ядерную концентрацию 239Pu в зависимости от z ядерном реакторе по методу Бать.
 @param {Object} params - Объект с параметрами.
 @param {number} params.averageAbsorptionCrossSection238U - Усреднённое сечение поглощения 238U.
 @param {number} params.averageAbsorptionCrossSection235U - Усреднённое сечение поглощения 235U.
 @param {number} params.initialNuclearConcentration235U – Начальная ядерная концентрация 235U.
 @param {number} params.averageAbsorptionCrossSection239Pu - Усредненное микроскопическое сечение поглощения плутония-239.
 @param {number} params.averageFissionCrossSection239Pu - Усредненное микроскопическое сечение деления плутония-239.
 @param {number} params.initialNuclearConcentration238U - Начальная ядерная концентрация 238U.
 @param {number} params.initialNuclearConcentration239Pu - Начальная ядерная концентрация 239Pu.
 @param {number} params.fastNeutronReproductionCoefficient - Коэффициент размножения быстрых нейтронов.
 @param {number} params.resonanceEscapeProbability - Вероятность избежать резонансного захвата.
 @param {number} params.z - Глубина выгорания.

 @returns {number} Ядерная концентрация 239Pu.
 */
export function calculateNuclearConcentrationPuByBat(
    params: NuclearConcentrationPu9ParamsByBat,
): number {
    const {
        averageAbsorptionCrossSection235U,
        averageAbsorptionCrossSection238U,
        initialNuclearConcentration235U,
        averageAbsorptionCrossSection239Pu,
        initialNuclearConcentration238U,
        initialNuclearConcentration239Pu,
        fastNeutronReproductionCoefficient,
        resonanceEscapeProbability,
        z,
    } = params;

    const v5 = 2.416;
    const v9 = 2.87;

    const sigma =
        averageAbsorptionCrossSection238U +
        ((v5 *
            averageAbsorptionCrossSection235U *
            initialNuclearConcentration235U +
            v9 *
                averageAbsorptionCrossSection239Pu *
                initialNuclearConcentration239Pu) /
            initialNuclearConcentration238U) *
            fastNeutronReproductionCoefficient *
            (1 - resonanceEscapeProbability);

    if (z === 0) {
        console.group();
        console.log(
            'averageAbsorptionCrossSection238U',
            averageAbsorptionCrossSection238U.toExponential(),
        );
        console.log(
            'averageAbsorptionCrossSection235U',
            averageAbsorptionCrossSection235U.toExponential(),
        );
        console.log(
            'initialNuclearConcentration235U',
            initialNuclearConcentration235U.toExponential(),
        );
        console.log(
            'averageAbsorptionCrossSection239Pu',
            averageAbsorptionCrossSection239Pu.toExponential(),
        );
        console.log(
            'initialNuclearConcentration239Pu',
            initialNuclearConcentration239Pu.toExponential(),
        );
        console.log(
            'initialNuclearConcentration238U',
            initialNuclearConcentration238U.toExponential(),
        );
        console.log(
            'fastNeutronReproductionCoefficient',
            fastNeutronReproductionCoefficient.toExponential(),
        );
        console.log(
            'resonanceEscapeProbability',
            resonanceEscapeProbability.toExponential(),
        );
        console.log('sigma', sigma);
        console.groupEnd();
    }
    return (
        (initialNuclearConcentration239Pu -
            (sigma * initialNuclearConcentration238U) /
                averageAbsorptionCrossSection239Pu) *
            Math.exp(
                (-averageAbsorptionCrossSection239Pu /
                    averageAbsorptionCrossSection235U) *
                    z,
            ) +
        (sigma * initialNuclearConcentration238U) /
            averageAbsorptionCrossSection239Pu
    );
}

/**
 * Вычисляет оставшуюся ядерную концентрацию 235U на основе начальной концентрации по  конечно-разностному методу.
 * @param {number} initialNuclearConcentration235U - Начальная ядерная концентрация 235U, в см⁻³.
 * @param {number} z - глубина выгорания.
 * @returns Результирующая ядерная концентрация 235U при заданных условиях (N05).
 */
export function calculateNuclearConcentrationU5ByKR(
    initialNuclearConcentration235U: number,
    z: number,
): number {
    return initialNuclearConcentration235U * Math.exp(-z);
}

export interface NuclearConcentrationParamsByKR {
    averageAbsorptionCrossSection238U: number;
    averageAbsorptionCrossSection235U: number;
    initialNuclearConcentration235U: number;
    averageAbsorptionCrossSection239Pu: number;
    initialNuclearConcentration238U: number;
    initialNuclearConcentration239Pu: number;
    fastNeutronReproductionCoefficient: number;
    resonanceEscapeProbability: number;
    averageFissionCrossSection239Pu: number;
    averageFissionCrossSection235U: number;
    dz: number;
}

/**
 Вычисляет ядерную концентрацию 239Pu в зависимости от z ядерном реакторе конечно-разностному методу.
 @param {Object} params - Объект с параметрами.
 @param {number} params.averageAbsorptionCrossSection238U - Усреднённое сечение поглощения 238U.
 @param {number} params.averageAbsorptionCrossSection235U - Усреднённое сечение поглощения 235U.
 @param {number} params.initialNuclearConcentration235U – Начальная ядерная концентрация 235U.
 @param {number} params.averageAbsorptionCrossSection239Pu - Усредненное микроскопическое сечение поглощения плутония-239.
 @param {number} params.averageFissionCrossSection239Pu - Усредненное микроскопическое сечение деления плутония-239.
 @param {number} params.initialNuclearConcentration238U - Начальная ядерная концентрация 238U.
 @param {number} params.initialNuclearConcentration239Pu - Начальная ядерная концентрация 239Pu.
 @param {number} params.fastNeutronReproductionCoefficient - Коэффициент размножения быстрых нейтронов.
 @param {number} params.resonanceEscapeProbability - Вероятность избежать резонансного захвата.
 @param {number} params.dz - Шаг глубины выгорания.

 @returns {number} Ядерные концентрации конечно-разностному методу.
 */
export function calculateNuclearConcentrationByKR(
    params: NuclearConcentrationParamsByKR,
): {
    nuclearConcentration239PuByKR: number;
    nuclearConcentration235UByKR: number;
    nuclearConcentration238UByKR: number;
} {
    const {
        averageAbsorptionCrossSection235U,
        averageAbsorptionCrossSection238U,
        averageAbsorptionCrossSection239Pu,
        averageFissionCrossSection239Pu,
        averageFissionCrossSection235U,
        initialNuclearConcentration235U,
        initialNuclearConcentration238U,
        initialNuclearConcentration239Pu,
        fastNeutronReproductionCoefficient,
        resonanceEscapeProbability,
        dz,
    } = params;

    const v5 = 2.416;
    const v9 = 2.87;

    const sigma =
        averageAbsorptionCrossSection238U +
        ((v5 *
            averageFissionCrossSection235U *
            initialNuclearConcentration235U +
            v9 *
                averageFissionCrossSection239Pu *
                initialNuclearConcentration239Pu) /
            initialNuclearConcentration238U) *
            fastNeutronReproductionCoefficient *
            (1 - resonanceEscapeProbability);

    const nuclearConcentration235UByKR =
        initialNuclearConcentration235U * (1 - dz);

    const nuclearConcentration238UByKR =
        initialNuclearConcentration238U *
        (1 - (sigma / averageAbsorptionCrossSection235U) * dz);

    const nuclearConcentration239PuByKR =
        initialNuclearConcentration239Pu *
            (1 -
                (averageAbsorptionCrossSection239Pu /
                    averageAbsorptionCrossSection235U) *
                    dz) +
        (sigma / averageAbsorptionCrossSection235U) *
            nuclearConcentration238UByKR *
            dz;

    return {
        nuclearConcentration235UByKR,
        nuclearConcentration239PuByKR,
        nuclearConcentration238UByKR,
    };
}
