import { ThemeSwitcher } from '@features/themeSwitcher';
import { useTheme } from '@shared/lib/hooks';
import classNames from 'classnames';

import styles from './Header.module.css';

export const Header = () => {
    const { isDark, theme } = useTheme();

    return (
        <div
            className={classNames(styles.header, {
                [styles.dark]: isDark(theme),
            })}
        >
            <ThemeSwitcher />
        </div>
    );
};
