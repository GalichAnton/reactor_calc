import { ParamsTable } from '@shared/ui';

import { useKInfParamsStore } from '../../model/stores/kInfParamsStore.ts';
import { KInfParams } from '../../model/types/kInfParams.ts';

export const KInfTable = () => {
    const { kInfParams } = useKInfParamsStore();

    return (
        <ParamsTable<KInfParams>
            params={kInfParams}
            title={'Сомножители k_∞'}
            rowKey={'uraniumTemperature'}
        />
    );
};
