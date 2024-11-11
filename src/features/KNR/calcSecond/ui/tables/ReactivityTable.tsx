import { useEffect, useMemo, useState } from 'react';

import { useCompanyParamsStore } from '@features/KNR/calcSecond';
import { performAllCalculations } from '@features/KNR/VVER/mainCalc';
import { useInitialParamsStore } from '@features/KNR/VVER/setInitialValues';
import { Params } from '@shared/types/param.ts';
import { ParamsTable } from '@shared/ui';

const coolantTemperature = 293;

export const ReactivityTable = () => {
    const [coldParams, setColdParams] = useState<any>();
    const {
        companyParams: { company, middle, year },
    } = useCompanyParamsStore();
    const { initialParams } = useInitialParamsStore();

    useEffect(() => {
        const newParams = {
            ...initialParams,
            coolantTemperature: coolantTemperature,
        };
        performAllCalculations(newParams).then((data) => {
            setColdParams(data.companyParams);
        });
    }, []);

    const params: Params = useMemo(() => {
        if (!coldParams) {
            return {} as Params;
        }
        console.log(coldParams);
        const dro =
            middle.reactivity.value - coldParams.params.middle.reactivity;
        return {
            reactivityCompany: company.reactivity,
            reactivityMiddle: middle.reactivity,
            reactivityYear: year.reactivity,
            reactivityMiddleCold: {
                name: 'ρ_х',
                description: 'Реактивность при T=293K',
                value: coldParams.params.middle.reactivity,
            },
            kefCold: {
                name: 'kef_х',
                description: 'Кэфф при T=293K',
                value: coldParams.params.middle.k_ef,
            },
            reactivityTempEffect: {
                name: 'Δρ_t',
                description: 'Температурный эффект реактивности',
                value: dro,
            },
            reactivityTempCoef: {
                name: 'δρ',
                description: 'Температурный коэффициент реактивности',
                value:
                    dro /
                    (initialParams.coolantTemperature - coolantTemperature),
            },
        };
    }, [coldParams]);

    return (
        <ParamsTable
            params={params}
            title={'Реактивность'}
            rowKey={'geometricParameter'}
        />
    );
};
