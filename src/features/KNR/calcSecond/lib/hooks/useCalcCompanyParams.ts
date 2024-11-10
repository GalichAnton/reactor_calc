import { useCompanyParamsStore } from '@features/KNR/calcSecond';
import { useZRelationsStore } from '@features/KNR/calcSecond';
import { findClosestToTarget } from '@shared/lib/utils';

import { useIsotopeCompositionStore } from '../../model/store/isotopeCompositionStore.ts';

type CompanyValues = {
    reactorOperationalTime: number[];
    k_ef: number[];
    z: number[];
    reactivity: number[];
};

export const useCalcCompanyParams = () => {
    const { setCompanyParams } = useCompanyParamsStore();

    const computeCompanyParams = async () => {
        try {
            const {
                isotopesParams: { Sf5, averageSpecificByVolumePower },
            } = useIsotopeCompositionStore.getState();

            const { zRelationsParams } = useZRelationsStore.getState();

            if (!zRelationsParams) {
                return;
            }

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

            const yearParams = findClosestToTarget(
                values.z,
                values.reactorOperationalTime,
                365,
            );
            const z_year = yearParams.x;
            const reactorOperationalTimeYear = yearParams.y;
            const yearIndex = yearParams.index;
            const reactivityYear = values.reactivity[yearIndex];

            const companyParams = findClosestToTarget(values.z, values.k_ef);
            const z_company = companyParams.x;
            const companyKef = companyParams.y;
            const companyIndex = companyParams.index;
            const companyReactivity = values.reactivity[companyIndex];

            const dN5 = Math.abs(
                zRelationsParams[0].nuclearConcentration235UByKR -
                    zRelationsParams[companyIndex].nuclearConcentration235UByKR,
            );

            const tWithoutPu =
                (dN5 * Sf5.value) /
                (2.85 * 1e18 * averageSpecificByVolumePower.value);

            const middleParams = findClosestToTarget(
                values.k_ef,
                values.z,
                z_company / 2,
            );
            const middleKef = middleParams.x;
            const middleZ = middleParams.y;
            const middleIndex = middleParams.index;
            const middleReactivity = values.reactivity[middleIndex];

            const withoutPuParams = findClosestToTarget(
                values.z,
                values.reactorOperationalTime,
                tWithoutPu,
            );
            const z_companyWithoutPu = withoutPuParams.x;
            const indexWithoutPu = withoutPuParams.index;

            const companyTime =
                values.reactorOperationalTime[companyIndex] || 0;
            const middleTime = values.reactorOperationalTime[middleIndex] || 0;

            const companyParamsResult = {
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
            };

            setCompanyParams(companyParamsResult, dN5);
        } catch (error) {
            console.error('Ошибка при расчете параметров кампании', error);
        }
    };

    return { computeCompanyParams };
};
