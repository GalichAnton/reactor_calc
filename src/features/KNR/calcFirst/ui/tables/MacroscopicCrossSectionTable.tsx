import { ParamsTable } from '@shared/ui';

import { useMacroscopicCrossSectionsStore } from '../../model/stores/macroscopicCrossSectionsStore.ts';

export const MacroscopicCrossSectionTable = () => {
    const { macroscopicCrossSections } = useMacroscopicCrossSectionsStore();

    return (
        <ParamsTable
            params={macroscopicCrossSections}
            title={'Макроскопические сечения поглощения'}
            rowKey={'macroSigmaA5'}
        />
    );
};
