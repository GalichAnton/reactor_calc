import { useCallback } from 'react';

import chart from '@shared/assets/img.png';
import { ParamsTable, Space } from '@shared/ui';
import { Col, Image, InputNumber, Row } from 'antd';

import { useNeutronDiffusionAgeStore } from '../../model/stores/neutronDiffusionAgeStore.ts';
import { NeutronDiffusionAgeParams } from '../../model/types/neutronDiffusionAgeParams.ts';

export const NeutronAgeTable = () => {
    const { setNeutronDiffusionAgeParam, neutronDiffusionAgeParams } =
        useNeutronDiffusionAgeStore();

    const onChangeHandler = useCallback((value: number | null) => {
        if (!value) return;
        setNeutronDiffusionAgeParam('z', value);
    }, []);

    return (
        <Row align={'top'}>
            <Col offset={2} span={10}>
                <Space fullWidth direction={'vertical'}>
                    <Image src={chart} />
                    <InputNumber
                        placeholder={'Выберите z по графику и введите его'}
                        onChange={onChangeHandler}
                        style={{ width: '300px' }}
                    />
                </Space>
            </Col>
            <Col span={10}>
                <ParamsTable<NeutronDiffusionAgeParams>
                    params={neutronDiffusionAgeParams}
                    title={'Возвраст тепловых нейтронов'}
                    rowKey={'diffusionLengthSquared'}
                />
            </Col>
        </Row>
    );
};
