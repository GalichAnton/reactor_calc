import { useMemo } from 'react';

import { useCompanyParamsStore } from '@features/KNR/VVER/calc';
import { useIsotopeCompositionStore } from '@features/KNR/VVER/calc/model/store/isotopeCompositionStore.ts';
import {
    useInitialParamsStore,
    useReactorStore,
} from '@features/KNR/VVER/setInitialValues';
import { Card, Space } from '@shared/ui';
import { Presets } from '@widgets/KNR/Presets';
import { CalcFirstTab } from '@widgets/KNR/Tabs/ui/calcFirstTab.tsx';
import { FuelTab } from '@widgets/KNR/Tabs/ui/FuelTab.tsx';
import { Divider, Tabs, TabsProps } from 'antd';

import { KefZTab } from './KefZTab.tsx';
import { NucConcentrationTab } from './NucConcentrationTab.tsx';
import { InitialParamForm } from '../../Forms/InitialParamForm/InitialParamForm.tsx';

export const KNRTabs = () => {
    const initialParamsFilled = useInitialParamsStore((state) => state.filled);
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
                        <InitialParamForm />
                    </Space>
                ),
            },
            {
                key: '1',
                label: 'Данные после расчета №1',
                disabled: !initialParamsFilled,
                children: <CalcFirstTab />,
            },
            {
                key: '2',
                label: 'Kef и Z',
                disabled: !isotopeFilled,
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
    }, [reactorFilled, isotopeFilled, initialParamsFilled]);

    return (
        <Card withShadow styles={{ body: { width: '100%' } }}>
            <Tabs defaultActiveKey="0" items={items} />
        </Card>
    );
};
