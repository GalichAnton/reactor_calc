import { Col, Row } from 'antd';

import Chart from '../components/chart/Chart.tsx';
import AppForm from '../components/form/AppForm.tsx';

const Main = () => {
    return (
        <Row gutter={[0, 16]}>
            <Col span={24}>
                <AppForm />
            </Col>
            <Col span={24}>
                <Chart />
            </Col>
        </Row>
    );
};

export default Main;
