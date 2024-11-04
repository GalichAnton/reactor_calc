import { useEffect } from 'react';

import { TVS } from '@entities/KNR';
import { useTVSStore } from '@features/KNR/VVER/setInitialValues/model/stores/TVSStore.ts';
import { Select } from '@shared/ui';
import { Col, Form, Grid, InputNumber, Row } from 'antd';

export const TvsCharacteristicForm = () => {
    const { TVSCharacteristics, setTVSCharacteristics } = useTVSStore();
    const screens = Grid.useBreakpoint();

    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue(TVSCharacteristics);
    }, [TVSCharacteristics]);

    const onValuesChange = (_: any, allValues: TVS) => {
        setTVSCharacteristics(allValues);
    };

    const span = screens.xl ? 4 : 6;

    return (
        <Form
            form={form}
            onValuesChange={onValuesChange}
            initialValues={TVSCharacteristics}
            layout="vertical"
        >
            <Row gutter={[16, 16]}>
                <Col span={span}>
                    <Form.Item
                        label="ntvel"
                        tooltip="Общее количество тепловыделяющих элементов (ТВЭЛ) в сборке."
                        name="ntvel"
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
                        label="a"
                        tooltip="Расстояние между центрами соседних твэлов в сборке, в см."
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
                        name="innerCladdingRadius"
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
                        name="outerCladdingRadius"
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
