import { SetParams } from '@shared/types/param.ts';

import { ReactorCriticalityParams } from '../../../model/types/reactorCriticalityParamsParams.ts';

/**
 * Интерфейс входных параметров для расчета критичности реактора
 */
interface ReactorCriticalityProps {
    /** Коэффициент размножения в бесконечной среде */
    infiniteMultiplicationFactor: number;
    /** Квадрат длины диффузии (см²) */
    diffusionLengthSquared: number;
    /** Возраст нейтронов (см²) */
    neutronAge: number;
}

/**
 * Рассчитывает параметры критичности ядерного реактора
 *
 * @param params Входные параметры для расчета
 * @returns {Promise<ReactorCriticalityParams>} Объект с рассчитанными параметрами критичности
 * @throws {Error} Ошибка при некорректных входных данных
 */
export const calculateReactorCriticality = async (
    params: ReactorCriticalityProps,
): Promise<SetParams<ReactorCriticalityParams>> => {
    const { infiniteMultiplicationFactor, diffusionLengthSquared, neutronAge } =
        params;

    try {
        const migrationArea =
            diffusionLengthSquared + infiniteMultiplicationFactor * neutronAge;

        const geometricParameter =
            (infiniteMultiplicationFactor - 1) / migrationArea;

        const materialParameter = geometricParameter;

        const besselRoot = 2.405;
        const heightToDiameterRatio = 0.92;

        const coreHeight = Math.sqrt(
            (Math.pow(Math.PI, 2) +
                Math.pow(heightToDiameterRatio, 2) * Math.pow(besselRoot, 2)) /
                materialParameter,
        );

        const coreDiameter = coreHeight / heightToDiameterRatio;

        const kEff =
            infiniteMultiplicationFactor *
            (1 / (1 + materialParameter * migrationArea));

        const reactivity = (kEff - 1) / kEff;

        return {
            reactivity,
            migrationArea,
            kEff,
            materialParameter,
            geometricParameter,
            besselRoot,
            heightToDiameterRatio,
            coreHeight,
            coreDiameter,
        };
    } catch (error) {
        throw new Error(
            `Ошибка при расчете параметров критичности реактора: ${error}`,
        );
    }
};
