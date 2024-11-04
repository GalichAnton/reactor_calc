import { useMemo } from 'react';

import { ZRelations } from '@features/KNR/VVER/calc/model/types/zRelations.ts';
import { Tooltip } from '@shared/ui';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

interface ZRelationsTableProps {
    zRelationsParams?: ZRelations[];
}

export const NucConcentrationTable = (props: ZRelationsTableProps) => {
    const { zRelationsParams } = props;

    const columns: ColumnsType<ZRelations> = useMemo(() => {
        return [
            {
                title: <Tooltip title={'Глубина выгорания'}>z</Tooltip>,
                key: 'z',
                dataIndex: 'z',
                align: 'center',

                render: (value: number) => value.toExponential(3),
            },

            {
                title: (
                    <Tooltip
                        title={'Ядерная концентрация 235U методом Румянцева'}
                    >
                        N_235U(Румянцев)
                    </Tooltip>
                ),
                key: 'nuclearConcentration235UByRum',
                dataIndex: 'nuclearConcentration235UByRum',
                align: 'center',
                render: (value: number) => value.toExponential(3),
            },
            {
                title: (
                    <Tooltip
                        title={'Ядерная концентрация 239Pu методом Румянцева'}
                    >
                        N_239Pu(Румянцев)
                    </Tooltip>
                ),
                key: 'nuclearConcentration239PuByRum',
                dataIndex: 'nuclearConcentration239PuByRum',
                align: 'center',
                render: (value: number) => value.toExponential(3),
            },
            {
                title: (
                    <Tooltip title={'Ядерная концентрация 235U методом Бать'}>
                        N_235U(Бать)
                    </Tooltip>
                ),
                key: 'nuclearConcentration235UByBat',
                dataIndex: 'nuclearConcentration235UByBat',
                align: 'center',
                render: (value: number) => value.toExponential(3),
            },
            {
                title: (
                    <Tooltip title={'Ядерная концентрация 239Pu методом Бать'}>
                        N_239Pu(Бать)
                    </Tooltip>
                ),
                key: 'nuclearConcentration239PuByBat',
                dataIndex: 'nuclearConcentration239PuByBat',
                align: 'center',
                render: (value: number) => value.toExponential(3),
            },
            {
                title: (
                    <Tooltip
                        title={
                            'Ядерная концентрация 235U по методу конечных-разностностей'
                        }
                    >
                        N_235U(К-Р)
                    </Tooltip>
                ),
                key: 'nuclearConcentration235UByKR',
                dataIndex: 'nuclearConcentration235UByKR',
                align: 'center',
                render: (value: number) => value.toExponential(3),
            },
            {
                title: (
                    <Tooltip
                        title={
                            'Ядерная концентрация 239Pu по методу конечных-разностностей'
                        }
                    >
                        N_239Pu(К-Р)
                    </Tooltip>
                ),
                key: 'nuclearConcentration239PuByKR',
                dataIndex: 'nuclearConcentration239PuByKR',
                align: 'center',
                render: (value: number) => value.toExponential(3),
            },
        ];
    }, []);

    return (
        <Table
            rowKey={(record, index) =>
                `${index}_${record.nuclearConcentration235UByBat}`
            }
            columns={columns}
            title={() => (
                <>
                    <strong>Ядерные концентрации от глубины выгорания Z</strong>
                </>
            )}
            dataSource={zRelationsParams}
            size={'small'}
            bordered
        />
    );
};
