import { useMemo } from 'react';

import { Tooltip as AppTooltip } from '@shared/ui';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

interface CompanyTableProps {
    companyTime: number;
    companyZ: number;
    companyKef: number;
    yearKef: number;
    yearZ: number;
    withoutPuZ: number;
    withoutPuKef: number;
    withoutPuTime: number;
}

export const CompanyTable = (props: CompanyTableProps) => {
    const columns: ColumnsType<CompanyTableProps> = useMemo(() => {
        return [
            {
                title: (
                    <AppTooltip title={'Кампания реактора'}>
                        Кампания
                    </AppTooltip>
                ),
                key: 'companyTime',
                dataIndex: 'companyTime',
                align: 'center',

                render: (value: number) => value?.toFixed(0),
            },
            {
                title: (
                    <AppTooltip title={'Глубина выгорания за кампанию'}>
                        Z_company
                    </AppTooltip>
                ),
                key: 'companyZ',
                dataIndex: 'companyZ',
                align: 'center',

                render: (value: number) => value,
            },
            {
                title: (
                    <AppTooltip title={'К эффективное кампании'}>
                        K_ef_company
                    </AppTooltip>
                ),
                key: 'companyKef',
                dataIndex: 'companyKef',
                align: 'center',

                render: (value: number) => value?.toFixed(3),
            },
            {
                title: (
                    <AppTooltip title={'Кампания реактора без учета Pu'}>
                        Кампания без учета Pu
                    </AppTooltip>
                ),
                key: 'withoutPuTime',
                dataIndex: 'withoutPuTime',
                align: 'center',

                render: (value: number) => value?.toFixed(0),
            },
            {
                title: (
                    <AppTooltip title={'Глубина выгорания за кампанию без Pu'}>
                        Z без Pu
                    </AppTooltip>
                ),
                key: 'withoutPuZ',
                dataIndex: 'withoutPuZ',
                align: 'center',

                render: (value: number) => value,
            },
            {
                title: (
                    <AppTooltip title={'К эффективное без Pu'}>
                        K_ef без Pu
                    </AppTooltip>
                ),
                key: 'withoutPuKef',
                dataIndex: 'withoutPuKef',
                align: 'center',

                render: (value: number) => value?.toFixed(3),
            },
            {
                title: (
                    <AppTooltip title={'Глубина выгорания за год'}>
                        Z_year
                    </AppTooltip>
                ),
                key: 'yearZ',
                dataIndex: 'yearZ',
                align: 'center',

                render: (value: number) => value,
            },

            {
                title: (
                    <AppTooltip title={'К эффективное за год'}>
                        K_ef_year
                    </AppTooltip>
                ),
                key: 'yearKef',
                dataIndex: 'yearKef',
                align: 'center',

                render: (value: number) => value?.toFixed(3),
            },
        ];
    }, []);

    return (
        <Table
            rowKey={'yearKef'}
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
