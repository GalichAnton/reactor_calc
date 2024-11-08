import { useEffect } from 'react';

import { InitialParams } from '@entities/KNR';
import { useInitialParamsStore } from '@features/KNR/VVER/setInitialValues';
import { Select } from '@shared/ui';
import { Col, Form, Grid, InputNumber, Row } from 'antd';

export const InitialParamForm = () => {
    const { initialParams, setInitialParams } = useInitialParamsStore();
    const screens = Grid.useBreakpoint();

    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue(initialParams);
    }, [initialParams]);

    const onValuesChange = (_: any, allValues: InitialParams) => {
        setInitialParams(allValues);
    };

    const span = screens.xl ? 4 : 6;

    return (
        <Form
            form={form}
            layout="vertical"
            initialValues={initialParams}
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
                <Col span={span}>
                    <Form.Item
                        label="nTvel"
                        tooltip="Общее количество тепловыделяющих элементов (ТВЭЛ) в сборке."
                        name="nTvel"
                        rules={[
                            {
                                required: true,
                                message: 'Введите количество ТВЭЛов',
                            },
                        ]}
                    >
                        <InputNumber addonAfter="шт" />
                    </Form.Item>
                </Col>
                <Col span={span}>
                    <Form.Item
                        label="A"
                        tooltip="Расстояние между центрами соседних твс в сборке, в см."
                        name="latticePitch"
                        rules={[
                            {
                                required: true,
                                message: 'Введите значение шага решётки',
                            },
                        ]}
                    >
                        <InputNumber addonAfter="см" />
                    </Form.Item>
                </Col>
                <Col span={span}>
                    <Form.Item
                        label="a"
                        tooltip="Расстояние между центрами соседних твэлов в сборке, в см."
                        name="fuelRodLatticePitch"
                        rules={[
                            {
                                required: true,
                                message: 'Введите значение шага ТВЭЛ',
                            },
                        ]}
                    >
                        <InputNumber addonAfter="см" />
                    </Form.Item>
                </Col>
                <Col span={span}>
                    <Form.Item
                        label="a'"
                        tooltip="Размер ТВС «под ключ», в сантиметрах."
                        name="assemblySizeAcrossFlats"
                        rules={[
                            {
                                required: true,
                                message: 'Введите значение размера «под ключ»',
                            },
                        ]}
                    >
                        <InputNumber addonAfter="см" />
                    </Form.Item>
                </Col>
                <Col span={span}>
                    <Form.Item
                        label="R1"
                        tooltip="Радиус топливной таблетки, в см."
                        name="fuelPelletRadius"
                        rules={[
                            {
                                required: true,
                                message: 'Введите радиус топливной таблетки',
                            },
                        ]}
                    >
                        <InputNumber addonAfter="см" />
                    </Form.Item>
                </Col>
                <Col span={span}>
                    <Form.Item
                        label="R_in"
                        tooltip="Внутренний радиус оболочки ТВЭЛ-а, в см."
                        name="claddingInnerRadius"
                        rules={[
                            {
                                required: true,
                                message:
                                    'Введите значение внутреннего радиуса оболочки',
                            },
                        ]}
                    >
                        <InputNumber addonAfter="см" />
                    </Form.Item>
                </Col>
                <Col span={span}>
                    <Form.Item
                        label="R_out"
                        tooltip="Внешний радиус оболочки ТВЭЛ-а, в см."
                        name="claddingOuterRadius"
                        rules={[
                            {
                                required: true,
                                message:
                                    'Введите значение внешнего радиуса оболочки',
                            },
                        ]}
                    >
                        <InputNumber addonAfter="см" />
                    </Form.Item>
                </Col>
                <Col span={span}>
                    <Form.Item
                        label="R_control"
                        tooltip="Радиус управляющего стержня, в см."
                        name="controlRodRadius"
                        rules={[
                            {
                                required: true,
                                message: 'Введите радиус управляющего стержня',
                            },
                        ]}
                    >
                        <InputNumber addonAfter="см" />
                    </Form.Item>
                </Col>

                <Col span={span}>
                    <Form.Item
                        label="Материал оболочки"
                        tooltip="Материал, из которого сделана оболочка ТВЭЛ-а."
                        name="claddingMaterial"
                        rules={[
                            {
                                required: true,
                                message: 'Выберите материал оболочки',
                            },
                        ]}
                    >
                        <Select
                            placeholder="Выберите материал"
                            options={[{ value: 'Zr+1%Nb', label: 'Zr+1%Nb' }]}
                        />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};
