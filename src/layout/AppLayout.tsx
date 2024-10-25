import { FC, ReactNode } from 'react';

import { GithubFilled } from '@ant-design/icons';
import { Button, Layout } from 'antd';

interface AppLayoutProps {
    content: ReactNode;
}

export const AppLayout: FC<AppLayoutProps> = (props) => {
    const { content } = props;

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Layout.Content>{content}</Layout.Content>
            <Layout.Footer style={{ textAlign: 'center' }}>
                Developed by Anton Galich
                <Button
                    type="text"
                    icon={<GithubFilled />}
                    href={'https://github.com/GalichAnton/reactor_calc'}
                />
            </Layout.Footer>
        </Layout>
    );
};
