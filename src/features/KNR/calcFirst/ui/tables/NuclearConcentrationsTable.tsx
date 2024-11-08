import { ParamsTable } from '@shared/ui';

import { useNuclearConcentrationsStore } from '../../model/stores/azCompNucConStore.ts';

export const NuclearConcentrationsTable = () => {
    const { concentrations } = useNuclearConcentrationsStore();

    return (
        <ParamsTable
            params={concentrations}
            title={'Ядерные концентрации отдельных компонентов'}
            rowKey={'N_0U'}
        />
    );
};
