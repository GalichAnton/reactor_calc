import { useCompanyParamsStore } from '@features/KNR/calcSecond';
import { Params } from '@shared/types/param.ts';
import { ParamsTable } from '@shared/ui';

export const ReactivityTable = () => {
    const {
        companyParams: { company, middle, year },
    } = useCompanyParamsStore();

    const params: Params = {
        reactivityCompany: company.reactivity,
        reactivityMiddle: middle.reactivity,
        reactivityYear: year.reactivity,
    };

    return (
        <ParamsTable
            params={params}
            title={'Реактивность'}
            rowKey={'geometricParameter'}
        />
    );
};
