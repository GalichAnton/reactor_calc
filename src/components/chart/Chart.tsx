import { useState } from 'react';

import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

import { useCalc } from '../../shared/lib/hooks/useCalc.tsx';

const Chart = () => {
    const params = useCalc();
    const data = params?.time?.map((t, i) => ({
        time: t,
        rel: params.rel[i],
        power: params.power[i].toExponential(),
        reactivity: params.reactivity[i].toExponential(),
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
        <LineChart width={1100} height={700} data={data}>
            <XAxis
                dataKey="time"
                type="number"
                domain={['auto', 100]}
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
                domain={[1, 50]}
                allowDataOverflow
                label={{
                    value: 'rel',
                    angle: -90,
                    position: 'insideLeft',
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
                domain={[-0.01, 0.009]}
                allowDataOverflow
                label={{
                    value: 'reactivity',
                    angle: -90,
                    position: 'insideLeft',
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
                domain={[0, 20e9]}
                allowDataOverflow
                label={{
                    value: 'power',
                    angle: -90,
                    position: 'insideLeft',
                    style: { fill: '#82ca9d' },
                }}
                tick={{
                    fill: '#82ca9d',
                }}
                tickFormatter={(value) => value.toExponential()}
            />
            <Tooltip labelFormatter={(label) => `Время (с): ${label}`} />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
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
    );
};

export default Chart;
