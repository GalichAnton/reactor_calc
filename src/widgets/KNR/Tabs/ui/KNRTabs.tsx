import { useEffect, useMemo } from 'react';

import { useMainCalculations } from '@features/KNR/calcFirst/lib/hooks/useMainCalculations.ts';
import { useCompanyParamsStore } from '@features/KNR/VVER/calc';
import { useCalculationStore } from '@features/KNR/VVER/calc/model/store/CalculationStore.ts';
import { useIsotopeCompositionStore } from '@features/KNR/VVER/calc/model/store/isotopeCompositionStore.ts';
import { useInitialParamsStore } from '@features/KNR/VVER/setInitialValues';
import { Card, Space, Spinner } from '@shared/ui';
import { Presets } from '@widgets/KNR/Presets';
import { CalcFirstTab } from '@widgets/KNR/Tabs/ui/calcFirstTab.tsx';
import { FuelTab } from '@widgets/KNR/Tabs/ui/FuelTab.tsx';
import { NucConcentrationTab } from '@widgets/KNR/Tabs/ui/NucConcentrationTab.tsx';
import { SecondTab } from '@widgets/KNR/Tabs/ui/SecondTab.tsx';
import { Divider, Tabs, TabsProps } from 'antd';

import { InitialParamForm } from '../../Forms/InitialParamForm/InitialParamForm.tsx';

export const KNRTabs = () => {
    const initialParamsFilled = useInitialParamsStore((state) => state.filled);
    const isotopeFilled = useIsotopeCompositionStore((state) => state.filled);
    const companyFilled = useCompanyParamsStore((state) => state.filled);
    const { activeTab, isCalculated, isCalculating, setActiveTab } =
        useCalculationStore();

    const { performAllCalculations } = useMainCalculations();

    useEffect(() => {
        if (isCalculating) {
            performAllCalculations();
        }
    }, [isCalculating]); // Если нужны зависимости, добавьте их сюда

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
                label: 'Данные после расчета курсовой №1',
                disabled: !isCalculated,
                children: isCalculating ? <Spinner /> : <CalcFirstTab />,
            },
            {
                key: '2',
                label: 'Расчет второй',
                disabled: !initialParamsFilled,
                children: <SecondTab />,
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
