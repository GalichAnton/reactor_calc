import type { FC } from 'react';
import React from 'react';

import { Tooltip as AntTooltip } from 'antd';

import type { TooltipProps } from 'antd';

type AppTooltipProps = TooltipProps & {};

export const Tooltip: FC<AppTooltipProps> = props => {
    const { children } = props;
    return <AntTooltip {...props}>{children}</AntTooltip>;
};
