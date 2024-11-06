import { useMemo } from 'react';

import {
    AZParamsTable,
    IsotopeCompositionTable,
    useCompanyParamsStore,
} from '@features/KNR/VVER/calc';
import { useAZPhysParamsStore } from '@features/KNR/VVER/calc/model/store/azPhysParamsStore.ts';
import { useIsotopeCompositionStore } from '@features/KNR/VVER/calc/model/store/isotopeCompositionStore.ts';
import { useReactorStore } from '@features/KNR/VVER/setInitialValues';
import { Card, Space, Text } from '@shared/ui';
import {
    TVSCharacteristicForm,
    AZCharacteristicsForm,
    ReactorCharacteristic,
} from '@widgets/KNR/Forms';
import { Presets } from '@widgets/KNR/Presets';
import { FuelTab } from '@widgets/KNR/Tabs/ui/FuelTab.tsx';
import { Col, Divider, Row, Tabs, TabsProps } from 'antd';

import { KefZTab } from './KefZTab.tsx';
import { NucConcentrationTab } from './NucConcentrationTab.tsx';

export const KNRTabs = () => {
    const AZFilled = useAZPhysParamsStore((state) => state.filled);
    const isotopeFilled = useIsotopeCompositionStore((state) => state.filled);
    const reactorFilled = useReactorStore((state) => state.filled);
    const companyFilled = useCompanyParamsStore((state) => state.filled);

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
                disabled: !reactorFilled,
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
                disabled: !AZFilled || !isotopeFilled,
                children: <KefZTab />,
            },
            {
                key: '3',
                label: 'Ядерные концентрации от Z',
                disabled: !isotopeFilled,
                children: <NucConcentrationTab />,
            },
            {
                key: '4',
                label: 'Топливо',
                disabled: !isotopeFilled && !companyFilled,
                children: <FuelTab />,
            },
        ];
    }, [reactorFilled, isotopeFilled, AZFilled]);

    return (
        <Card withShadow styles={{ body: { width: '100%' } }}>
            <Tabs defaultActiveKey="0" items={items} />
        </Card>
    );
};
