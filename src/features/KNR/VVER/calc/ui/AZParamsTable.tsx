import { useMemo } from 'react';

import { useAzCalc } from '@features/KNR/VVER/calc/lib/hooks/useAzCalc.tsx';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { useAZPhysParamsStore } from '../model/store/azPhysParamsStore.ts';
import { AZPhysParams } from '../model/types/azPhysParams.ts';

export const AZParamsTable = () => {
    const { azPhysParams } = useAZPhysParamsStore();
    useAzCalc();

    const columns: ColumnsType<AZPhysParams> = useMemo(() => {
        return [
            {
                title: 'Обьем см³',
                key: 'volume',
                dataIndex: 'volume',
                align: 'center',
                render: (value: number) => value.toExponential(3),
            },
            {
                title: 'Диаметр см',
                key: 'diameter',
                dataIndex: 'diameter',
                align: 'center',
            },

            {
                title: 'Геометрический параметр см⁻¹',
                key: 'geometricParameter',
                dataIndex: 'geometricParameter',
                align: 'center',
            },
            {
                title: 'Число ТВС шт',
                key: 'numFuelAssemblies',
                dataIndex: 'numFuelAssemblies',
                align: 'center',
            },
            {
                title: 'K эффективное',
                key: 'effectiveMultiplicationFactor',
                dataIndex: 'effectiveMultiplicationFactor',
                align: 'center',
            },
            {
                title: 'Реактивность реактора',
                key: 'reactorReactivity',
                dataIndex: 'reactorReactivity',
                align: 'center',
            },
        ];
    }, []);

    return (
        <Table
            rowKey={'effectiveMultiplicationFactor'}
            columns={columns}
            title={() => (
                <>
                    <strong>Параметры АЗ</strong>
                </>
            )}
            dataSource={[azPhysParams]}
            size={'small'}
            pagination={false}
            bordered
        />
    );
};
