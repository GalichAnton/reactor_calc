import type React from 'react';

import type { MenuItem } from '@widgets/Navbar/types/menuItem';

export function getItem(
    label: React.ReactNode,
    key?: React.Key,
    icon?: React.ReactNode,
    type?: 'group' | 'divider',
    children?: MenuItem[],
    style?: any
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
        style,
    } as MenuItem;
}
