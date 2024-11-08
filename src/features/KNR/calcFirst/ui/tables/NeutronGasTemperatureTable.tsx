import { ParamsTable } from '@shared/ui';

import { useNeutronGasParamsStore } from '../../model/stores/neutronGasStore.ts';
import { NeutronGasParams } from '../../model/types/neutronGasParams.ts';

export const NeutronGasTemperatureTable = () => {
    const { neutronGasParams } = useNeutronGasParamsStore();

    return (
        <ParamsTable<NeutronGasParams>
            params={neutronGasParams}
            title={'Параметры нейтронного газа'}
            rowKey={'neutronGasTemperature'}
        />
    );
};
