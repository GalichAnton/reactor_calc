import { CSSProperties, FC } from 'react';

import { MoonFilled } from '@shared/assets/MoonFilled';
import { SunOutlined } from '@shared/assets/SunOutlined';
import { useTheme } from '@shared/lib/hooks';
import { Button } from '@shared/ui';

interface ThemeSwitcherProps {
    style?: CSSProperties;
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = (props) => {
    const { style } = props;
    const { theme, toggleThemeMode, isLight } = useTheme();

    return (
        <Button
            icon={isLight(theme) ? <MoonFilled /> : <SunOutlined />}
            onClick={() => toggleThemeMode(theme)}
            type={'text'}
            size={'large'}
            tooltip={isLight(theme) ? 'Темная тема' : 'Светлая тема'}
            style={style}
        />
    );
};
