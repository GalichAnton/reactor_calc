import type { ReactNode } from 'react';
import { useCallback, useState } from 'react';

import { GithubFilled } from '@ant-design/icons';
import { ThemeSwitcher } from '@features/themeSwitcher';
import { useTheme } from '@shared/lib/hooks';
import { Logo, Space } from '@shared/ui';
import { CollapseBtn } from '@shared/ui/CollapseBtn/CollapseBtn';
import { Button, Grid, Layout } from 'antd';
import classNames from 'classnames';

import styles from './MainLayout.module.css';

const { Header: LHeader, Footer, Sider, Content } = Layout;

interface MainLayoutProps {
    className?: string;
    content: ReactNode;
    sidebar: ReactNode;
}

export const MainLayout = (props: MainLayoutProps) => {
    const { className, sidebar, content } = props;
    const [collapse, setCollapse] = useState(false);
    const { isDark, theme } = useTheme();
    const screens = Grid.useBreakpoint();

    const toggleCollapse = useCallback(() => {
        setCollapse((prev) => !prev);
    }, []);

    return (
        <Layout className={classNames(styles.mainLayout, className)}>
            <Sider
                collapsed={!screens.xl || collapse}
                className={classNames(styles.sidebar, {
                    [styles.dark]: isDark(theme),
                })}
            >
                <Space direction={'vertical'} fullWidth>
                    <Logo collapse={!screens.xl || collapse} />
                    {sidebar}
                </Space>
                <CollapseBtn
                    collapse={!screens.xl || collapse}
                    toggleCollapse={toggleCollapse}
                />
            </Sider>
            <Layout>
                <LHeader
                    className={classNames(styles.header, {
                        [styles.dark]: isDark(theme),
                    })}
                >
                    <ThemeSwitcher style={{ marginLeft: 'auto' }} />
                </LHeader>
                <Content className={classNames(styles.content)}>
                    {content}
                </Content>

                <Footer
                    className={classNames(styles.footer, {
                        [styles.dark]: isDark(theme),
                    })}
                >
                    Developed by Anton Galich
                    <Button
                        type="text"
                        icon={<GithubFilled />}
                        href={'https://github.com/GalichAnton/reactor_calc'}
                    />
                </Footer>
            </Layout>
        </Layout>
    );
};
