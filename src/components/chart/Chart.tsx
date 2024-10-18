import { useState } from 'react';

import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ReferenceLine,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

import styles from './chart.module.css';
import { useCalc } from '../../shared/lib/hooks/useCalc.tsx';

const Chart = () => {
    const params = useCalc();
    const data = params?.time?.map((t, i) => ({
        time: t,
        rel: params.rel[i].toExponential(3),
        power: params.power[i].toExponential(3),
        reactivity: params.reactivity[i].toExponential(3),
        // c: params.c[i].toExponential(),
    }));

    const [showRel, setShowRel] = useState(true);
    const [showReactivity, setShowReactivity] = useState(true);
    const [showPower, setShowPower] = useState(true);

    const xTicks = [];
    for (let i = 0; i <= 120; i += 2) {
        xTicks.push(i);
    }

    return (
        <div className={styles.chartContainer}>
            <LineChart width={1100} height={400} data={data}>
                <XAxis
                    dataKey="time"
                    type="number"
                    domain={[
                        0,
                        (dataMax: number) => (dataMax > 100 ? dataMax : 100),
                    ]}
                    allowDataOverflow
                    label={{
                        value: 'Время (с)',
                        position: 'insideBottomRight',
                        offset: 0,
                    }}
                />
                <Legend
                    onClick={(data) => {
                        if (data.dataKey === 'rel') {
                            setShowRel(!showRel);
                        } else if (data.dataKey === 'reactivity') {
                            setShowReactivity(!showReactivity);
                        } else if (data.dataKey === 'power') {
                            setShowPower(!showPower);
                        }
                    }}
                />
                <YAxis
                    yAxisId="rel"
                    dataKey="rel"
                    type="number"
                    domain={[0, 5]}
                    allowDataOverflow
                    label={{
                        value: 'rel',
                        angle: -90,
                        offset: 50,
                        position: 'insideTop',
                        style: { fill: '#8884d8' },
                    }}
                    tick={{
                        fill: '#8884d8',
                    }}
                />
                <YAxis
                    yAxisId="reactivity"
                    dataKey="reactivity"
                    type="number"
                    domain={[-0.005, 0.005]}
                    allowDataOverflow
                    label={{
                        value: 'reactivity',
                        angle: -90,
                        offset: 50,
                        position: 'insideTop',
                        style: { fill: 'red' },
                    }}
                    tick={{
                        fill: 'red',
                    }}
                    tickFormatter={(value) => value.toExponential()}
                />
                <YAxis
                    yAxisId="power"
                    dataKey="power"
                    type="number"
                    domain={[0, 5e3]}
                    allowDataOverflow
                    label={{
                        value: 'power',
                        angle: -90,
                        offset: 50,
                        position: 'insideTop',
                        style: { fill: '#82ca9d' },
                    }}
                    tick={{
                        fill: '#82ca9d',
                    }}
                    tickFormatter={(value) => value.toExponential()}
                />
                <Tooltip labelFormatter={(label) => `Время (с): ${label}`} />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <ReferenceLine y={1} stroke="darkblue" yAxisId={'rel'} />
                <ReferenceLine y={0} stroke="darkblue" yAxisId={'reactivity'} />
                <Line
                    name="Мощность/(0.5×номинальная мощность)"
                    type="monotone"
                    dataKey="rel"
                    yAxisId="rel"
                    stroke="#8884d8"
                    isAnimationActive={false}
                    dot={false}
                    hide={!showRel}
                />
                <Line
                    type="monotone"
                    name="Реактивность"
                    dataKey="reactivity"
                    yAxisId="reactivity"
                    stroke="red"
                    dot={false}
                    hide={!showReactivity}
                />
                <Line
                    name="Мощность"
                    type="monotone"
                    dataKey="power"
                    yAxisId={'power'}
                    stroke="#82ca9d"
                    dot={false}
                    hide={!showPower}
                />
            </LineChart>
        </div>
    );
};

export default Chart;
