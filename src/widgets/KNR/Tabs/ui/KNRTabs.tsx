import { useMemo } from 'react';

import {
    AZParamsTable,
    IsotopeCompositionTable,
} from '@features/KNR/VVER/calc';
import { Card, Space, Text } from '@shared/ui';
import {
    TVSCharacteristicForm,
    AZCharacteristicsForm,
    ReactorCharacteristic,
} from '@widgets/KNR/Forms';
import { Presets } from '@widgets/KNR/Presets';
import { Col, Divider, Row, Tabs, TabsProps } from 'antd';

import { KefZTab } from './KefZTab.tsx';
import { NucConcentrationTab } from './NucConcentrationTab.tsx';

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
                        <TVSCharacteristicForm />
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
                label: 'Kef и Z',
                children: <KefZTab />,
            },
            {
                key: '3',
                label: 'Ядерные концентрации от Z',
                children: <NucConcentrationTab />,
            },
        ];
    }, []);

    return (
        <Card withShadow styles={{ body: { width: '100%' } }}>
            <Tabs defaultActiveKey="0" items={items} />
        </Card>
    );
};
