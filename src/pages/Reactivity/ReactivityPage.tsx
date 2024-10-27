import { Page } from '@widgets/Page';
import { Chart, ReactivityForm } from '@widgets/Reactivity';
import { Col, Row } from 'antd';

const ReactivityPage = () => {
    return (
        <Page>
            <Row gutter={[0, 16]}>
                <Col span={24}>
                    <ReactivityForm />
                </Col>
                <Col span={24}>
                    <Chart />
                </Col>
            </Row>
        </Page>
    );
};

export default ReactivityPage;
