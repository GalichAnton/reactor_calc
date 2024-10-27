import type { FC } from 'react';

import { Tooltip } from '@shared/ui';
import { Button as AntdButton } from 'antd';

import type { AppButtonProps } from '../../types';

export const Button: FC<AppButtonProps> = (props) => {
    const { tooltip, children, ...otherProps } = props;

    if (!tooltip) {
        return <AntdButton {...otherProps}>{children}</AntdButton>;
    }

    return (
        <Tooltip
            title={tooltip}
            overlayInnerStyle={{ overflow: 'auto', maxHeight: '250px' }}
        >
            <AntdButton {...otherProps}>{children}</AntdButton>
        </Tooltip>
    );
};
