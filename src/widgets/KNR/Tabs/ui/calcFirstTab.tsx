import { CellTable } from '@features/KNR/calcFirst';
import {
    useCalcConcentrationParams,
    NuclearConcentrationsTable,
    useCalcCellParams,
} from '@features/KNR/calcFirst';
import { Col, Row } from 'antd';

export const CalcFirstTab = () => {
    useCalcCellParams();
    useCalcConcentrationParams();

    return (
        <Row gutter={[8, 8]}>
            <Col span={24}>
                <CellTable />
            </Col>
            <Col span={24}>
                <NuclearConcentrationsTable />
            </Col>
        </Row>
    );
};
