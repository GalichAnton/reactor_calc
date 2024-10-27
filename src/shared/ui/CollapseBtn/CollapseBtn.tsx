import type { FC } from 'react';
import React from 'react';

import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';

import { Button, Text } from '@shared/ui';

interface CollapseBtnProps {
    toggleCollapse: () => void;
    collapse: boolean;
}

export const CollapseBtn: FC<CollapseBtnProps> = props => {
    const { collapse, toggleCollapse } = props;
    return (
        <Button
            icon={
                collapse ? (
                    <DoubleRightOutlined style={{ color: 'white' }} />
                ) : (
                    <DoubleLeftOutlined style={{ color: 'white' }} />
                )
            }
            onClick={toggleCollapse}
            style={{ width: '50%', margin: '0 auto' }}
            type={'text'}
        >
            {!collapse ? (
                <Text ellipsis style={{ color: 'white' }}>
                    Свернуть
                </Text>
            ) : null}
        </Button>
    );
};
