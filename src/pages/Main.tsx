import { Space } from 'antd';

import Chart from '../components/chart/Chart.tsx';
import AppForm from '../components/form/AppForm.tsx';

const Main = () => {
    return (
        <Space
            direction={'vertical'}
            style={{ width: '100%' }}
            align={'center'}
        >
            <AppForm />
            <Chart />
        </Space>
    );
};

export default Main;
