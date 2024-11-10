import { ParamsTable } from '@shared/ui';
import { Col, Row } from 'antd';

import { useNeutronDiffusionAgeStore } from '../../model/stores/neutronDiffusionAgeStore.ts';
import { NeutronDiffusionAgeParams } from '../../model/types/neutronDiffusionAgeParams.ts';

export const NeutronAgeTable = () => {
    const { neutronDiffusionAgeParams } = useNeutronDiffusionAgeStore();

    return (
        <Row align={'top'}>
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
