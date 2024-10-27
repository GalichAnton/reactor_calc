import type { FC, ReactNode } from 'react';

import { Space } from '@shared/ui/Space/Space';

import styles from './Page.module.css';

interface PageProps {
    children: ReactNode;
    dataTestId?: string;
}

export const Page: FC<PageProps> = (props) => {
    const { children, dataTestId } = props;

    return (
        <Space
            direction={'vertical'}
            size={'small'}
            className={styles.page}
            data-testid={dataTestId}
        >
            {children}
        </Space>
    );
};
