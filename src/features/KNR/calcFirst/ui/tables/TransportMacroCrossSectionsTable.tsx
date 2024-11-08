import { ParamsTable } from '@shared/ui';

import { useTransportMacroStore } from '../../model/stores/transportMacroStore.ts';
import { TransportMacroscopicCrossSections } from '../../model/types/transportMacroscopicCrossSections.ts';

export const TransportMacroCrossSectionsTable = () => {
    const { transportMacroCrossSections } = useTransportMacroStore();

    return (
        <ParamsTable<TransportMacroscopicCrossSections>
            params={transportMacroCrossSections}
            title={'Транспортные макроскопические сечения'}
            rowKey={'transportMacroU238'}
        />
    );
};
