import { useFuelParamsStore } from '@features/KNR/calcSecond';
import { ParamsTable } from '@shared/ui';

import { FuelParams } from '../../model/types/fuelParams.ts';

export const FuelTable = () => {
    const { fuelParams } = useFuelParamsStore();

    return (
        <ParamsTable<FuelParams>
            params={fuelParams}
            title={'Параметры топлива'}
            rowKey={'depletedUranium235Mass'}
        />
    );
};
