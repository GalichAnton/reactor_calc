import { useMemo } from 'react';

import { Tooltip } from '@shared/ui';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { ZRelations } from '../../model/types/zRelations.ts';

interface ZRelationsTableProps {
    zRelationsParams?: ZRelations[];
}

export const ZRelationsTable = (props: ZRelationsTableProps) => {
    const { zRelationsParams } = props;

    const columns: ColumnsType<ZRelations> = useMemo(() => {
        return [
            {
                title: <Tooltip title={'Глубина выгорания'}>z</Tooltip>,
                key: 'z',
                dataIndex: 'z',
                align: 'center',

                render: (value: number) => value.toFixed(3),
            },
            {
                title: (
                    <Tooltip title={'Ядерная плотность U-235'}>
                        Ядерная плотность U-235
                    </Tooltip>
                ),
                key: 'nuclearConcentration235U',
                dataIndex: 'nuclearConcentration235U',
                align: 'center',

                render: (value: number) => value.toExponential(3),
            },
            {
                title: (
                    <Tooltip title={'Ядерная плотность Pu-239'}>
                        Ядерная плотность Pu-239
                    </Tooltip>
                ),
                key: 'nuclearConcentration239Pu',
                dataIndex: 'nuclearConcentration239Pu',
                align: 'center',
                render: (value: number) => value.toExponential(3),
            },
            {
                title: (
                    <Tooltip
                        title={
                            'Время работы реактора в сутках в зависимости от z'
                        }
                    >
                        Время работы реактора
                    </Tooltip>
                ),
                key: 'reactorOperationalTime',
                dataIndex: 'reactorOperationalTime',
                align: 'center',
                render: (value: number) => value,
            },
            {
                title: (
                    <Tooltip title={'Сечение поглощения шлаков'}>
                        сечения поглощения
                    </Tooltip>
                ),
                key: 'reactorOperationalTime',
                dataIndex: 'reactorOperationalTime',
                align: 'center',
                render: (value: number) => value,
            },
            {
                title: (
                    <Tooltip
                        title={
                            'Коэффициент размножения нейтронов в бесконечной среде'
                        }
                    >
                        K_inf
                    </Tooltip>
                ),
                key: 'infiniteMediumNeutronMultiplicationFactor',
                dataIndex: 'infiniteMediumNeutronMultiplicationFactor',
                align: 'center',
                render: (value: number) => value.toExponential(3),
            },
            {
                title: (
                    <Tooltip
                        title={'Эффективный коэффициент размножения нейтронов'}
                    >
                        K_ef
                    </Tooltip>
                ),
                key: 'effectiveNeutronMultiplicationFactor',
                dataIndex: 'effectiveNeutronMultiplicationFactor',
                align: 'center',
                render: (value: number) => value.toExponential(3),
            },
        ];
    }, []);

    return (
        <Table
            rowKey={(record, index) => `${index}_${record.z}`}
            columns={columns}
            title={() => (
                <>
                    <strong>Изменения изотопного состава</strong>
                </>
            )}
            dataSource={zRelationsParams}
            size={'small'}
            bordered
        />
    );
};
