import { FC } from 'react';

import { Button, ButtonProps } from 'antd';
import { Tooltip } from 'antd';

interface AppButtonProps extends ButtonProps {
    tooltipText?: string;
}

export const AppButton: FC<AppButtonProps> = (props) => {
    const { tooltipText, children, ...rest } = props;

    if (tooltipText) {
        return (
            <Tooltip title={tooltipText}>
                <Button {...rest}>{children}</Button>
            </Tooltip>
        );
    }

    return <Button {...rest}>{children}</Button>;
};
