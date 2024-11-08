import { useEffect } from 'react';

import { ReactorCharacteristics } from '@entities/KNR';
import { useReactorStore } from '@features/KNR/VVER/setInitialValues';
import { Col, Form, Grid, InputNumber, Row } from 'antd';

export const ReactorCharacteristic = () => {
    const { reactorCharacteristics, setReactorCharacteristics } =
        useReactorStore();
    const screens = Grid.useBreakpoint();

    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue(reactorCharacteristics);
    }, [reactorCharacteristics]);

    const onValuesChange = (_: any, allValues: ReactorCharacteristics) => {
        console.log('here');
        setReactorCharacteristics(allValues);
    };

    const span = screens.xl ? 4 : 6;

    return (
        <Form
            form={form}
            layout="vertical"
            initialValues={reactorCharacteristics}
            onValuesChange={onValuesChange}
        >
            <Row gutter={[8, 8]}>
                <Col span={span}>
                    <Form.Item
                        label="Nel"
                        tooltip="Электрическая мощность"
                        name="electricalPower"
                        rules={[
                            {
                                required: true,
                                message:
                                    'Пожалуйста, введите электрическую мощность',
                            },
                        ]}
                    >
                        <InputNumber addonAfter={'МВт'} />
                    </Form.Item>
                </Col>

                <Col span={span}>
                    <Form.Item
                        label="Ptepl"
                        tooltip="Тепловая мощность"
                        name="thermalPower"
                        rules={[
                            {
                                required: true,
                                message:
                                    'Пожалуйста, введите тепловую мощность',
                            },
                        ]}
                    >
                        <InputNumber addonAfter={'МВт'} />
                    </Form.Item>
                </Col>
                <Col span={span}>
                    <Form.Item
                        label="P1"
                        tooltip="Давление в первом контуре"
                        name="primaryCircuitPressure"
                        rules={[
                            {
                                required: true,
                                message:
                                    'Пожалуйста, введите давление в первом контуре',
                            },
                        ]}
                    >
                        <InputNumber addonAfter={'МПа'} />
                    </Form.Item>
                </Col>

                <Col span={span}>
                    <Form.Item
                        label="Ttep"
                        tooltip="Температура используемого теплоносителя"
                        name="coolantTemperature"
                        rules={[
                            {
                                required: true,
                                message:
                                    'Пожалуйста, введите температуру теплоносителя',
                            },
                        ]}
                    >
                        <InputNumber addonAfter={'K'} />
                    </Form.Item>
                </Col>

                <Col span={span}>
                    <Form.Item
                        label="Xu5"
                        tooltip="Концентрация U-235 в топливе"
                        name="uraniumEnrichment"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста, введите обогащение урана',
                            },
                        ]}
                    >
                        <InputNumber addonAfter={'%'} />
                    </Form.Item>
                </Col>

                <Col span={span}>
                    <Form.Item
                        label="q AZ"
                        tooltip="Энергонапряжённость активной зоны реактора"
                        name="corePowerDensity"
                        rules={[
                            {
                                required: true,
                                message:
                                    'Пожалуйста, введите энергонапряжённость активной зоны',
                            },
                        ]}
                    >
                        <InputNumber addonAfter={'МВт/м³'} />
                    </Form.Item>
                </Col>

                <Col span={span}>
                    <Form.Item
                        label="Haz"
                        tooltip="Высота активной зоны реактора"
                        name="coreHeight"
                        rules={[
                            {
                                required: true,
                                message:
                                    'Пожалуйста, введите высоту активной зоны',
                            },
                        ]}
                    >
                        <InputNumber addonAfter={'см'} />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};
