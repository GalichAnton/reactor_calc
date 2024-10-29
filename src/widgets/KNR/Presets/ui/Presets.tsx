import { useEffect, useState } from 'react';

import { REACTOR_TYPES } from '@entities/reactor';
import { useAZStore, useReactorStore } from '@features/KNR/setInitialValues';
import { useTVSStore } from '@features/KNR/setInitialValues/model/stores/TVSStore.ts';
import { Select, Space, Text } from '@shared/ui';
import { Radio, RadioChangeEvent } from 'antd';
import { DefaultOptionType } from 'antd/es/select';

import { VVER_1000 } from '../constants/VVER_1000';

export const Presets = () => {
    const [reactorType, setReactorType] = useState<REACTOR_TYPES | null>(null);
    const [reactorPower, setReactorPower] = useState<number | null>(null);
    const { setTVSCharacteristics: setTVS } = useTVSStore();
    const { setReactorCharacteristics: setReactor } = useReactorStore();
    const { setAZCharacteristics: setAz } = useAZStore();

    const powerOptions: DefaultOptionType[] = [
        { value: 1000, label: '1000 МВт' },
        { value: 440, label: '440 - МВт' },
    ];

    const changeReactorTypeHandler = (e: RadioChangeEvent) => {
        setReactorType(e.target.value);
    };

    const onChangePowerHandler = (value: number) => {
        setReactorPower(value);
    };

    useEffect(() => {
        const key = `${reactorType}-${reactorPower}`;

        switch (key) {
            case 'ВВЭР-1000':
                setAz(VVER_1000.AZCharacteristics);
                setReactor(VVER_1000.reactorCharacteristics);
                setTVS(VVER_1000.tvsCharacteristics);
                break;

            default:
                return;
        }
    }, [reactorPower, reactorType]);

    return (
        <Space direction={'vertical'}>
            <Text>Выбор прототипа реактора</Text>
            <Space>
                <Radio.Group onChange={changeReactorTypeHandler}>
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
                    onClear={() => setReactorPower(null)}
                    allowClear
                />
            </Space>
        </Space>
    );
};
