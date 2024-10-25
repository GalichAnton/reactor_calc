import { GithubFilled } from '@ant-design/icons';
import { Chart, ReactivityForm } from '@widgets/Reactivity';
import { Button, Col, Layout, Row } from 'antd';

const ReactivityPage = () => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Layout.Content>
                `
                <Row gutter={[0, 16]}>
                    <Col span={24}>
                        <ReactivityForm />
                    </Col>
                    <Col span={24}>
                        <Chart />
                    </Col>
                </Row>
            </Layout.Content>
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

export default ReactivityPage;
