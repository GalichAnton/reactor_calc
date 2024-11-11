import { useEffect, useMemo } from 'react';

import {
    useMainCalculations,
    useCalculationStore,
} from '@features/KNR/VVER/mainCalc';
import { Card, Space, Spinner } from '@shared/ui';
import { Presets } from '@widgets/KNR/Presets';
import { CalcFirstTab } from '@widgets/KNR/Tabs/ui/calcFirstTab.tsx';
import { NucConcentrationTab } from '@widgets/KNR/Tabs/ui/NucConcentrationTab.tsx';
import { SecondTab } from '@widgets/KNR/Tabs/ui/SecondTab.tsx';
import { Divider, Tabs, TabsProps } from 'antd';

import { InitialParamForm } from '../../Forms/InitialParamForm/InitialParamForm.tsx';

export const KNRTabs = () => {
    const { activeTab, isCalculated, isCalculating, setActiveTab } =
        useCalculationStore();

    const { calculate } = useMainCalculations();

    useEffect(() => {
        if (isCalculating) {
            calculate();
        }
    }, [isCalculating]);

    const items: TabsProps['items'] = useMemo(() => {
        return [
            {
                key: '0',
                label: 'Исходные данные',
                children: (
                    <Space fullWidth direction={'vertical'}>
                        <Presets />
                        <Divider />
                        <InitialParamForm />
                    </Space>
                ),
            },
            {
                key: '1',
                label: 'Расчет курсовой №1',
                disabled: !isCalculated,
                children: isCalculating ? <Spinner /> : <CalcFirstTab />,
            },
            {
                key: '2',
                label: 'Расчет курсовой №2',
                disabled: !isCalculated,
                children: <SecondTab />,
            },
            {
                key: '3',
                label: 'Ядерные концентрации от Z',
                disabled: !isCalculated,
                children: <NucConcentrationTab />,
            },
        ];
    }, [isCalculated, isCalculating]);

    return (
        <Card withShadow styles={{ body: { width: '100%' } }}>
            <Tabs
                defaultActiveKey="0"
                items={items}
                activeKey={activeTab}
                onChange={setActiveTab}
            />
        </Card>
    );
};
