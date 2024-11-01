import { useMemo } from 'react';

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
            dataSource={[isotopesParams]}
            size={'small'}
            pagination={false}
            bordered
        />
    );
};
