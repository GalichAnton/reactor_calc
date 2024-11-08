import { ParamsTable } from '@shared/ui';

import { useNuclearConcentrationsStore } from '../../model/stores/azCompNucConStore.ts';
import { AzComponentsNuclearConcentrations } from '../../model/types/azComponentsNuclearConcentrations.ts';

export const NuclearConcentrationsTable = () => {
    const { concentrations } = useNuclearConcentrationsStore();

    return (
        <ParamsTable<AzComponentsNuclearConcentrations>
            params={concentrations}
            title={'Ядерные концентрации отдельных компонентов'}
            rowKey={'N_0U'}
        />
    );
};
