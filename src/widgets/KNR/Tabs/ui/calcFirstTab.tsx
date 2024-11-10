import {
    AverageMacroCrossSectionTable,
    AverageMicroCrossSectionTable,
    CellTable,
    KInfTable,
    LossFactorTable,
    MacroscopicCrossSectionTable,
    ModerationCapacityTable,
    NeutronAgeTable,
    NeutronGasTemperatureTable,
    NuclearConcentrationsTable,
    ReactorCriticalityTable,
    TransportMacroCrossSectionsTable,
    TwoZoneTable,
} from '@features/KNR/calcFirst';
import { Text } from '@shared/ui';
import { Col, Divider, Row } from 'antd';

export const CalcFirstTab = () => {
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
            <Divider />
            <Col span={24}>
                <Text>
                    <strong>
                        7 ОПРЕДЕЛЕНИЕ СОМНОЖИТЕЛЕЙ КОЭФФИЦИЕНТА РАЗМНОЖЕНИЯ В
                        БЕСКОНЕЧНОЙ СРЕДЕ
                    </strong>
                </Text>
                <KInfTable />
            </Col>
            <Divider />
            <Col span={24}>
                <Text>
                    <strong>
                        8 РАСЧЕТ ДЛИНЫ ДИФФУЗИИ, ВОЗВРАСТА ТЕПЛОВОГО НЕЙТРОНА
                    </strong>
                </Text>
                <NeutronAgeTable />
            </Col>
            <Divider />
            <Col span={24}>
                <Text>
                    <strong>
                        9 ОПРЕДЕЛЕНИЕ МАТЕРИАЛЬНОГО ПАРАМЕТРА, ОЦЕНКА
                        КРИТИЧЕСКИХ РАЗМЕРОВ АЗ
                    </strong>
                </Text>
                <ReactorCriticalityTable />
            </Col>
        </Row>
    );
};
