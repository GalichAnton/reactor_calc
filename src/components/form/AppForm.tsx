import { useContext } from 'react';

import { Card, Col, Form, InputNumber, Radio, Row } from 'antd';

import { AppContext } from '../../store';
import { OPERATING_MODE } from '../../store/types.ts';

const AppForm = () => {
    const {
        state: { velocity, mode, reactivity, height },
        changeMode,
    } = useContext(AppContext);

    return (
        <Card style={{ width: '100%' }}>
            <Form layout={'vertical'}>
                <Row gutter={[16, 16]}>
                    <Col span={6}>
                        <Form.Item id={'velocity'} label={'Скорость'}>
                            <InputNumber
                                placeholder={'Скорость'}
                                addonAfter={'см/с'}
                                value={velocity}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item id={'height'} label={'Высота'}>
                            <InputNumber
                                placeholder={'Высота'}
                                addonAfter={'см'}
                                value={height}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item id={'ro'} label={'Реактивность'}>
                            <InputNumber
                                placeholder={'Реактивность'}
                                value={reactivity}
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
