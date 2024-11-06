import { useEffect } from 'react';

import { findClosestToTarget } from '@shared/lib/utils';

import { useCompanyParamsStore } from '../../model/store/campanyStore.ts';
import { useIsotopeCompositionStore } from '../../model/store/isotopeCompositionStore.ts';
import { useZRelationsStore } from '../../model/store/zRelationStore.ts';

type CompanyValues = {
    reactorOperationalTime: number[];
    k_ef: number[];
    z: number[];
};

export const useCalcCompanyParams = () => {
    const { Sf5, averageSpecificByVolumePower } = useIsotopeCompositionStore(
        (state) => state.isotopesParams,
    );
    const { zRelationsParams } = useZRelationsStore();
    const { setCompanyParams } = useCompanyParamsStore();

    useEffect(() => {
        if (!zRelationsParams) {
            return;
        }

        const values = zRelationsParams?.reduce<CompanyValues>(
            (acc, p) => {
                acc.reactorOperationalTime.push(p.reactorOperationalTime);
                acc.k_ef.push(p.effectiveNeutronMultiplicationFactor);
                acc.z.push(p.z);
                return acc;
            },
            { reactorOperationalTime: [], k_ef: [], z: [] },
        );

        const {
            x: z_year,
            index: yearIndex,
            y: reactorOperationalTimeYear,
        } = findClosestToTarget(values?.z, values?.reactorOperationalTime, 365);

        const {
            x: z_company,
            y: companyKef,
            index: companyIndex,
        } = findClosestToTarget(values?.z, values?.k_ef);

        const dN5 = Math.abs(
            zRelationsParams[0].nuclearConcentration235UByKR -
                zRelationsParams[companyIndex].nuclearConcentration235UByKR,
        );

        const tWithoutPu =
            (dN5 * Sf5) / (2.85 * 1e18 * averageSpecificByVolumePower);

        const { x: z_companyWithoutPu, index: indexWithoutPu } =
            findClosestToTarget(
                values?.z,
                values?.reactorOperationalTime,
                tWithoutPu,
            );

        setCompanyParams({
            computedValues: {
                company: {
                    z: z_company,
                    k_ef: companyKef,
                    reactorOperationalTime:
                        values?.reactorOperationalTime[companyIndex] || 0,
                },
                year: {
                    z: z_year,
                    reactorOperationalTime: reactorOperationalTimeYear,
                    k_ef: values?.k_ef[yearIndex] || 0,
                },
                withoutPu: {
                    z: z_companyWithoutPu,
                    k_ef: values?.k_ef[indexWithoutPu] || 0,
                    reactorOperationalTime: tWithoutPu,
                },
            },
            dN5,
        });
    }, [zRelationsParams]);
};
