import { useMemo } from 'react';

import { FuelParams } from '@features/KNR/VVER/calc/model/types/fuelParams.ts';
import { Tooltip as AppTooltip } from '@shared/ui';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

interface FuelTableProps {
    params: FuelParams;
}

export const FuelTable = (props: FuelTableProps) => {
    const { params } = props;

    console.log('props', props);
    const columns: ColumnsType<FuelParams> = useMemo(() => {
        return [
            {
                title: (
                    <AppTooltip title={'Масса выгоревшего урана-235 (г)'}>
                        dM5
                    </AppTooltip>
                ),
                key: 'depletedUranium235Mass',
                dataIndex: 'depletedUranium235Mass',
                align: 'center',

                render: (value: number) => value?.toExponential(3),
            },
            {
                title: (
                    <AppTooltip title={'Удельный расход горючего (г/МВт∙сут)'}>
                        Psi
                    </AppTooltip>
                ),
                key: 'specificFuelConsumption',
                dataIndex: 'specificFuelConsumption',
                align: 'center',

                render: (value: number) => value.toExponential(3),
            },
            {
                title: (
                    <AppTooltip
                        title={
                            'Масса загруженного урана-235 в начале кампании (кг)'
                        }
                    >
                        M5(0)
                    </AppTooltip>
                ),
                key: 'initialUranium235Mass',
                dataIndex: 'initialUranium235Mass',
                align: 'center',

                render: (value: number) => value.toExponential(3),
            },
            {
                title: (
                    <AppTooltip
                        title={
                            'Масса загруженного урана-238 в начале кампании (кг)'
                        }
                    >
                        M8(0)
                    </AppTooltip>
                ),
                key: 'initialUranium238Mass',
                dataIndex: 'initialUranium238Mass',
                align: 'center',

                render: (value: number) => value.toExponential(3),
            },
            {
                title: (
                    <AppTooltip
                        title={
                            'Масса загруженного урана в начале кампании (кг)'
                        }
                    >
                        MU(0)
                    </AppTooltip>
                ),
                key: 'totalInitialUraniumMass',
                dataIndex: 'totalInitialUraniumMass',
                align: 'center',

                render: (value: number) => value.toExponential(3),
            },
            {
                title: (
                    <AppTooltip title={'Обогащение урана (%)'}>
                        Обогащение
                    </AppTooltip>
                ),
                key: 'uraniumEnrichment',
                dataIndex: 'uraniumEnrichment',
                align: 'center',

                render: (value: number) => value.toExponential(3),
            },
            {
                title: (
                    <AppTooltip
                        title={'Глубина выгорания топлива за год (МВт∙сут/кг)'}
                    >
                        Z_year
                    </AppTooltip>
                ),
                key: 'fuelBurnupPerYear',
                dataIndex: 'fuelBurnupPerYear',
                align: 'center',

                render: (value: number) => value.toExponential(3),
            },
            {
                title: (
                    <AppTooltip title={'Количество перегрузок'}>
                        N_перегрузок
                    </AppTooltip>
                ),
                key: 'numberOfReloads',
                dataIndex: 'numberOfReloads',
                align: 'center',

                render: (value: number) => value.toExponential(3),
            },
        ];
    }, []);

    return (
        <Table
            rowKey={'totalInitialUraniumMass'}
            columns={columns}
            title={() => (
                <>
                    <strong>Параметры топлива</strong>
                </>
            )}
            dataSource={[params]}
            size={'small'}
            bordered
        />
    );
};
