import { CellParams } from '@features/KNR/calcFirst/model/types/cellParams.ts';
import { ParamsTable } from '@shared/ui';

import { useAZPhysParamsStore } from '../../model/store/azPhysParamsStore.ts';

export const AZParamsTable = () => {
    const { azPhysParams } = useAZPhysParamsStore();

    return (
        <ParamsTable<CellParams>
            params={azPhysParams}
            title={'Параметры активной зоны'}
            rowKey={'geometricParameter'}
        />
    );
};
