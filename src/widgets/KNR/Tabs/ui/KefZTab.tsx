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
                        companyParams={companyParams}
                    />
                    <CompanyTable
                        companyTime={
                            companyParams.company.reactorOperationalTime
                        }
                        companyZ={companyParams.company.z}
                        yearKef={companyParams.year.k_ef}
                        yearZ={companyParams.year.z}
                        withoutPuZ={companyParams.withoutPu.z}
                        withoutPuKef={companyParams.withoutPu.k_ef}
                        withoutPuTime={
                            companyParams.withoutPu.reactorOperationalTime
                        }
                        middleKef={companyParams.middle.k_ef}
                        middleTime={companyParams.middle.reactorOperationalTime}
                        middleZ={companyParams.middle.z}
                    />
                </Space>
            </Col>
        </Row>
    );
};
