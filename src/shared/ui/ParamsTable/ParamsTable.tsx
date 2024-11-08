import { useMemo } from 'react';

import { precision } from '@shared/constants/precision.ts';
import { Tooltip } from '@shared/ui';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { Param, Params } from '../../types/param.ts';

interface ParamsTableProps<T> {
    params: Params;
    title: string;
    rowKey?: string;
    excluded?: (keyof T)[];
}

export const ParamsTable = <T,>(props: ParamsTableProps<T>) => {
    const { params, title, rowKey, excluded } = props;
    console.log(params);
    const columns: ColumnsType<Record<string, Param>> = useMemo(() => {
        return Object.entries(params)
            .filter(([key]) => !excluded?.includes(key as keyof T))
            .map(([key, param]) => ({
                title: <Tooltip title={param.description}>{key}</Tooltip>,
                key: key,
                dataIndex: key,
                align: 'center',
                render: (param: Param) => param.value?.toExponential(precision),
            }));
    }, [params]);

    return (
        <Table
            rowKey={rowKey || 'test'}
            columns={columns}
            title={() => (
                <>
                    <strong>{title}</strong>
                </>
            )}
            dataSource={[params]}
            size={'small'}
            pagination={false}
            bordered
        />
    );
};
