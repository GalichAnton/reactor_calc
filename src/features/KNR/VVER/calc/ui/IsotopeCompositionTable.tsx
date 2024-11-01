import { useMemo } from 'react';

import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { useAzCalc } from '../lib/hooks/useAzCalc.tsx';
import { useAZPhysParamsStore } from '../model/store/azPhysParamsStore.ts';
import { IsotopeComposition } from '../model/types/IsotopeComposition.ts';

export const IsotopeCompositionTable = () => {
    const { azPhysParams } = useAZPhysParamsStore();
    useAzCalc();

    const columns: ColumnsType<IsotopeComposition> = useMemo(() => {
        return [
            {
                title: 'КВ в начале кампании',
                key: 'initialReproductionCoefficient',
                dataIndex: 'initialReproductionCoefficient',
                align: 'center',
                render: (value: number) => value.toExponential(3),
            },
            {},
        ];
    }, []);

    return (
        <Table
            rowKey={'initialReproductionCoefficient'}
            columns={columns}
            title={() => (
                <>
                    <strong>Изменения изотопного состава</strong>
                </>
            )}
            dataSource={[azPhysParams]}
            size={'small'}
            pagination={false}
            bordered
        />
    );
};
