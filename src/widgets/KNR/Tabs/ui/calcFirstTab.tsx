import {
    AverageMacroCrossSectionTable,
    AverageMicroCrossSectionTable,
    CellTable,
    LossFactorTable,
    NeutronGasTemperatureTable,
    TransportMacroCrossSectionsTable,
    useCalcAverageCrossSections,
    useCalcLossFactorParams,
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
import { TwoZoneTable, useCalcTwoZoneParams } from '@features/KNR/twoZone';
import { Text } from '@shared/ui';
import { Col, Divider, Row } from 'antd';

export const CalcFirstTab = () => {
    useCalcCellParams();
    useCalcConcentrationParams();
    useCalcMacroscopicCrossSections();
    useCalsModerationCapacity();
    useCalcNeutronGasParams();
    useCalcAverageCrossSections();
    useCalcTransportMacroSections();
    useCalcTwoZoneParams();
    useCalcLossFactorParams();

    return (
        <Row gutter={[8, 10]}>
            <Col span={24}>
                <Text>
                    <strong>
                        1. НАХОЖДЕНИЕ ОБЪЕМНЫХ ДОЛЕЙ КОМПОНЕНТ, ВХОДЯЩИХ В АЗ
                        РЕАКТОРА
                    </strong>
                </Text>
                <CellTable />
            </Col>
            <Divider />
            <Col span={24}>
                <Text>
                    <strong>
                        2. ОПРЕДЕЛЕНИЕ ЯДЕРНЫХ КОНЦЕТРАЦИЙ ОТДЕЛЬНЫХ
                        КОМПОНЕНТОВ, ВХОДЯЩИХ В АЗ РЕАКТОРА
                    </strong>
                </Text>
                <NuclearConcentrationsTable />
            </Col>
            <Col span={24}>
                <Text>
                    <strong>
                        2.1 Определение эффективных макроскопических сечений
                    </strong>
                </Text>
                <MacroscopicCrossSectionTable />
            </Col>
            <Divider />
            <Col span={24}>
                <Text>
                    <strong>2.2 Определение замедляющих способностей</strong>
                </Text>
                <ModerationCapacityTable />
            </Col>
            <Divider />
            <Col span={24}>
                <Text>
                    <strong>3 РАСЧЕТ ТЕМПЕРАТУРЫ НЕЙТРОННОГО ГАЗА</strong>
                </Text>
                <NeutronGasTemperatureTable />
            </Col>
            <Divider />
            <Text>
                <strong>
                    4 УСРЕДНЕНИЕ СЕЧЕНИЙ В ТЕПЛОВОЙ ГРУППЕ ПО СПЕКТРУ МАКСВЕЛЛА
                </strong>
            </Text>
            <Col span={24}>
                <Text>
                    <strong>4.1 Усреднение микроскопических сечений</strong>
                </Text>
                <AverageMicroCrossSectionTable />
            </Col>
            <Col span={24}>
                <Text>
                    <strong>4.2 Усреднение макроскопических сечений</strong>
                </Text>
                <AverageMacroCrossSectionTable />
            </Col>
            <Col span={24}>
                <Text>
                    <strong>
                        4.3 Определение транспортных макроскопических сечений
                    </strong>
                </Text>
                <TransportMacroCrossSectionsTable />
            </Col>
            <Divider />
            <Text>
                <strong>
                    5 ОПРЕДЕЛЕНИЕ МАКРОСКОПИЧЕСКИХ СЕЧЕНИЙ ДЛЯ РАСЧЕТНОЙ
                    ДВУХЗОННОЙ ЯЧЕЙКИ
                </strong>
            </Text>
            <Col span={24}>
                <TwoZoneTable />
            </Col>
            <Divider />
            <Col span={24}>
                <Text>
                    <strong>6 ОПРЕДЕЛЕНИЕ КОЭФФИЦИЕНТА ПРОИГРЫША</strong>
                </Text>
                <LossFactorTable />
            </Col>
        </Row>
    );
};
