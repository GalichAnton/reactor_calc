import {
    ConcentrationsChart,
    useZRelationsStore,
    NucConcentrationTable,
} from '@features/KNR/calcSecond';
import { Col, Row } from 'antd';

export const NucConcentrationTab = () => {
    const { zRelationsParams } = useZRelationsStore();

    return (
        <Row gutter={[8, 8]}>
            <Col span={24}>
                <NucConcentrationTable zRelationsParams={zRelationsParams} />
            </Col>

            <Col span={24}>
                <ConcentrationsChart zRelationsParams={zRelationsParams} />
            </Col>
        </Row>
    );
};
