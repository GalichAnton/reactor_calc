import { ParamsTable } from '@shared/ui';

import { useIsotopeCompositionStore } from '../../model/store/isotopeCompositionStore.ts';
import { IsotopeComposition } from '../../model/types/IsotopeComposition.ts';

export const IsotopeCompositionTable = () => {
    const { isotopesParams } = useIsotopeCompositionStore();

    return (
        <ParamsTable<IsotopeComposition>
            params={isotopesParams}
            title={'Изотопный состав топлива'}
            rowKey={'averageFissionCrossSection239Pu'}
        />
    );
};
