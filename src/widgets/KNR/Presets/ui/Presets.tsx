import { useEffect } from 'react';

import { REACTOR_TYPES } from '@entities/reactor';
import { useInitialParamsStore } from '@features/KNR/VVER/setInitialValues';
import { Select, Space, Text } from '@shared/ui';
import { VVER_440 } from '@widgets/KNR/Presets/constants/VVER_440.ts';
import { Radio, RadioChangeEvent } from 'antd';
import { DefaultOptionType } from 'antd/es/select';

import { VVER_1300 } from '../constants/VVER_1300.ts';

export const Presets = () => {
    const {
        setInitialParams,
        setInitialParam,
        initialParams: { reactorType, nominalPower },
    } = useInitialParamsStore();

    const powerOptions: DefaultOptionType[] = [
        { value: 1300, label: '1300 МВт' },
        { value: 440, label: '440 МВт' },
    ];

    const changeReactorTypeHandler = (e: RadioChangeEvent) => {
        setInitialParam('reactorType', e.target.value);
    };

    const onChangePowerHandler = (val: number) => {
        setInitialParam('nominalPower', val);
    };

    const onClearHandler = () => {
        setInitialParam('nominalPower', 0);
    };

    useEffect(() => {
        const key = `${reactorType}-${nominalPower}`;

        switch (key) {
            case 'ВВЭР-1300':
                setInitialParams(VVER_1300.initialParams);
                break;
            case 'ВВЭР-440':
                setInitialParams(VVER_440.initialParams);
                break;
            default:
                return;
        }
    }, [reactorType, nominalPower]);
    return (
        <Space direction={'vertical'}>
            <Text>Выбор прототипа реактора</Text>
            <Space>
                <Radio.Group
                    onChange={changeReactorTypeHandler}
                    value={reactorType}
                >
                    <Radio value={REACTOR_TYPES.VVER}>
                        {REACTOR_TYPES.VVER}
                    </Radio>
                    <Radio value={REACTOR_TYPES.RBMK}>
                        {REACTOR_TYPES.RBMK}
                    </Radio>
                </Radio.Group>
                <Select
                    title={'Мощность реактора МВт'}
                    placeholder={'Выберите мощность МВт'}
                    options={powerOptions}
                    onChange={onChangePowerHandler}
                    onClear={onClearHandler}
                    allowClear
                />
            </Space>
        </Space>
    );
};
