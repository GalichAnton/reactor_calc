import {
    AverageMacroCrossSectionTable,
    AverageMicroCrossSectionTable,
    CellTable,
    NeutronGasTemperatureTable,
    TransportMacroCrossSectionsTable,
    useCalcAverageCrossSections,
    useCalcNeutronGasParams,
    useCalcTransportMacroSections,
} from '@features/KNR/calcFirst';
import {
    useCalcConcentrationParams,
    NuclearConcentrationsTable,
    useCalcCellParams,
    useCalcMacroscopicCrossSections,
    MacroscopicCrossSectionTable,
    useCalsModerationCapacity,
    ModerationCapacityTable,
} from '@features/KNR/calcFirst';
import { Col, Divider, Row } from 'antd';

export const CalcFirstTab = () => {
    useCalcCellParams();
    useCalcConcentrationParams();
    useCalcMacroscopicCrossSections();
    useCalsModerationCapacity();
    useCalcNeutronGasParams();
    useCalcAverageCrossSections();
    useCalcTransportMacroSections();

    return (
        <Row gutter={[8, 8]}>
            <Col span={24}>
                <CellTable />
            </Col>
            <Divider />
            <Col span={24}>
                <NuclearConcentrationsTable />
            </Col>
            <Divider />
            <Col span={24}>
                <MacroscopicCrossSectionTable />
            </Col>
            <Divider />
            <Col span={24}>
                <ModerationCapacityTable />
            </Col>
            <Col span={24}>
                <NeutronGasTemperatureTable />
            </Col>
            <Col span={24}>
                <AverageMicroCrossSectionTable />
            </Col>
            <Col span={24}>
                <AverageMacroCrossSectionTable />
            </Col>
            <Col span={24}>
                <TransportMacroCrossSectionsTable />
            </Col>
        </Row>
    );
};
