import { useEffect } from 'react';

import { REACTOR_TYPES } from '@entities/reactor';
import {
    useAZStore,
    useReactorStore,
    useTVSStore,
} from '@features/KNR/VVER/setInitialValues';
import { Select, Space, Text } from '@shared/ui';
import { Radio, RadioChangeEvent } from 'antd';
import { DefaultOptionType } from 'antd/es/select';

import { VVER_1000 } from '../constants/VVER_1000';
import { VVER_440 } from '../constants/VVER_440';

export const Presets = () => {
    const { setTVSCharacteristics: setTVS } = useTVSStore();
    const {
        setReactorCharacteristics: setReactor,
        setReactorCharacteristic,
        reactorCharacteristics: { reactorType, nominalPower },
    } = useReactorStore();
    const { setAZCharacteristics: setAz } = useAZStore();

    const powerOptions: DefaultOptionType[] = [
        { value: 1000, label: '1000 МВт' },
        { value: 440, label: '440 МВт' },
    ];

    const changeReactorTypeHandler = (e: RadioChangeEvent) => {
        setReactorCharacteristic('reactorType', e.target.value);
    };

    const onChangePowerHandler = (value: number) => {
        setReactorCharacteristic('nominalPower', value);
    };

    const onClearHandler = () => {
        setReactorCharacteristic('nominalPower', null);
    };

    useEffect(() => {
        const key = `${reactorType}-${nominalPower}`;
        console.log('here');
        switch (key) {
            case 'ВВЭР-1000':
                setAz(VVER_1000.AZCharacteristics);
                setReactor(VVER_1000.reactorCharacteristics);
                setTVS(VVER_1000.tvsCharacteristics);
                break;
            case 'ВВЭР-440':
                setAz(VVER_440.AZCharacteristics);
                setReactor(VVER_440.reactorCharacteristics);
                setTVS(VVER_440.tvsCharacteristics);
                break;

            default:
                return;
        }
    }, [nominalPower, reactorType]);

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
