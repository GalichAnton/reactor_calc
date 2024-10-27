import React from 'react';

import { Menu } from 'antd';
import { useLocation } from 'react-router-dom';

import type { MenuItem } from '../types/menuItem';

import styles from './Navbar.module.css';
import { menuData } from '../constants/menuData';
import { processMenuData } from '../lib/processMenuItems';
import { useTheme } from '@shared/lib/hooks';

export const Navbar = () => {
    const { theme } = useTheme();
    const location = useLocation();

    const items: Array<MenuItem | undefined> = processMenuData(menuData);

    return (
        <Menu
            selectedKeys={[location.pathname]}
            items={items as MenuItem[]}
            theme={theme}
            className={styles.Navbar}
        />
    );
};
