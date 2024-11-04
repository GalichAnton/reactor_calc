import { useMemo } from 'react';

import { Tooltip as AppTooltip } from '@shared/ui';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

interface KefChartTableProps {
    company?: number;
    companyWithoutPu?: number;
    Z_company?: number;
    Z_year?: number;
    K_ef_company?: number;
    K_ef_year?: number;
}

export const KefChartTable = (props: KefChartTableProps) => {
    const columns: ColumnsType<KefChartTableProps> = useMemo(() => {
        return [
            {
                title: <AppTooltip title={'Кампания'}>Кампания</AppTooltip>,
                key: 'company',
                dataIndex: 'company',
                align: 'center',

                render: (value: number) => value?.toFixed(0),
            },
            {
                title: (
                    <AppTooltip title={'Кампания'}>
                        Кампания без учета Pu
                    </AppTooltip>
                ),
                key: 'companyWithoutPu',
                dataIndex: 'companyWithoutPu',
                align: 'center',

                render: (value: number) => value?.toFixed(0),
            },
            {
                title: (
                    <AppTooltip title={'Глубина выгорания за кампанию'}>
                        Z_company
                    </AppTooltip>
                ),
                key: 'Z_company',
                dataIndex: 'Z_company',
                align: 'center',

                render: (value: number) => value,
            },
            {
                title: (
                    <AppTooltip title={'Глубина выгорания за год'}>
                        Z_year
                    </AppTooltip>
                ),
                key: 'Z_year',
                dataIndex: 'Z_year',
                align: 'center',

                render: (value: number) => value,
            },
            {
                title: (
                    <AppTooltip title={'К эффективное кампании'}>
                        K_ef_company
                    </AppTooltip>
                ),
                key: 'K_ef_company',
                dataIndex: 'K_ef_company',
                align: 'center',

                render: (value: number) => value?.toFixed(3),
            },
            {
                title: (
                    <AppTooltip title={'К эффективное за год'}>
                        K_ef_year
                    </AppTooltip>
                ),
                key: 'K_ef_year',
                dataIndex: 'K_ef_year',
                align: 'center',

                render: (value: number) => value?.toFixed(3),
            },
        ];
    }, []);

    return (
        <Table
            rowKey={(record, index) => `${index}_${record.K_ef_year}`}
            columns={columns}
            title={() => (
                <>
                    <strong>Значения по графику</strong>
                </>
            )}
            dataSource={[props]}
            size={'small'}
            bordered
        />
    );
};
