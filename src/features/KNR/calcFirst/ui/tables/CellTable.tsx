import { ParamsTable } from '@shared/ui';

import { useCellParamsStore } from '../../model/stores/cellParamsStore.ts';
import { CellParams } from '../../model/types/cellParams.ts';

export const CellTable = () => {
    const { cellParams } = useCellParamsStore();

    return (
        <ParamsTable<CellParams>
            params={cellParams}
            title={'Параметры ячейки'}
            rowKey={'cellVolume'}
        />
    );
};
