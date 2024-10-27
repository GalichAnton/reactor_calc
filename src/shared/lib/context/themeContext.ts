import { createContext } from 'react';

import type { Themes } from '@app/themeProvider/types/themes';

export interface ThemeContextProps {
    theme: Themes;
    setTheme: (mode: Themes) => void;
}

export const ThemeContext = createContext<ThemeContextProps>(
    {} as ThemeContextProps,
);
