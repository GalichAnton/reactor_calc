import type { FC } from 'react';

import { Space as AntSpace } from 'antd';
import classNames from 'classnames';

import type { SpaceProps as AntSpaceProps } from 'antd/lib/space';

import styles from './Space.module.css';

interface SpaceProps extends AntSpaceProps {
    fullWidth?: boolean;
}

export const Space: FC<SpaceProps> = (props) => {
    const { fullWidth, className, size = 'small', ...otherProps } = props;

    const mods: Record<string, boolean> = {
        [styles.fullWidth]: !!fullWidth,
    };
    return (
        <AntSpace
            className={classNames(className, mods)}
            size={size}
            {...otherProps}
        />
    );
};
