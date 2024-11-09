import { ParamsTable } from '@shared/ui';

import { useReactorCriticalityStore } from '../../model/stores/reactorCriticalityParamsStore.ts';
import { ReactorCriticalityParams } from '../../model/types/reactorCriticalityParamsParams.ts';

export const ReactorCriticalityTable = () => {
    const { reactorCriticalityParams } = useReactorCriticalityStore();

    return (
        <ParamsTable<ReactorCriticalityParams>
            params={reactorCriticalityParams}
            title={'Критические параметры активной зоны'}
            rowKey={'migrationArea'}
        />
    );
};
