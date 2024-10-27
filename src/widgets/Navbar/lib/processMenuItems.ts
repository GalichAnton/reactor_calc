import type { MenuDataItem } from '../constants/menuData';

import { getItem } from './getMenuItem';
import { NavbarRoute } from '../ui/NavbarRoute';

export function processMenuData(menuData: MenuDataItem[]) {
    function processItem(key: string, value: any, i: number) {
        if (value.isAllowed !== undefined && !value.isAllowed) {
            return;
        }

        if (value.title === 'divider') {
            return getItem(
                undefined,
                `divider-${i}`,
                undefined,
                'divider',
                undefined,
                value.style,
            );
        }

        const children = value.children?.map(
            (child: MenuDataItem, index: number) =>
                processItem(child.route ?? String(index), child, index),
        );

        return getItem(
            NavbarRoute({
                route: value.route,
                text: value.title,
                target: value.target,
            }),
            value.route ?? key,
            value.icon,
            undefined,
            children,
            value.style,
        );
    }

    return menuData.map((item, i) => processItem(item.title, item, i));
}
