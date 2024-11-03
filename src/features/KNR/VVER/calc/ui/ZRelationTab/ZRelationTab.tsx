import { useZrelationsCalc } from '@features/KNR/VVER/calc/lib/hooks/useZrelationsCalc.tsx';
import { useZRelationsStore } from '@features/KNR/VVER/calc/model/store/zRelationStore.ts';
import { ZRelationChart } from '@features/KNR/VVER/calc/ui/ZRelationTab/ZRelationChart.tsx';
import { ZRelationsTable } from '@features/KNR/VVER/calc/ui/ZRelationTab/ZRelationsTable.tsx';
import { Col, Row } from 'antd';

export const ZRelationTab = () => {
    const { zRelationsParams } = useZRelationsStore();
    useZrelationsCalc();

    return (
        <Row gutter={[8, 8]}>
            <Col span={24}>
                <ZRelationsTable zRelationsParams={zRelationsParams} />
            </Col>

            <Col span={24}>
                <ZRelationChart zRelationsParams={zRelationsParams} />
            </Col>
        </Row>
    );
};
