import {
    AZParamsTable,
    CompanyTable,
    IsotopeCompositionTable,
    KefChart,
    KefZTable,
    useAzCalc,
    useCalcCompanyParams,
    useCalcIsotopes,
    useZrelationsCalc,
} from '@features/KNR/VVER/calc';
import { Space, Text } from '@shared/ui';
import { Col, Divider, Row } from 'antd';

export const SecondTab = () => {
    useAzCalc();
    useCalcIsotopes();
    useZrelationsCalc();
    useCalcCompanyParams();

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
            <Col span={24}>
                <Space fullWidth direction={'vertical'}>
                    <KefZTable />
                    <KefChart />
                    <CompanyTable />
                </Space>
            </Col>
            <Divider />
        </Row>
    );
};
