import { CellTable } from '@features/KNR/calcFirst';
import {
    useCalcConcentrationParams,
    NuclearConcentrationsTable,
    useCalcCellParams,
    useCalcMacroscopicCrossSections,
    MacroscopicCrossSectionTable,
} from '@features/KNR/calcFirst';
import { Col, Row } from 'antd';

export const CalcFirstTab = () => {
    useCalcCellParams();
    useCalcConcentrationParams();
    useCalcMacroscopicCrossSections();

    return (
        <Row gutter={[8, 8]}>
            <Col span={24}>
                <CellTable />
            </Col>
            <Col span={24}>
                <NuclearConcentrationsTable />
            </Col>
            <Col span={24}>
                <MacroscopicCrossSectionTable />
            </Col>
        </Row>
    );
};
