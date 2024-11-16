import { ParamsTable } from '@shared/ui';

import { useCompensationsStore } from '../../model/store/compensationsStore.ts';

export const CompensationTable = () => {
    const { compensationParams } = useCompensationsStore();

    return (
        <ParamsTable
            params={compensationParams}
            title={'Компенсируемость'}
            rowKey={'totalReactivity'}
        />
    );
};
