import { LoadingOutlined, PlayCircleOutlined } from '@ant-design/icons';
import {
    OPERATING_MODE,
    useReactivityStore,
    InitialReactivityParams,
} from '@features/reactivityCalc';
import { Button, Space } from '@shared/ui';
import {
    Card,
    Col,
    Form,
    Grid,
    InputNumber,
    Radio,
    RadioChangeEvent,
    Row,
} from 'antd';

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
            corePowerDensity,
            averageUraniumTemp,
            coolantTemp,
        },
        setInitialParams,
        setInitialParam,
        setStart,
        config: { start },

        reset,
    } = useReactivityStore();
    const screens = Grid.useBreakpoint();
    const span = screens.xxl ? 4 : screens.xl ? 5 : screens.lg ? 6 : 8;

    const onFinish = () => {
        setStart();
    };

    const onValuesChange = (_: any, allValues: InitialReactivityParams) => {
        setInitialParams(allValues);
    };

    const onResetHandler = () => {
        reset();
        setStart();
    };

    const onChangeMode = (e: RadioChangeEvent) => {
        setInitialParam('mode', e.target.value);
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
                onValuesChange={onValuesChange}
            >
                <Row gutter={[12, 12]}>
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
                            id={'averageUraniumTemp'}
                            label={<strong>Средняя температура урана</strong>}
                        >
                            <InputNumber
                                style={{ width: '100%' }}
                                placeholder={'Средняя температура урана'}
                                value={averageUraniumTemp}
                                addonAfter={'°C'}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={span}>
                        <Form.Item
                            id={'coolantTemp'}
                            label={<strong>Температура теплоносителя</strong>}
                        >
                            <InputNumber
                                style={{ width: '100%' }}
                                placeholder={'Температура теплоносителя'}
                                value={coolantTemp}
                                addonAfter={'°C'}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={span}>
                        <Form.Item
                            id={'corePowerDensity'}
                            label={<strong>Энергонапряженность</strong>}
                        >
                            <InputNumber
                                style={{ width: '100%' }}
                                placeholder={'Энергонапряженность'}
                                value={corePowerDensity}
                                addonAfter={'(кВт/л)'}
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
                            label={<strong>Число ТВЭЛ</strong>}
                        >
                            <InputNumber
                                style={{ width: '100%' }}
                                placeholder={'Число ТВЭЛ'}
                                value={nTvel}
                                addonAfter={'шт'}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={span}>
                        <Form.Item
                            id={'nTvs'}
                            label={<strong>Число ТВС</strong>}
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
                </Row>
            </Form>
            <Space style={{ marginTop: '20px' }}>
                <Button
                    type="primary"
                    onClick={onFinish}
                    icon={start ? <LoadingOutlined /> : <PlayCircleOutlined />}
                >
                    {start ? 'Стоп' : 'Старт'}
                </Button>
                <Button danger onClick={onResetHandler} disabled={!start}>
                    Сбросить
                </Button>
                <Radio.Group
                    value={mode}
                    disabled={false}
                    onChange={onChangeMode}
                >
                    <Radio.Button value={OPERATING_MODE.STOP}>
                        Остановить
                    </Radio.Button>
                    <Radio.Button value={OPERATING_MODE.UP}>Вверх</Radio.Button>
                    <Radio.Button value={OPERATING_MODE.DOWN}>
                        Вниз
                    </Radio.Button>
                </Radio.Group>
            </Space>
        </Card>
    );
};
