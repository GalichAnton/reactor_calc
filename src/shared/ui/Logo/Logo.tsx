import type { FC } from 'react';

import { LogoSbor } from '@shared/assets/LogoSbor.tsx';
import { Space, Text } from '@shared/ui';
import classNames from 'classnames';

import styles from './Logo.module.css';

interface LogoProps {
    collapse: boolean;
    className?: string;
}

export const Logo: FC<LogoProps> = (props) => {
    const { collapse, className } = props;

    return (
        <div
            className={classNames(styles.logo, className, {
                [styles.collapsed]: collapse,
            })}
            data-testid={'headerLogo'}
        >
            <Space size={'small'}>
                <LogoSbor />
                {!collapse && (
                    <Text className={styles.text} ellipsis>
                        ИЯЭ
                    </Text>
                )}
            </Space>
        </div>
    );
};
