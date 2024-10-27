import { useContext } from 'react';

import { LOCAL_STORAGE_THEME_KEY } from '@shared/constants/localStorage';
import { appTheme } from '@shared/constants/theme';
import { ThemeContext } from '@shared/lib/context/themeContext';

import type { Themes } from '@app/themeProvider/types/themes';

interface UseThemeResult {
    toggleThemeMode: (theme: Themes) => void;
    theme: Themes;
    isDark: (theme: Themes) => boolean;
    isLight: (theme: Themes) => boolean;
}

export const useTheme = (): UseThemeResult => {
    const { theme, setTheme } = useContext(ThemeContext);

    const toggleThemeMode = () => {
        const newTheme: Themes =
            theme === appTheme.dark ? appTheme.light : appTheme.dark;

        setTheme(newTheme);
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
    };

    const isDark = (theme: Themes) => {
        return theme === appTheme.dark;
    };

    const isLight = (theme: Themes) => {
        return theme === appTheme.light;
    };

    return { theme, toggleThemeMode, isDark, isLight };
};
