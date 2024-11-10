import { ParamsTable } from '@shared/ui';

import { useLossFactorParamsStore } from '../../model/stores/lossFactorParamsStore.ts';
import { LossFactorParams } from '../../model/types/lossFactorParams.ts';

export const LossFactorTable = () => {
    const { lossFactorParams } = useLossFactorParamsStore();

    return (
        <ParamsTable<LossFactorParams>
            params={lossFactorParams}
            title={'Коэффициент проигрыша'}
            rowKey={'powerRatio'}
        />
    );
};
