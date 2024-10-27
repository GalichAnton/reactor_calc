import type { FC } from 'react';
import React, { memo } from 'react';

import { Select as AntSelect, Tag } from 'antd';
import classNames from 'classnames';

import type { SelectExtendedProps } from '../../types';
import type { CustomTagProps } from 'rc-select/lib/BaseSelect';

import styles from './Select.module.css';
import { Text } from '../Typography/Typography';
import { Space } from '@shared/ui';

export const Select: FC<SelectExtendedProps> = memo(props => {
    const {
        className,
        setClosable,
        tag,
        tagRenderOption = 'value',
        onTagClick,
        title,
        ...otherProps
    } = props;

    const tagRender = (props: CustomTagProps) => {
        const { value, label, closable, onClose } = props;

        const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
            event.preventDefault();
            event.stopPropagation();
        };

        const isClosable = setClosable ? setClosable(value) : closable;

        return (
            <Tag
                onMouseDown={onPreventMouseDown}
                closable={isClosable}
                onClose={onClose}
                style={{ marginRight: 3, borderColor: '#a7f1cc' }}
                onClick={onTagClick ? () => onTagClick(value) : undefined}
            >
                {tag ? tag(label) : tagRenderOption === 'value' ? value : label}
            </Tag>
        );
    };

    return (
        <Space direction={'vertical'} size={'small'} fullWidth>
            {title && <Text>{title}</Text>}
            <AntSelect
                className={classNames(styles.Select, className)}
                optionLabelProp='label'
                tagRender={tagRender}
                {...otherProps}
            />
        </Space>
    );
});
