import { ParamsTable } from '@shared/ui';

import { useAZPhysParamsStore } from '../../model/store/azPhysParamsStore.ts';
import { AZPhysParams } from '../../model/types/azPhysParams.ts';

export const AZParamsTable = () => {
    const { azPhysParams } = useAZPhysParamsStore();

    return (
        <ParamsTable<AZPhysParams>
            params={azPhysParams}
            title={'Параметры активной зоны'}
            rowKey={'geometricParameter'}
        />
    );
};
