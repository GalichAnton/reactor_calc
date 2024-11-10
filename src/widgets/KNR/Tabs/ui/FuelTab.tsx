import { FuelTable } from '@features/KNR/calcSecond';
import { Col, Row } from 'antd';

export const FuelTab = () => {
    return (
        <Row gutter={[8, 8]}>
            <Col span={24}>
                <FuelTable />
            </Col>
        </Row>
    );
};
