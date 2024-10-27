import type { FC } from 'react';
import React from 'react';

import { Spin } from 'antd';
import classNames from 'classnames';

import type { SpinProps } from 'antd/es/spin';

import styles from './Spinner.module.css';

interface SpinnerProps extends SpinProps {}

export const Spinner: FC<SpinnerProps> = props => {
    const { className, ...otherProps } = props;
    return (
        <div className={classNames(styles.Spinner, className)}>
            <Spin {...otherProps} />
        </div>
    );
};
