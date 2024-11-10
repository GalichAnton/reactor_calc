import {
    calculateU235AbsorptionGFactor,
    calculateU235FissionGFactor,
} from '@shared/lib/utils';
import { SetParams } from '@shared/types/param.ts';

import { NeutronGasParams } from '../../../model/types/neutronGasParams.ts';

/**
 * Интерфейс входных параметров для расчета параметров нейтронного газа
 */
interface NeutronGasProps {
    /** Полное макроскопическое сечение поглощения */
    macroSigmaATotal: number;
    /** Температура теплоносителя */
    coolantTemperature: number;
    /** Полная замедляющая способность */
    totalModerationCapacity: number;
}

/**
 * Рассчитывает параметры нейтронного газа
 *
 * @param params - Объект с входными параметрами
 * @returns {Promise<NeutronGasParams>} Объект с рассчитанными параметрами
 * @throws {Error} Ошибка при некорректных входных данных
 */
export const calculateNeutronGasParams = async (
    params: NeutronGasProps,
): Promise<SetParams<NeutronGasParams>> => {
    const { macroSigmaATotal, coolantTemperature, totalModerationCapacity } =
        params;

    try {
        const totalMacroSigmaA =
            macroSigmaATotal * Math.sqrt(293 / coolantTemperature);

        const neutronGasTemperature =
            coolantTemperature *
            (1 + (1.4 * totalMacroSigmaA) / totalModerationCapacity);

        const roundedTemperature = Math.ceil(neutronGasTemperature / 100) * 100;

        const gVeskottFactorA5 = calculateU235AbsorptionGFactor(
            neutronGasTemperature,
        );

        const gVeskottFactorF5 = calculateU235FissionGFactor(
            neutronGasTemperature,
        );

        return {
            totalMacroSigmaA,
            neutronGasTemperature,
            gVeskottFactorA5,
            gVeskottFactorF5,
            roundedTemperature,
        };
    } catch (error) {
        throw new Error(
            `Ошибка при расчете параметров нейтронного газа: ${error}`,
        );
    }
};
