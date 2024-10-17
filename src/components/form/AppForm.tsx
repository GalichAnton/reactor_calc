import { useContext } from 'react';

import { Card, Col, Form, InputNumber, Radio, Row } from 'antd';

import { AppContext } from '../../store';
import { OPERATING_MODE } from '../../store/types.ts';

const AppForm = () => {
    const {
        state: {
            velocity,
            mode,
            startReactivity,
            height,
            power,
            interval,
            nominalPower,
        },
        changeMode,
        changeVelocity,
        changeStartReactivity,
        changeHeight,
        changePower,
        changeInterval,
        changeNominalPower,
    } = useContext(AppContext);

    const onChangeVelocityHandler = (value: number | null) => {
        if (value === null || value === undefined) {
            return;
        }

        changeVelocity(value);
    };

    const onChangeStartReactivityHandler = (value: number | null) => {
        if (value === null || value === undefined) {
            return;
        }

        changeStartReactivity(value);
    };

    const onChangeHeightHandler = (value: number | null) => {
        if (value === null || value === undefined) {
            return;
        }

        changeHeight(value);
    };

    const onChangePowerHandler = (value: number | null) => {
        if (value === null || value === undefined) {
            return;
        }

        changePower(value);
    };

    const onChangeIntervalHandler = (value: number | null) => {
        if (value === null || value === undefined) {
            return;
        }

        changeInterval(value);
    };

    const onChangeNominalPowerHandler = (value: number | null) => {
        if (value === null || value === undefined) {
            return;
        }

        changeNominalPower(value);
    };

    return (
        <Card style={{ width: '100%' }}>
            <Form layout={'vertical'}>
                <Row gutter={[16, 16]}>
                    <Col span={6}>
                        <Form.Item id={'power'} label={'Мощность номинальная'}>
                            <InputNumber
                                placeholder={'Мощность номинальная'}
                                value={nominalPower}
                                onChange={onChangeNominalPowerHandler}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item id={'power'} label={'Мощность'}>
                            <InputNumber
                                placeholder={'Мощность'}
                                value={power}
                                onChange={onChangePowerHandler}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item id={'velocity'} label={'Скорость'}>
                            <InputNumber
                                placeholder={'Скорость'}
                                addonAfter={'см/с'}
                                value={velocity}
                                onChange={onChangeVelocityHandler}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item id={'height'} label={'Высота'}>
                            <InputNumber
                                placeholder={'Высота'}
                                addonAfter={'см'}
                                value={height}
                                onChange={onChangeHeightHandler}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item id={'ro'} label={'Реактивность'}>
                            <InputNumber
                                placeholder={'Реактивность'}
                                value={startReactivity}
                                onChange={onChangeStartReactivityHandler}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item id={'interval'} label={'Интервал расчета'}>
                            <InputNumber
                                placeholder={'Интервал'}
                                value={interval}
                                onChange={onChangeIntervalHandler}
                                addonAfter={'с'}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item id={'control'} label={'Режим работы'}>
                            <Radio.Group
                                value={mode}
                                onChange={(e) => changeMode(e.target.value)}
                            >
                                <Radio.Button value={OPERATING_MODE.STOP}>
                                    Стоп
                                </Radio.Button>
                                <Radio.Button value={OPERATING_MODE.UP}>
                                    Вверх
                                </Radio.Button>
                                <Radio.Button value={OPERATING_MODE.DOWN}>
                                    Вниз
                                </Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Card>
    );
};

export default AppForm;
