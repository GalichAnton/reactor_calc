import { findClosestToTarget } from '@shared/lib/utils';

/**
 * Интерфейс входных параметров для расчета параметров кампании
 */
interface CalcCompanyParamsProps {
    /** Параметры изотопов */
    isotopesParams: {
        /** Параметр Sf5 */
        Sf5: { value: number };
        /** Средняя удельная объемная мощность */
        averageSpecificByVolumePower: { value: number };
    };
    /** Параметры Z-отношений */
    zRelationsParams: Array<{
        reactorOperationalTime: number;
        effectiveNeutronMultiplicationFactor: number;
        z: number;
        reactivity: number;
        nuclearConcentration235UByKR: number;
    }>;
}

/**
 * Интерфейс для накопления значений при обработке данных
 */
interface CompanyValues {
    reactorOperationalTime: number[];
    k_ef: number[];
    z: number[];
    reactivity: number[];
}

/**
 * Интерфейс возвращаемых параметров кампании
 */
interface CompanyParamsResult {
    company: {
        z: number;
        k_ef: number;
        reactorOperationalTime: number;
        reactivity: number;
    };
    year: {
        z: number;
        reactorOperationalTime: number;
        k_ef: number;
        reactivity: number;
    };
    withoutPu: {
        z: number;
        k_ef: number;
        reactorOperationalTime: number;
    };
    middle: {
        z: number;
        k_ef: number;
        reactorOperationalTime: number;
        reactivity: number;
    };
}

/**
 * Рассчитывает параметры кампании ядерного реактора
 *
 * @param {CalcCompanyParamsProps} params - Входные параметры для расчета
 * @returns {Promise<{params: CompanyParamsResult, dN5: number}>} Объект с результатами расчета
 * @throws {Error} Ошибка при некорректных входных данных
 */
export const calculateCompanyParams = async (
    params: CalcCompanyParamsProps,
): Promise<{ params: CompanyParamsResult; dN5: number }> => {
    try {
        const { isotopesParams, zRelationsParams } = params;

        if (!zRelationsParams) {
            throw new Error('Отсутствуют параметры Z-отношений');
        }

        // Накопление значений из zRelationsParams
        const values = zRelationsParams.reduce<CompanyValues>(
            (acc, p) => {
                acc.reactorOperationalTime.push(p.reactorOperationalTime);
                acc.k_ef.push(p.effectiveNeutronMultiplicationFactor);
                acc.z.push(p.z);
                acc.reactivity.push(p.reactivity);
                return acc;
            },
            { reactorOperationalTime: [], k_ef: [], z: [], reactivity: [] },
        );

        // Расчет годовых параметров
        const yearParams = findClosestToTarget(
            values.z,
            values.reactorOperationalTime,
            365,
        );
        const z_year = yearParams.x;
        const reactorOperationalTimeYear = yearParams.y;
        const yearIndex = yearParams.index;
        const reactivityYear = values.reactivity[yearIndex];

        // Расчет параметров кампании
        const companyParams = findClosestToTarget(values.z, values.k_ef);
        const z_company = companyParams.x;
        const companyKef = companyParams.y;
        const companyIndex = companyParams.index;
        const companyReactivity = values.reactivity[companyIndex];

        // Расчет dN5 и времени без плутония
        const dN5 = Math.abs(
            zRelationsParams[0].nuclearConcentration235UByKR -
                zRelationsParams[companyIndex].nuclearConcentration235UByKR,
        );

        const tWithoutPu =
            (dN5 * isotopesParams.Sf5.value) /
            (2.85 * 1e18 * isotopesParams.averageSpecificByVolumePower.value);

        // Расчет средних параметров
        const middleParams = findClosestToTarget(
            values.k_ef,
            values.z,
            z_company / 2,
        );
        const middleKef = middleParams.x;
        const middleZ = middleParams.y;
        const middleIndex = middleParams.index;
        const middleReactivity = values.reactivity[middleIndex];

        // Расчет параметров без плутония
        const withoutPuParams = findClosestToTarget(
            values.z,
            values.reactorOperationalTime,
            tWithoutPu,
        );
        const z_companyWithoutPu = withoutPuParams.x;
        const indexWithoutPu = withoutPuParams.index;

        const companyTime = values.reactorOperationalTime[companyIndex] || 0;
        const middleTime = values.reactorOperationalTime[middleIndex] || 0;

        // Формирование результата
        return {
            params: {
                company: {
                    z: z_company,
                    k_ef: companyKef,
                    reactorOperationalTime: companyTime,
                    reactivity: companyReactivity,
                },
                year: {
                    z: z_year,
                    reactorOperationalTime: reactorOperationalTimeYear,
                    k_ef: values.k_ef[yearIndex] || 0,
                    reactivity: reactivityYear,
                },
                withoutPu: {
                    z: z_companyWithoutPu,
                    k_ef: values.k_ef[indexWithoutPu] || 0,
                    reactorOperationalTime: tWithoutPu,
                },
                middle: {
                    z: middleZ,
                    k_ef: middleKef,
                    reactorOperationalTime: middleTime,
                    reactivity: middleReactivity,
                },
            },
            dN5,
        };
    } catch (error) {
        throw new Error(`Ошибка при расчете параметров кампании: ${error}`);
    }
};
