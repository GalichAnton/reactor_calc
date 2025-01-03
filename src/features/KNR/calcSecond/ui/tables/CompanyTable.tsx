import { useCompanyParamsStore } from '@features/KNR/calcSecond';
import { Params } from '@shared/types/param.ts';
import { ParamsTable } from '@shared/ui';

export const CompanyTable = () => {
    const {
        companyParams: { company, withoutPu, year, dN5 },
    } = useCompanyParamsStore();

    const params: Params = {
        companyTime: company.reactorOperationalTime,
        companyZ: company.z,
        yearKef: year.k_ef,
        yearZ: year.z,
        withoutPuZ: withoutPu.z,
        withoutPuKef: withoutPu.k_ef,
        withoutPuTime: withoutPu.reactorOperationalTime,
        dN5: dN5,
    };

    return (
        <ParamsTable
            params={params}
            title={'Параметры компании'}
            rowKey={'companyTime'}
        />
    );
};
