import { ParamsTable } from '@shared/ui';

import { useAveragedCrossSectionsStore } from '../../model/stores/averagedCrossSectionsStore.ts';
import { AveragedCrossSections } from '../../model/types/averagedMicroCrossSections.ts';

export const AverageMacroCrossSectionTable = () => {
    const { averagedCrossSections } = useAveragedCrossSectionsStore();
    console.log(averagedCrossSections);

    return (
        <ParamsTable<AveragedCrossSections>
            params={averagedCrossSections}
            title={'Усредненнные макроскопические сечения'}
            rowKey={'averagedMicroFU5'}
            excluded={[
                'averagedMicroFU5',
                'averagedMicroAU5',
                'averagedMicroAU8',
                'averagedMicroAO2',
                'averagedMicroAH2O',
                'averagedMicroAZr',
            ]}
        />
    );
};
