import { ParamsTable } from '@shared/ui';

import { useModerationCapacityStore } from '../../model/stores/moderationCapacityStore.ts';
import { ModerationCapacity } from '../../model/types/moderationCapacity.ts';

export const ModerationCapacityTable = () => {
    const { moderationCapacityParams } = useModerationCapacityStore();

    return (
        <ParamsTable<ModerationCapacity>
            params={moderationCapacityParams}
            title={'Замедляющие способности'}
            rowKey={'moderationCapacityU235'}
        />
    );
};
