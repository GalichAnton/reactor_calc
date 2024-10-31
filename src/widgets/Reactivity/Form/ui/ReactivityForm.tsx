import { LoadingOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { OPERATING_MODE, useReactivityStore } from '@features/reactivityCalc';
import { Button } from '@shared/ui';
import { Card, Col, Form, InputNumber, Radio, Row } from 'antd';
import Checkbox from 'antd/es/checkbox/Checkbox';

export const ReactivityForm = () => {
    const {
        velocity,
        mode,
        startReactivity,
        height,
        power,
        interval,
        nominalPower,
        start,
        reactorHeight,
        isSix,

        changeMode,
        changeIsSix,
        changeVelocity,
        changeStartReactivity,
        changeHeight,
        changeInterval,
        changeNominalPower,
        changeStart,
        changeReactorHeight,
    } = useReactivityStore();

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

    // const onChangePowerHandler = (value: number | null) => {
    //     if (value === null || value === undefined) {
    //         return;
    //     }
    //
    //     changePower(value);
    // };

    const onChangeIntervalHandler = (value: number | null) => {
        if (value === null || value === undefined) {
            return;
        }

        changeInterval(value);
    };

    const onChangeReactorHeightHandler = (value: number | null) => {
        if (value === null || value === undefined) {
            return;
        }

        changeReactorHeight(value);
    };
    const onChangeNominalPowerHandler = (value: number | null) => {
        if (value === null || value === undefined) {
            return;
        }

        changeNominalPower(value);
    };

    return (
        <Card
            style={{ width: '100%', boxShadow: '0 4px 30px #0000001a' }}
            title={'Введите значения'}
            size={'small'}
        >
            <Form layout={'vertical'} disabled={start}>
                <Checkbox
                    checked={isSix}
                    onChange={(e) => changeIsSix(e.target.checked)}
                >
                    Шестигрупповое
                </Checkbox>
                <Row gutter={[8, 8]}>
                    <Col span={6}>
                        <Form.Item
                            id={'power'}
                            label={<strong>Мощность номинальная</strong>}
                        >
                            <InputNumber
                                style={{ width: '100%' }}
                                placeholder={'Мощность номинальная'}
                                value={nominalPower}
                                onChange={onChangeNominalPowerHandler}
                                addonAfter={'Нейтронов'}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            id={'reactorHeight'}
                            label={<strong>Высота АЗ</strong>}
                        >
                            <InputNumber
                                style={{ width: '100%' }}
                                placeholder={'Высота АЗ'}
                                value={reactorHeight}
                                onChange={onChangeReactorHeightHandler}
                                addonAfter={'см'}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            id={'power'}
                            label={<strong>Мощность</strong>}
                        >
                            <InputNumber
                                style={{ width: '100%' }}
                                placeholder={'Мощность'}
                                value={power}
                                addonAfter={'Нейтронов'}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            id={'velocity'}
                            label={<strong>Скорость</strong>}
                        >
                            <InputNumber
                                style={{ width: '100%' }}
                                placeholder={'Скорость'}
                                addonAfter={'см/c'}
                                value={velocity}
                                onChange={onChangeVelocityHandler}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            id={'height'}
                            label={<strong>Положение группы ОР СУЗ</strong>}
                        >
                            <InputNumber
                                style={{ width: '100%' }}
                                placeholder={'Положение группы ОР СУЗ'}
                                addonAfter={'см'}
                                value={height}
                                onChange={onChangeHeightHandler}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            id={'ro'}
                            label={<strong>Реактивность</strong>}
                        >
                            <InputNumber
                                style={{ width: '100%' }}
                                placeholder={'Реактивность'}
                                value={startReactivity}
                                onChange={onChangeStartReactivityHandler}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            id={'interval'}
                            label={<strong>Шаг интегрирования</strong>}
                        >
                            <InputNumber
                                style={{ width: '100%' }}
                                placeholder={'Шаг интегрирования'}
                                value={interval}
                                onChange={onChangeIntervalHandler}
                                addonAfter={'с'}
                                step="0.01"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            id={'control'}
                            label={<strong>Режим работы стержней</strong>}
                        >
                            <Radio.Group
                                value={mode}
                                onChange={(e) => changeMode(e.target.value)}
                                disabled={false}
                            >
                                <Radio.Button value={OPERATING_MODE.STOP}>
                                    Остановить
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
            <Col span={3}>
                <Button
                    type="primary"
                    icon={start ? <LoadingOutlined /> : <PlayCircleOutlined />}
                    onClick={changeStart}
                >
                    {start ? 'Стоп' : 'Старт'}
                </Button>
            </Col>
        </Card>
    );
};
