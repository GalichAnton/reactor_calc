import type { FC, ReactNode } from 'react';
import { useEffect, useMemo, useState } from 'react';

import { LOCAL_STORAGE_THEME_KEY } from '@shared/constants/localStorage';
import { appTheme } from '@shared/constants/theme';
import { ThemeContext } from '@shared/lib/context/themeContext';
import { ConfigProvider } from 'antd';
import ruRU from 'antd/lib/locale/ru_RU';
import { merge } from 'lodash';

import type { Themes } from '../types/themes';
import type { ConfigProviderProps } from 'antd/es/config-provider';

import { commonConfig, darkConfig, lightConfig } from '../constants/theme';

interface ThemeProviderProps {
    initialTheme?: Themes;
    children: ReactNode;
}

const formConfig: ConfigProviderProps['form'] = {
    validateMessages: {
        required: 'Необходимо заполнить поле "${label}"',
    },
};

const fallbackTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Themes;

export const ThemeProvider: FC<ThemeProviderProps> = (props) => {
    const { children, initialTheme } = props;
    const [isThemeInited, setThemeInited] = useState(false);
    const [theme, setTheme] = useState<Themes>(
        initialTheme || fallbackTheme || appTheme.light,
    );
    const colorConfig = theme === appTheme.dark ? darkConfig : lightConfig;
    const themeConfig = merge({}, commonConfig, colorConfig);

    useEffect(() => {
        if (!isThemeInited && initialTheme) {
            setTheme(initialTheme);
            setThemeInited(true);
        }
    }, [initialTheme, isThemeInited]);

    const defaultProps = useMemo(
        () => ({
            theme,
            setTheme,
        }),
        [theme],
    );

    return (
        <ThemeContext.Provider value={defaultProps}>
            <ConfigProvider locale={ruRU} theme={themeConfig} form={formConfig}>
                {children}
            </ConfigProvider>
        </ThemeContext.Provider>
    );
};
