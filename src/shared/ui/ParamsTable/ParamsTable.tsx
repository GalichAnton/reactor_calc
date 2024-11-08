import { useMemo } from 'react';

import { precision } from '@shared/constants/precision.ts';
import { Tooltip } from '@shared/ui';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { Param, Params } from '../../types/param.ts';

interface ParamsTableProps {
    params: Params;
    title: string;
    rowKey?: string;
}

export const ParamsTable = (props: ParamsTableProps) => {
    const { params, title, rowKey } = props;

    const columns: ColumnsType<Record<string, Param>> = useMemo(() => {
        return Object.values(params).map((param) => ({
            title: <Tooltip title={param.description}>{param.name}</Tooltip>,
            key: param.name,
            dataIndex: param.name,
            align: 'center',
            render: (param: Param) => param.value.toExponential(precision),
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
