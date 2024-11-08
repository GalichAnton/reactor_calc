import { ParamsTable } from '@shared/ui';

import { useAveragedCrossSectionsStore } from '../../model/stores/averagedCrossSectionsStore.ts';
import { AveragedCrossSections } from '../../model/types/averagedMicroCrossSections.ts';

export const AverageMicroCrossSectionTable = () => {
    const { averagedCrossSections } = useAveragedCrossSectionsStore();

    return (
        <ParamsTable<AveragedCrossSections>
            params={averagedCrossSections}
            title={'Усредненнные микроскопические сечения'}
            rowKey={'averagedMicroFU5'}
            excluded={[
                'averagedMacroAO2',
                'averagedMacroAZr',
                'averagedMacroAH2O',
                'averagedMacroATotal',
                'averagedMacroFU5',
                'averagedMacroAU5',
                'averagedMacroAU8',
            ]}
        />
    );
};
