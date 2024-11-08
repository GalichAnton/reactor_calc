import { CellTable } from '@features/KNR/calcFirst';
import {
    useCalcConcentrationParams,
    NuclearConcentrationsTable,
    useCalcCellParams,
    useCalcMacroscopicCrossSections,
    MacroscopicCrossSectionTable,
    useCalsModerationCapacity,
    ModerationCapacityTable,
} from '@features/KNR/calcFirst';
import { Col, Row } from 'antd';

export const CalcFirstTab = () => {
    useCalcCellParams();
    useCalcConcentrationParams();
    useCalcMacroscopicCrossSections();
    useCalsModerationCapacity();

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
            <Col span={24}>
                <ModerationCapacityTable />
            </Col>
        </Row>
    );
};
