import { ReactorCharacteristics, useReactorStore } from '@features/knr';
import { Button, Card } from '@shared/ui';
import { Form, InputNumber } from 'antd';

export const ReactorCharacteristic = () => {
    const { characteristics, setCharacteristics } = useReactorStore(
        (state) => ({
            characteristics: state.characteristics,
            setCharacteristics: state.setCharacteristics,
        }),
    );

    const [form] = Form.useForm();

    const onFinish = (values: ReactorCharacteristics) => {
        setCharacteristics(values);
        console.log('Characteristics Updated:', values);
    };

    const onValuesChange = (_: any, allValues: ReactorCharacteristics) => {
        setCharacteristics(allValues);
    };

    return (
        <Card withShadow>
            <Form
                form={form}
                layout="vertical"
                initialValues={characteristics}
                onFinish={onFinish}
                onValuesChange={onValuesChange}
            >
                <Form.Item
                    label="Электрическая мощность (МВт)"
                    name="electricalPower"
                    rules={[
                        {
                            required: true,
                            message:
                                'Пожалуйста, введите электрическую мощность',
                        },
                    ]}
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item
                    label="Тепловая мощность (МВт)"
                    name="thermalPower"
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста, введите тепловую мощность',
                        },
                    ]}
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item
                    label="Давление в первом контуре (МПа)"
                    name="primaryCircuitPressure"
                    rules={[
                        {
                            required: true,
                            message:
                                'Пожалуйста, введите давление в первом контуре',
                        },
                    ]}
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item
                    label="Температура теплоносителя (К)"
                    name="coolantTemperature"
                    rules={[
                        {
                            required: true,
                            message:
                                'Пожалуйста, введите температуру теплоносителя',
                        },
                    ]}
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item
                    label="Обогащение урана (%)"
                    name="uraniumEnrichment"
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста, введите обогащение урана',
                        },
                    ]}
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item
                    label="Энергонапряжённость активной зоны (МВт/м³)"
                    name="corePowerDensity"
                    rules={[
                        {
                            required: true,
                            message:
                                'Пожалуйста, введите энергонапряжённость активной зоны',
                        },
                    ]}
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item
                    label="Высота активной зоны (см)"
                    name="coreHeight"
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста, введите высоту активной зоны',
                        },
                    ]}
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Сохранить
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};
