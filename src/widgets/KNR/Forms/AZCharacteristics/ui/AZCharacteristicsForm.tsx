import { useEffect } from 'react';

import { AZCharacteristics } from '@entities/KNR';
import { Col, Form, Grid, InputNumber, Row } from 'antd';

import { useAZStore } from '../../../../../features/KNR/VVER/setInitialValues';

export const AZCharacteristicsForm = () => {
    const { AZCharacteristics, setAZCharacteristics } = useAZStore();
    const screens = Grid.useBreakpoint();
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue(AZCharacteristics);
    }, [AZCharacteristics]);

    const onValuesChange = (_: any, allValues: AZCharacteristics) => {
        setAZCharacteristics(allValues);
    };
    const span = screens.xl ? 4 : 6;
    return (
        <Form
            form={form}
            layout="vertical"
            initialValues={AZCharacteristics}
            onValuesChange={onValuesChange}
        >
            <Row gutter={[8, 8]}>
                <Col span={span}>
                    <Form.Item
                        label="Vбл"
                        tooltip="Объём блока, в кубических сантиметрах."
                        name="blockVolume"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста, введите объём блока',
                            },
                        ]}
                    >
                        <InputNumber addonAfter="см³" />
                    </Form.Item>
                </Col>

                <Col span={span}>
                    <Form.Item
                        label="Vзам"
                        tooltip="Объём замедлителя, в кубических сантиметрах."
                        name="moderatorVolume"
                        rules={[
                            {
                                required: true,
                                message:
                                    'Пожалуйста, введите объём замедлителя',
                            },
                        ]}
                    >
                        <InputNumber addonAfter="см³" />
                    </Form.Item>
                </Col>

                <Col span={span}>
                    <Form.Item
                        label="V0"
                        tooltip="Объём ячейки, в кубических сантиметрах."
                        name="cellVolume"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста, введите объём ячейки',
                            },
                        ]}
                    >
                        <InputNumber addonAfter="см³" />
                    </Form.Item>
                </Col>

                <Col span={span}>
                    <Form.Item
                        label="VU"
                        tooltip="Объём топлива, в кубических сантиметрах."
                        name="fuelVolume"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста, введите объём топлива',
                            },
                        ]}
                    >
                        <InputNumber addonAfter="см³" />
                    </Form.Item>
                </Col>

                <Col span={span}>
                    <Form.Item
                        label="sigmaA8"
                        tooltip="Усреднённое сечение поглощения 238U, в барнах."
                        name="averageAbsorptionCrossSection238U"
                        rules={[
                            {
                                required: true,
                                message:
                                    'Введите значение усредненного сечения поглощения 238U',
                            },
                        ]}
                    >
                        <InputNumber addonAfter="барн" />
                    </Form.Item>
                </Col>
                <Col span={span}>
                    <Form.Item
                        label="sigmaA5"
                        tooltip="Усреднённое сечение поглощения 235U, в барнах."
                        name="averageAbsorptionCrossSection238U"
                        rules={[
                            {
                                required: true,
                                message:
                                    'Введите значение усредненного сечения поглощения 235U',
                            },
                        ]}
                    >
                        <InputNumber addonAfter="барн" />
                    </Form.Item>
                </Col>

                <Col span={span}>
                    <Form.Item
                        label="sigmaF5"
                        tooltip="Усреднённое сечение деления 235U, в барнах."
                        name="averageFissionCrossSection235U"
                        rules={[
                            {
                                required: true,
                                message:
                                    'Введите значение усредненного сечения деления 235U',
                            },
                        ]}
                    >
                        <InputNumber addonAfter="барн" />
                    </Form.Item>
                </Col>

                <Col span={span}>
                    <Form.Item
                        label="N-235U"
                        tooltip="Концентрация 235U, в ядер/см³."
                        name="nuclearConcentration235U"
                        rules={[
                            {
                                required: true,
                                message: 'Введите значение концентрации 235U',
                            },
                        ]}
                    >
                        <InputNumber addonAfter="ядер/см³" />
                    </Form.Item>
                </Col>

                <Col span={span}>
                    <Form.Item
                        label="N-238U"
                        tooltip="Концентрация 238U, в ядер/см³."
                        name="nuclearConcentration238U"
                        rules={[
                            {
                                required: true,
                                message: 'Введите значение концентрации 238U',
                            },
                        ]}
                    >
                        <InputNumber addonAfter="ядер/см³" />
                    </Form.Item>
                </Col>

                <Col span={span}>
                    <Form.Item
                        label="Sigma_tran H2O"
                        tooltip="Транспортное макроскопическое сечение для H2O, в см⁻¹."
                        name="transportMacroscopicCrossSectionH2O"
                        rules={[
                            {
                                required: true,
                                message:
                                    'Введите значение транспортного макроскопического сечения для H2O',
                            },
                        ]}
                    >
                        <InputNumber addonAfter="см⁻¹" />
                    </Form.Item>
                </Col>

                <Col span={span}>
                    <Form.Item
                        label="Sigma_tran 238U"
                        tooltip="Транспортное макроскопическое сечение для 238U, в см⁻¹."
                        name="transportMacroscopicCrossSection238U"
                        rules={[
                            {
                                required: true,
                                message:
                                    'Введите значение транспортного макроскопического сечения для 238U',
                            },
                        ]}
                    >
                        <InputNumber addonAfter="см⁻¹" />
                    </Form.Item>
                </Col>

                <Col span={span}>
                    <Form.Item
                        label="Sigma_tran O2"
                        tooltip="Транспортное макроскопическое сечение для кислорода, в см⁻¹."
                        name="transportMacroscopicCrossSectionOxygen"
                        rules={[
                            {
                                required: true,
                                message:
                                    'Введите значение транспортного макроскопического сечения для кислорода',
                            },
                        ]}
                    >
                        <InputNumber addonAfter="см⁻¹" />
                    </Form.Item>
                </Col>

                <Col span={span}>
                    <Form.Item
                        label="Sigma_tran Zr"
                        tooltip="Транспортное макроскопическое сечение для циркония, в см⁻¹."
                        name="transportMacroscopicCrossSectionZirconium"
                        rules={[
                            {
                                required: true,
                                message:
                                    'Введите значение транспортного макроскопического сечения для циркония',
                            },
                        ]}
                    >
                        <InputNumber addonAfter="см⁻¹" />
                    </Form.Item>
                </Col>

                <Col span={span}>
                    <Form.Item
                        label="Sigma_tran sum"
                        tooltip="Суммарное транспортное макроскопическое сечение, в см⁻¹."
                        name="totalTransportMacroscopicCrossSection"
                        rules={[
                            {
                                required: true,
                                message:
                                    'Введите значение суммарного транспортного макроскопического сечения',
                            },
                        ]}
                    >
                        <InputNumber addonAfter="см⁻¹" />
                    </Form.Item>
                </Col>

                <Col span={span}>
                    <Form.Item
                        label="SigmaABl"
                        tooltip="Макроскопическое сечение поглощения блока, в см⁻¹."
                        name="macroscopicAbsorptionCrossSectionBlock"
                        rules={[
                            {
                                required: true,
                                message:
                                    'Введите значение макроскопического сечения поглощения блока',
                            },
                        ]}
                    >
                        <InputNumber addonAfter="см⁻¹" />
                    </Form.Item>
                </Col>

                <Col span={span}>
                    <Form.Item
                        label="SigmaAmod"
                        tooltip="Макроскопическое сечение поглощения модератора, в см⁻¹."
                        name="macroscopicAbsorptionCrossSectionModerator"
                        rules={[
                            {
                                required: true,
                                message:
                                    'Введите значение макроскопического сечения поглощения модератора',
                            },
                        ]}
                    >
                        <InputNumber addonAfter="см⁻¹" />
                    </Form.Item>
                </Col>

                <Col span={span}>
                    <Form.Item
                        label="Tn"
                        tooltip="Температура нейтронного газа, в K."
                        name="neutronGasTemperature"
                        rules={[
                            {
                                required: true,
                                message: 'Введите температуру нейтронного газа',
                            },
                        ]}
                    >
                        <InputNumber addonAfter="K" />
                    </Form.Item>
                </Col>

                <Col span={span}>
                    <Form.Item
                        label="d"
                        tooltip="Коэффициент проигрыша."
                        name="reproductionLossCoefficient"
                        rules={[
                            {
                                required: true,
                                message:
                                    'Введите коэффициент утечки воспроизводства',
                            },
                        ]}
                    >
                        <InputNumber />
                    </Form.Item>
                </Col>

                <Col span={span}>
                    <Form.Item
                        label="Tetta"
                        tooltip="Коэффициент использования тепловых нейтронов."
                        name="thermalNeutronUtilizationCoefficient"
                        rules={[
                            {
                                required: true,
                                message:
                                    'Введите коэффициент использования тепловых нейтронов',
                            },
                        ]}
                    >
                        <InputNumber />
                    </Form.Item>
                </Col>

                <Col span={span}>
                    <Form.Item
                        label="Mu"
                        tooltip="Коэффициент размножения быстрых нейтронов."
                        name="fastNeutronReproductionCoefficient"
                        rules={[
                            {
                                required: true,
                                message:
                                    'Введите коэффициент размножения быстрых нейтронов',
                            },
                        ]}
                    >
                        <InputNumber />
                    </Form.Item>
                </Col>

                <Col span={span}>
                    <Form.Item
                        label="Phi"
                        tooltip="Вероятность избежать резонансного захвата."
                        name="resonanceEscapeProbability"
                        rules={[
                            {
                                required: true,
                                message:
                                    'Введите вероятность ускользания резонанса',
                            },
                        ]}
                    >
                        <InputNumber />
                    </Form.Item>
                </Col>

                <Col span={span}>
                    <Form.Item
                        label="Sec_n_235U"
                        tooltip="Количество вторичных нейтронов на поглощение 235U."
                        name="secondaryNeutronsPerAbsorption235U"
                        rules={[
                            {
                                required: true,
                                message:
                                    'Введите количество вторичных нейтронов на поглощение 235U',
                            },
                        ]}
                    >
                        <InputNumber />
                    </Form.Item>
                </Col>

                <Col span={span}>
                    <Form.Item
                        label="Kinf"
                        tooltip="Коэффициент размножения нейтронов в бесконечной среде."
                        name="infiniteNeutronMultiplicationCoefficient"
                        rules={[
                            {
                                required: true,
                                message:
                                    'Введите коэффициент размножения нейтронов в бесконечной среде',
                            },
                        ]}
                    >
                        <InputNumber />
                    </Form.Item>
                </Col>

                <Col span={span}>
                    <Form.Item
                        label="Age_term_n"
                        tooltip="Возраст теплового нейтрона."
                        name="thermalNeutronAge"
                        rules={[
                            {
                                required: true,
                                message: 'Введите возраст теплового нейтрона',
                            },
                        ]}
                    >
                        <InputNumber />
                    </Form.Item>
                </Col>

                <Col span={span}>
                    <Form.Item
                        label="L_diff"
                        tooltip="Длина диффузии, в см."
                        name="diffusionLength"
                        rules={[
                            {
                                required: true,
                                message: 'Введите длину диффузии',
                            },
                        ]}
                    >
                        <InputNumber
                            value={AZCharacteristics.diffusionLength}
                            addonAfter="см"
                        />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};
