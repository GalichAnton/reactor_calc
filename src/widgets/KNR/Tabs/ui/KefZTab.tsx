import {
    KefChart,
    useZrelationsCalc,
    useZRelationsStore,
    KefZTable,
    useCompanyParamsStore,
    useCalcCompanyParams,
    CompanyTable,
} from '@features/KNR/VVER/calc';
import { Space } from '@shared/ui';
import { Col, Row } from 'antd';

export const KefZTab = () => {
    const { zRelationsParams } = useZRelationsStore();
    const { companyParams } = useCompanyParamsStore();
    useZrelationsCalc();
    useCalcCompanyParams();

    return (
        <Row gutter={[8, 8]}>
            <Col span={24}>
                <KefZTable zRelationsParams={zRelationsParams} />
            </Col>

            <Col span={24}>
                <Space fullWidth direction={'vertical'}>
                    <KefChart
                        zRelationsParams={zRelationsParams}
                        companyParams={companyParams.computedValues}
                    />
                    <CompanyTable
                        companyKef={companyParams.computedValues.company.k_ef}
                        companyTime={
                            companyParams.computedValues.company
                                .reactorOperationalTime
                        }
                        companyZ={companyParams.computedValues.company.z}
                        yearKef={companyParams.computedValues.year.k_ef}
                        yearZ={companyParams.computedValues.year.z}
                        withoutPuZ={companyParams.computedValues.withoutPu.z}
                        withoutPuKef={
                            companyParams.computedValues.withoutPu.k_ef
                        }
                        withoutPuTime={
                            companyParams.computedValues.withoutPu
                                .reactorOperationalTime
                        }
                    />
                </Space>
            </Col>
        </Row>
    );
};
