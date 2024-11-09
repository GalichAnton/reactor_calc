import { ParamsTable } from '@shared/ui';

import { useTwoZoneModelParamsStore } from '../../model/stores/twoZoneParamsStore.ts';
import { TwoZoneModelParams } from '../../model/types/twoZoneModelParams.ts';

export const TwoZoneTable = () => {
    const { params } = useTwoZoneModelParamsStore();

    return (
        <ParamsTable<TwoZoneModelParams>
            params={params}
            title={'Сечения в двухзонной ячейке'}
            rowKey={'twoZoneCellVolume'}
        />
    );
};
