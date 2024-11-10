import { IsotopeComposition } from '@features/KNR/calcSecond/model/types/IsotopeComposition.ts';
import { SetParams } from '@shared/types/param.ts';

import {
    calcAverageAbsorptionCrossSection239Pu,
    calcAverageFissionCrossSection239Pu,
    calcAverageSpecificByVolumePower,
    calcSecondaryNeutronsPerAbsorption239Pu,
    calculateReproductionCoefficient,
    calculateSa8,
    calculateSa9,
    calculateSf8,
    calculateSf9,
} from './helpers.ts';

/**
 * Интерфейс входных параметров для расчета изотопных свойств
 */
interface IsotopeCompositionProps {
    /** Тепловая мощность реактора (МВт) */
    thermalPower: number;
    /** Высота активной зоны (см) */
    coreHeight: number;
    /** Количество твэлов в ТВС */
    nTvel: number;
    /** Объем топлива (см³) */
    fuelVolume: number;
    /** Геометрический параметр */
    geometricParameter: number;
    /** Количество ТВС */
    numFuelAssemblies: number;
    /** Возраст нейтронов (см²) */
    neutronAge: number;
    /** Вероятность избежать резонансного захвата */
    resonanceEscapeProbability: number;
    /** Коэффициент размножения на быстрых нейтронах */
    fastFissionFactor: number;
    /** Коэффициент воспроизводства */
    reproductionFactor: number;
    /** Усредненное микросечение поглощения U-235 */
    averagedMicroAU5: number;
    /** Усредненное микросечение поглощения U-238 */
    averagedMicroAU8: number;
    /** Усредненное микросечение деления U-235 */
    averagedMicroFU5: number;
    /** Ядерная концентрация U-238 */
    N_08: number;
    /** Ядерная концентрация U-235 */
    N_05: number;
    /** Температура нейтронного газа (К) */
    neutronGasTemperature: number;
}

/**
 * Рассчитывает изотопные свойства топлива ядерного реактора
 *
 * @param {IsotopeCompositionProps} params - Входные параметры для расчета
 * @returns {Promise<IsotopeCompositionResult>} Объект с рассчитанными изотопными свойствами
 * @throws {Error} Ошибка при некорректных входных данных
 */
export const calculateIsotopeComposition = async (
    params: IsotopeCompositionProps,
): Promise<SetParams<IsotopeComposition>> => {
    try {
        const {
            thermalPower,
            coreHeight,
            nTvel,
            fuelVolume,
            geometricParameter,
            numFuelAssemblies,
            neutronAge,
            resonanceEscapeProbability,
            reproductionFactor,
            fastFissionFactor,
            averagedMicroAU5,
            averagedMicroAU8,
            averagedMicroFU5,
            N_08,
            N_05,
            neutronGasTemperature,
        } = params;

        const initialReproductionCoefficient = calculateReproductionCoefficient(
            {
                geometricParameter,
                thermalNeutronAge: neutronAge,
                nuclearConcentration235U: N_05,
                nuclearConcentration238U: N_08,
                secondaryNeutronsPerAbsorption235U: reproductionFactor,
                averageAbsorptionCrossSection238U: averagedMicroAU8,
                averageAbsorptionCrossSection235U: averagedMicroAU5,
                fastNeutronReproductionCoefficient: fastFissionFactor,
                resonanceEscapeProbability,
            },
        );

        const Sa8 = calculateSa8(averagedMicroAU8, averagedMicroAU5);

        const averageFissionCrossSection239Pu =
            calcAverageFissionCrossSection239Pu(neutronGasTemperature);

        const averageAbsorptionCrossSection239Pu =
            calcAverageAbsorptionCrossSection239Pu(neutronGasTemperature);

        const secondaryNeutronsPerAbsorption239Pu =
            calcSecondaryNeutronsPerAbsorption239Pu(
                averageFissionCrossSection239Pu,
                averageAbsorptionCrossSection239Pu,
            );

        const Sf5 = calculateSf8(averagedMicroFU5, averagedMicroAU5);
        const Sf9 = calculateSf9(
            averageFissionCrossSection239Pu,
            averagedMicroAU5,
        );

        const Sa9 = calculateSa9({
            averageAbsorptionCrossSection239Pu,
            averageAbsorptionCrossSection235U: averagedMicroAU5,
            secondaryNeutronsPerAbsorption239Pu,
            geometricParameter,
            resonanceEscapeProbability,
            fastNeutronReproductionCoefficient: fastFissionFactor,
            thermalNeutronAge: neutronAge,
        });

        const averageSpecificByVolumePower = calcAverageSpecificByVolumePower(
            thermalPower,
            fuelVolume,
            coreHeight,
            numFuelAssemblies,
            nTvel,
        );

        return {
            initialReproductionCoefficient,
            Sa8,
            Sa9,
            Sf9,
            Sf5,
            secondaryNeutronsPerAbsorption239Pu,
            averageFissionCrossSection239Pu,
            averageAbsorptionCrossSection239Pu,
            averageSpecificByVolumePower,
        };
    } catch (error) {
        throw new Error(`Ошибка при расчете изотопных свойств: ${error}`);
    }
};
