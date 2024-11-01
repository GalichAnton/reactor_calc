import { useMemo } from 'react';

import { Tooltip } from '@shared/ui';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { useCalcIsotopes } from '../lib/hooks/useCalcIsotopes.tsx';
import { useIsotopeCompositionStore } from '../model/store/isotopeCompositionSore.ts';
import { IsotopeComposition } from '../model/types/IsotopeComposition.ts';

export const IsotopeCompositionTable = () => {
    const { isotopesParams } = useIsotopeCompositionStore();
    useCalcIsotopes();

    const columns: ColumnsType<IsotopeComposition> = useMemo(() => {
        return [
            {
                title: (
                    <Tooltip
                        title={'Коэффициент воспроизводства в начале кампании'}
                    >
                        КВ в начале кампании{' '}
                    </Tooltip>
                ),
                key: 'initialReproductionCoefficient',
                dataIndex: 'initialReproductionCoefficient',
                align: 'center',

                render: (value: number) => value.toExponential(3),
            },
            {
                title: <Tooltip title={'Sa8'}>Sa8</Tooltip>,
                key: 'Sa8',
                dataIndex: 'Sa8',
                align: 'center',
                render: (value: number) => value.toExponential(3),
            },
            {
                title: <Tooltip title={'Sa9'}>Sa9</Tooltip>,
                key: 'Sa9',
                dataIndex: 'Sa9',
                align: 'center',
                render: (value: number) => value.toExponential(3),
            },
            {
                title: <Tooltip title={'Sf8'}>Sf8</Tooltip>,
                key: 'Sf8',
                dataIndex: 'Sf8',
                align: 'center',
                render: (value: number) => value.toExponential(3),
            },
            {
                title: <Tooltip title={'Sf9'}>Sf9</Tooltip>,
                key: 'Sf9',
                dataIndex: 'Sf9',
                align: 'center',
                render: (value: number) => value.toExponential(3),
            },
            {
                title: (
                    <Tooltip
                        title={
                            'Усредненное микроскопическое сечение деления плутония-239'
                        }
                    >
                        sigma_f_9
                    </Tooltip>
                ),
                key: 'averageFissionCrossSection239Pu',
                dataIndex: 'averageFissionCrossSection239Pu',
                align: 'center',
                render: (value: number) => value.toExponential(3),
            },
            {
                title: (
                    <Tooltip
                        title={
                            'Усредненное микроскопическое сечение поглощения плутония-239'
                        }
                    >
                        sigma_a_9
                    </Tooltip>
                ),
                key: 'averageAbsorptionCrossSection239Pu',
                dataIndex: 'averageAbsorptionCrossSection239Pu',
                align: 'center',
                render: (value: number) => value.toExponential(3),
            },
            {
                title: (
                    <Tooltip
                        title={
                            'Число вторичных нейтронов на 1 акт поглощения плутонием-239'
                        }
                    >
                        eta_a9
                    </Tooltip>
                ),
                key: 'secondaryNeutronsPerAbsorption239Pu',
                dataIndex: 'secondaryNeutronsPerAbsorption239Pu',
                align: 'center',
                render: (value: number) => value.toExponential(3),
            },
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
            dataSource={[isotopesParams]}
            size={'small'}
            pagination={false}
            bordered
        />
    );
};
