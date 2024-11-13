import { LoadingOutlined, PlayCircleOutlined } from '@ant-design/icons';
import {
    OPERATING_MODE,
    useReactivityStore,
    InitialReactivityParams,
} from '@features/reactivityCalc';
import { Button } from '@shared/ui';
import { Card, Col, Form, InputNumber, Radio, Row } from 'antd';
import Checkbox from 'antd/es/checkbox/Checkbox';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

const span = 4;

export const ReactivityForm = () => {
    const {
        initialParams: {
            nominalPower,
            thermalPower,
            reactorHeight,
            startReactivity,
            interval,
            r_t,
            power,
            velocity,
            mode,
            nTvel,
            nTvs,
            height,
        },
        setInitialParams,
        setConfig,
        setStart,
        config: { isSix, start },

        reset,
    } = useReactivityStore();

    const onFinish = () => {
        setStart();
    };

    const onValuesChange = (_: any, allValues: InitialReactivityParams) => {
        setInitialParams(allValues);
    };

    const changeSixHandler = (e: CheckboxChangeEvent) => {
        reset();
        setConfig('isSix', e.target.checked);
    };

    return (
        <Card
            style={{ width: '100%', boxShadow: '0 4px 30px #0000001a' }}
            title={'Введите значения'}
            size={'small'}
        >
            <Form
                layout={'vertical'}
                disabled={start}
                onFinish={onFinish}
                onValuesChange={onValuesChange}
            >
                <Checkbox checked={isSix} onChange={changeSixHandler}>
                    Шестигрупповое
                </Checkbox>
                <Row gutter={[8, 8]}>
                    <Col span={span}>
                        <Form.Item
                            id={'power'}
                            label={<strong>Мощность номинальная</strong>}
                        >
                            <InputNumber
                                style={{ width: '100%' }}
                                placeholder={'Мощность номинальная'}
                                value={nominalPower}
                                addonAfter={'Нейтронов'}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={span}>
                        <Form.Item
                            id={'thermalPower'}
                            label={<strong>Мощность тепловая</strong>}
                        >
                            <InputNumber
                                style={{ width: '100%' }}
                                placeholder={'Мощность тепловая'}
                                value={thermalPower}
                                addonAfter={'МВт'}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={span}>
                        <Form.Item
                            id={'reactorHeight'}
                            label={<strong>Высота АЗ</strong>}
                        >
                            <InputNumber
                                style={{ width: '100%' }}
                                placeholder={'Высота АЗ'}
                                value={reactorHeight}
                                addonAfter={'см'}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={span}>
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
                    <Col span={span}>
                        <Form.Item
                            id={'velocity'}
                            label={<strong>Скорость</strong>}
                        >
                            <InputNumber
                                style={{ width: '100%' }}
                                placeholder={'Скорость'}
                                addonAfter={'см/c'}
                                value={velocity}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={span}>
                        <Form.Item
                            id={'height'}
                            label={<strong>Положение группы ОР СУЗ</strong>}
                        >
                            <InputNumber
                                style={{ width: '100%' }}
                                placeholder={'Положение группы ОР СУЗ'}
                                addonAfter={'см'}
                                value={height}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={span}>
                        <Form.Item
                            id={'ro'}
                            label={<strong>Реактивность</strong>}
                        >
                            <InputNumber
                                style={{ width: '100%' }}
                                placeholder={'Реактивность'}
                                value={startReactivity}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={span}>
                        <Form.Item
                            id={'interval'}
                            label={<strong>Шаг интегрирования</strong>}
                        >
                            <InputNumber
                                style={{ width: '100%' }}
                                placeholder={'Шаг интегрирования'}
                                value={interval}
                                addonAfter={'с'}
                                step="0.01"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={span}>
                        <Form.Item
                            id={'nTvel'}
                            label={<strong>Шаг интегрирования</strong>}
                        >
                            <InputNumber
                                style={{ width: '100%' }}
                                placeholder={'Число твэл'}
                                value={nTvel}
                                addonAfter={'шт'}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={span}>
                        <Form.Item
                            id={'nTvs'}
                            label={<strong>Шаг интегрирования</strong>}
                        >
                            <InputNumber
                                style={{ width: '100%' }}
                                placeholder={'Число ТВС'}
                                value={nTvs}
                                addonAfter={'шт'}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={span}>
                        <Form.Item
                            id={'r_t'}
                            label={<strong>Радиус твэл</strong>}
                        >
                            <InputNumber
                                style={{ width: '100%' }}
                                placeholder={'Радиус твэл'}
                                value={r_t}
                                addonAfter={'см'}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={span}>
                        <Form.Item
                            id={'mode'}
                            label={<strong>Режим работы стержней</strong>}
                        >
                            <Radio.Group value={mode} disabled={false}>
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
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType={'submit'}
                        icon={
                            start ? <LoadingOutlined /> : <PlayCircleOutlined />
                        }
                    >
                        {start ? 'Стоп' : 'Старт'}
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};
