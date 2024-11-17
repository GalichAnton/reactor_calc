import { ZRelations } from '@features/KNR/calcSecond';
import { findClosestToTarget } from '@shared/lib/utils';

/**
 * Интерфейс входных параметров для расчета параметров кампании
 */
interface CalcCompanyParamsProps {
    /** Параметры изотопов */
    isotopesParams: {
        /** Параметр Sf5 */
        Sf5: number;
        /** Средняя удельная объемная мощность */
        averageSpecificByVolumePower: number;
    };
    /** Высота Аз см */
    coreHeight: number;
    /** Количество твэл шт */
    nTvel: number;
    /** Количество твс шт */
    nTvs: number;
    /** Объем урана */
    V_U: number;
    /** Параметры Z-отношений */
    zRelationsParams: ZRelations[];
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
    otr: {
        z: number;
        k_ef: number;
        reactorOperationalTime: number;
        reactivity: number;
    };
    fuelCompany: {
        z: number;
        k_ef: number;
        reactorOperationalTime: number;
        reactivity: number;
    };
    zero: {
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

        //Расчет при отравлении реактора
        const slagParams = findClosestToTarget(values.k_ef, values.z, 1e-24);
        const z_slag = slagParams.y;
        const slagKef = slagParams.x;
        const slagIndex = slagParams.index;
        const slagReactivity = values.reactivity[slagIndex];
        const slagReactorTime = values.reactorOperationalTime[slagIndex];
        // Расчет dN5 и времени без плутония
        const dN5 = Math.abs(
            zRelationsParams[0].nuclearConcentration235UByRum -
                zRelationsParams[companyIndex].nuclearConcentration235UByRum,
        );

        const tWithoutPu =
            (dN5 * isotopesParams.Sf5) /
            (2.85 * 1e18 * isotopesParams.averageSpecificByVolumePower);

        // Расчет средних параметров
        const middleParams = findClosestToTarget(
            values.k_ef,
            values.z,
            z_company / 2,
        );
        const middleZ = middleParams.y;
        const middleIndex = middleParams.index;
        const middleKef = values.k_ef[middleIndex];
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

        const fuelCompanyKefCalc = 1 - (slagKef - 1);
        const fuelCompany = findClosestToTarget(
            values.z,
            values.k_ef,
            fuelCompanyKefCalc,
        );
        const fuelCompanyZ = fuelCompany.x;
        const fuelCompanyKef = fuelCompany.y;
        const fuelCompanyIndex = fuelCompany.index;
        const fuelCompanyReactivity = values.reactivity[fuelCompanyIndex];
        const fuelCompanyReactorOperTime =
            values.reactorOperationalTime[fuelCompanyIndex];

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
                otr: {
                    z: z_slag,
                    reactorOperationalTime: slagReactorTime,
                    k_ef: slagKef,
                    reactivity: slagReactivity,
                },
                fuelCompany: {
                    k_ef: fuelCompanyKef,
                    z: fuelCompanyZ,
                    reactorOperationalTime: fuelCompanyReactorOperTime,
                    reactivity: fuelCompanyReactivity,
                },
                zero: {
                    k_ef: values.k_ef[0],
                    reactivity: values.reactivity[0],
                    reactorOperationalTime: values.reactorOperationalTime[0],
                    z: values.z[0],
                },
            },
            dN5,
        };
    } catch (error) {
        throw new Error(`Ошибка при расчете параметров кампании: ${error}`);
    }
};
