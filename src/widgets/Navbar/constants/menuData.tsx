import type { HTMLAttributeAnchorTarget, ReactNode } from 'react';

import { DeploymentUnitOutlined, LineChartOutlined } from '@ant-design/icons';
import {
    getRouteNeutronCalc,
    getRouteReactivityCalc,
} from '@shared/constants/routes';

export type MenuDataItem = {
    title: string | 'divider';
    route?: string;
    icon?: ReactNode;
    target?: HTMLAttributeAnchorTarget;
    style?: any;
    children?: MenuDataItem[];
    isAllowed?: boolean;
};

const divider = {
    title: 'divider',
    style: { margin: '5px 0', background: '#fafafa' },
};

export const menuData: MenuDataItem[] = [
    {
        title: 'Реактивность',
        icon: <LineChartOutlined />,
        route: getRouteReactivityCalc(),
    },
    divider,
    {
        title: 'КЯР',
        icon: <DeploymentUnitOutlined />,
        route: getRouteNeutronCalc(),
    },
];
