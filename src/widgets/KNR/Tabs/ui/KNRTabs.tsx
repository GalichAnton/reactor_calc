import { useMemo } from 'react';

import { AZParamsTable } from '@features/KNR/calcAz';
import { Card, Space, Text } from '@shared/ui';
import {
    TvsCharacteristicForm,
    AZCharacteristicsForm,
    ReactorCharacteristic,
} from '@widgets/KNR/Forms';
import { Presets } from '@widgets/KNR/Presets';
import { Col, Divider, Row, Tabs, TabsProps } from 'antd';

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
                    </Row>
                ),
            },
        ];
    }, []);

    return (
        <Card withShadow styles={{ body: { width: '100%' } }}>
            <Tabs defaultActiveKey="0" items={items} />
        </Card>
    );
};
