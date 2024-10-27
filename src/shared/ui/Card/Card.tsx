import type { ComponentProps, FC, ReactNode } from 'react';

import { Card as AntdCard } from 'antd';
import classNames from 'classnames';

import type { CardInterface } from 'antd/es/card';

import styles from './Card.module.css';

interface CardProps extends ComponentProps<CardInterface> {
    isLayoutCard?: boolean;
    withShadow?: boolean;
    withoutPadding?: boolean;
    fullWidth?: boolean;
    fullHeight?: boolean;
    children: ReactNode;
}

export const Card: FC<CardProps> = (props) => {
    const {
        isLayoutCard,
        withoutPadding,
        withShadow,
        fullWidth,
        fullHeight,
        children,
        className,
        ...otherProps
    } = props;

    const mods: Record<string, boolean> = {
        [styles.isLayout]: !!isLayoutCard,
        [styles.withoutPadding]: !!withoutPadding,
        [styles.withShadow]: !!withShadow,
        [styles.fullWidth]: !!fullWidth,
        [styles.fullHeight]: !!fullHeight,
    };

    return (
        <AntdCard className={classNames(className, mods)} {...otherProps}>
            {children}
        </AntdCard>
    );
};
