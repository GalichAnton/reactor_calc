import { GithubFilled } from '@ant-design/icons';
import { Button, Col, Layout, Row } from 'antd';

import Chart from '../components/chart/Chart.tsx';
import AppForm from '../components/form/AppForm.tsx';

const Main = () => {
    return (
        <Layout>
            <Layout.Content>
                <Row gutter={[0, 16]}>
                    <Col span={24}>
                        <AppForm />
                    </Col>
                    <Col span={24}>
                        <Chart />
                    </Col>
                </Row>
            </Layout.Content>
            <Layout.Footer>
                {' '}
                Developed by Anton Galich{' '}
                <Button
                    type="text"
                    icon={<GithubFilled />}
                    href={'https://github.com/GalichAnton/reactor_calc'}
                />
            </Layout.Footer>
        </Layout>
    );
};

export default Main;
