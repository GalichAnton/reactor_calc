import { FC } from 'react';

import { Space, SpaceProps } from 'antd';

interface AppSpaceProps extends SpaceProps {
    fullWidth?: boolean;
}

export const AppSpace: FC<AppSpaceProps> = (props) => {
    const { fullWidth, children } = props;
    return (
        <Space
            style={{
                width: fullWidth ? '100%' : 'auto',
            }}
        >
            {children}
        </Space>
    );
};

export default AppSpace;
