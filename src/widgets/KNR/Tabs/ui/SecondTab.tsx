import {
    AZParamsTable,
    IsotopeCompositionTable,
    useAzCalc,
    useCalcIsotopes,
} from '@features/KNR/VVER/calc';
import { Text } from '@shared/ui';
import { Col, Divider, Row } from 'antd';

export const SecondTab = () => {
    useAzCalc();
    useCalcIsotopes();

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
        </Row>
    );
};
