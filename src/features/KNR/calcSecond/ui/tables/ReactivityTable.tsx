import { useEffect, useMemo, useState } from 'react';

import {
    useNeutronDiffusionAgeStore,
    useTransportMacroStore,
} from '@features/KNR/calcFirst';
import { useCompanyParamsStore } from '@features/KNR/calcSecond';
import { performAllCalculations } from '@features/KNR/VVER/mainCalc';
import { useInitialParamsStore } from '@features/KNR/VVER/setInitialValues';
import { Params } from '@shared/types/param.ts';
import { ParamsTable } from '@shared/ui';

import { calculateCompensationParams } from '../../lib/utils/calcCompensationParams/calcCompensationParams.ts';
import { useAZPhysParamsStore } from '../../model/store/azPhysParamsStore.ts';
import { useCompensationsStore } from '../../model/store/compensationsStore.ts';

const coolantTemperature = 293;

export const ReactivityTable = () => {
    const [coldParams, setColdParams] = useState<any>();
    const { setCompensationParams } = useCompensationsStore();
    const {
        companyParams: { company, middle, year, zero },
    } = useCompanyParamsStore();
    const { initialParams } = useInitialParamsStore();
    const {
        transportMacroCrossSections: {
            transportMacroTotal,
            transportMacroTotal1eV,
        },
    } = useTransportMacroStore();
    const {
        azPhysParams: { geometricParameter, diameter },
    } = useAZPhysParamsStore();
    const {
        neutronDiffusionAgeParams: { diffusionLengthSquared, neutronAge },
    } = useNeutronDiffusionAgeStore();

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

        const dro =
            middle.reactivity.value - coldParams.params.middle.reactivity;

        const thermalD =
            dro / (initialParams.coolantTemperature - coolantTemperature);

        const compensationParams = calculateCompensationParams({
            KefYear: company.k_ef.value,
            reactivitySlug: company.reactivity.value,
            reactivityPure: zero.reactivity.value,
            dRoThermalCoef: thermalD,
            transportCrossSectionTotal: transportMacroTotal.value,
            transportCrossSectionTotal1EV: transportMacroTotal1eV.value,
            radiusControls: initialParams.controlRodRadius,
            geometricParameter: geometricParameter.value,
            diffusionLength: diffusionLengthSquared.value,
            neutronAge: neutronAge.value,
            azDiameter: diameter.value,
        });

        setCompensationParams(compensationParams);

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
                value: thermalD,
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
