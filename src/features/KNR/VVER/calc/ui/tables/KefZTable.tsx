import { useMemo } from 'react';

import { Tooltip } from '@shared/ui';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { ZRelations } from '../../model/types/zRelations.ts';

interface ZRelationsTableProps {
    zRelationsParams?: ZRelations[];
}

export const KefZTable = (props: ZRelationsTableProps) => {
    const { zRelationsParams } = props;

    const columns: ColumnsType<ZRelations> = useMemo(() => {
        return [
            {
                title: <Tooltip title={'Глубина выгорания'}>z</Tooltip>,
                key: 'z',
                dataIndex: 'z',
                align: 'center',

                render: (value: number) => value,
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
            {
                title: <Tooltip title={'Реактивность'}>ro</Tooltip>,
                key: 'reactivity',
                dataIndex: 'reactivity',
                align: 'center',
                render: (value: number) => value.toExponential(3),
            },
        ];
    }, []);

    return (
        <Table
            rowKey={'effectiveNeutronMultiplicationFactor'}
            columns={columns}
            title={() => (
                <>
                    <strong>Кef от глубины выгорания Z</strong>
                </>
            )}
            dataSource={zRelationsParams}
            size={'small'}
            bordered
        />
    );
};
