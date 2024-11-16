import {
    AZParamsTable,
    CompanyTable,
    FuelTable,
    IsotopeCompositionTable,
    KefChart,
    KefZTable,
} from '@features/KNR/calcSecond';
import { CompensationTable } from '@features/KNR/calcSecond/ui/tables/compensationTable.tsx';
import { ReactivityTable } from '@features/KNR/calcSecond/ui/tables/ReactivityTable.tsx';
import { Space, Text } from '@shared/ui';
import { Col, Divider, Row } from 'antd';

export const SecondTab = () => {
    return (
        <Row gutter={[8, 10]}>
            <Col span={24}>
                <Text>
                    <strong>
                        1. РАСЧЕТ ФИЗИЧЕСКИХ ХАРАКТЕРИСТИК АЗ РЕАКТОРА
                    </strong>
                </Text>
                <AZParamsTable />
            </Col>
            <Divider />
            <Col span={24}>
                <Text>
                    <strong>
                        2. РАСЧЕТ ИЗМЕНЕНИЯ ИЗОТОПНОГО СОСТАВА ГОРЮЧЕГО
                    </strong>
                </Text>
                <IsotopeCompositionTable />
            </Col>
            <Divider />
            <Col span={24}>
                <Space fullWidth direction={'vertical'}>
                    <Text>
                        <strong>
                            3. ОПРЕДЕЛЕНИЕ КОЭФФИЦИЕНТА РАЗМНОЖЕНИЯ НЕЙТРОНОВ В
                            ПРОЦЕССЕ ВЫГОРАНИЯ
                        </strong>
                    </Text>
                    <KefZTable />
                    <KefChart />
                    <CompanyTable />
                </Space>
            </Col>
            <Col span={24}>
                <FuelTable />
            </Col>
            <Divider />
            <Col span={24}>
                <Text>
                    <strong>
                        4. ОПРЕДЕЛЕНИЕ ТЕМПЕРАТУРНОГО ЭФФЕКТА И КОЭФФИЦИЕНТА
                        РЕАКТИВНОСТИ
                    </strong>
                </Text>
                <ReactivityTable />
            </Col>
            <Divider />
            <Col span={24}>
                <Text>
                    <strong>5. РАСЧЕТ КОМПЕНСИРУЕМОСТИ РЕАКТОРА</strong>
                </Text>
                <CompensationTable />
            </Col>
        </Row>
    );
};
