import {
    KefChart,
    useZrelationsCalc,
    useZRelationsStore,
    KefZTable,
} from '@features/KNR/VVER/calc';
import { Col, Row } from 'antd';

export const KefZTab = () => {
    const { zRelationsParams } = useZRelationsStore();
    useZrelationsCalc();

    return (
        <Row gutter={[8, 8]}>
            <Col span={24}>
                <KefZTable zRelationsParams={zRelationsParams} />
            </Col>

            <Col span={24}>
                <KefChart zRelationsParams={zRelationsParams} />
            </Col>
        </Row>
    );
};
