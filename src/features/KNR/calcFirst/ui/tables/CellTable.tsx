import { CellParams } from '@features/KNR/calcFirst/model/types/cellParams.ts';
import { ParamsTable } from '@shared/ui';

import { useCellParamsStore } from '../../model/stores/cellParamsStore.ts';

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
