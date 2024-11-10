import { KefChart, KefZTable, CompanyTable } from '@features/KNR/calcSecond';
import { Space } from '@shared/ui';
import { Col, Row } from 'antd';

export const KefZTab = () => {
    return (
        <Row gutter={[8, 8]}>
            <Col span={24}>
                <KefZTable />
            </Col>

            <Col span={24}>
                <Space fullWidth direction={'vertical'}>
                    <KefChart />
                    <CompanyTable />
                </Space>
            </Col>
        </Row>
    );
};
