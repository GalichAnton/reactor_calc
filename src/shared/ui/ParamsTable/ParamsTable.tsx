import { useMemo } from 'react';

import { QuestionCircleOutlined } from '@ant-design/icons';
import { precision } from '@shared/constants/precision.ts';
import { Space, Tooltip } from '@shared/ui';
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

    const columns: ColumnsType<Record<string, Param>> = useMemo(() => {
        return Object.entries(params)
            .filter(([key]) => !excluded?.includes(key as keyof T))
            .map(([key, param]) => ({
                title: (
                    <Space>
                        {key}
                        <Tooltip title={param.description}>
                            <QuestionCircleOutlined />
                        </Tooltip>
                    </Space>
                ),
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
