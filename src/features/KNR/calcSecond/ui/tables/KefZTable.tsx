import { useMemo } from 'react';

import { useZRelationsStore } from '@features/KNR/calcSecond';
import { precision } from '@shared/constants/precision.ts';
import { Tooltip } from '@shared/ui';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { ZRelations } from '../../model/types/zRelations.ts';

export const KefZTable = () => {
    const { zRelationsParams } = useZRelationsStore();

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
                render: (value: number) => value.toFixed(2),
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
                render: (value: number) => value.toExponential(precision),
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
                render: (value: number) => value.toExponential(precision),
            },
            {
                title: <Tooltip title={'Реактивность'}>ro</Tooltip>,
                key: 'reactivity',
                dataIndex: 'reactivity',
                align: 'center',
                render: (value: number) => value.toExponential(precision),
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
