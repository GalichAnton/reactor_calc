import { ParamsTable } from '@shared/ui';

import { useCellParamsStore } from '../../model/stores/cellParamsStore.ts';

export const CellTable = () => {
    const { cellParams } = useCellParamsStore();

    return (
        <ParamsTable
            params={cellParams}
            title={'Параметры ячейки'}
            rowKey={'cellVolume'}
        />
    );
};
