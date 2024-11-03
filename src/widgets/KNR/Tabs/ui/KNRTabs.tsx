import { useMemo } from 'react';

import { ZRelationTab } from '@features/KNR/VVER/calc/ui/ZRelationTab/ZRelationTab.tsx';
import { Card, Space, Text } from '@shared/ui';
import {
    TvsCharacteristicForm,
    AZCharacteristicsForm,
    ReactorCharacteristic,
} from '@widgets/KNR/Forms';
import { Presets } from '@widgets/KNR/Presets';
import { Col, Divider, Row, Tabs, TabsProps } from 'antd';

import {
    AZParamsTable,
    IsotopeCompositionTable,
} from '../../../../features/KNR/VVER/calc';

export const KNRTabs = () => {
    const items: TabsProps['items'] = useMemo(() => {
        return [
            {
                key: '0',
                label: 'Исходные данные',
                children: (
                    <Space fullWidth direction={'vertical'}>
                        <Presets />
                        <Divider />
                        <Text>
                            <strong>Характеристики реактора</strong>
                        </Text>
                        <ReactorCharacteristic />
                        <Divider />
                        <Text>
                            <strong>Характеристики активной зоны</strong>
                        </Text>
                        <AZCharacteristicsForm />
                        <Divider />
                        <Text>
                            <strong>Характеристики ТВС</strong>
                        </Text>
                        <TvsCharacteristicForm />
                    </Space>
                ),
            },
            {
                key: '1',
                label: 'Данные после расчета',
                children: (
                    <Row gutter={[8, 8]}>
                        <Col span={24}>
                            <AZParamsTable />
                        </Col>
                        <Col span={24}>
                            <IsotopeCompositionTable />
                        </Col>
                    </Row>
                ),
            },
            {
                key: '2',
                label: 'Зависимости от z',
                children: <ZRelationTab />,
            },
        ];
    }, []);

    return (
        <Card withShadow styles={{ body: { width: '100%' } }}>
            <Tabs defaultActiveKey="0" items={items} />
        </Card>
    );
};
