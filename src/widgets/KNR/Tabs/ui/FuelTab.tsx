import {
    FuelTable,
    useCalcFuelParams,
    useFuelParamsStore,
} from '@features/KNR/calcSecond';
import { Col, Row } from 'antd';

export const FuelTab = () => {
    const { fuelParams } = useFuelParamsStore();
    useCalcFuelParams();
    return (
        <Row gutter={[8, 8]}>
            <Col span={24}>
                <FuelTable params={fuelParams} />
            </Col>
        </Row>
    );
};
