import { useState } from 'react';

import { useCalc, useReactivityStore } from '@features/reactivityCalc';
import { useTheme } from '@shared/lib/hooks';
import classNames from 'classnames';
import {
    CartesianGrid,
    Label,
    Legend,
    Line,
    LineChart,
    ReferenceLine,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

import styles from './chart.module.css';

const lightThemeColors = {
    text: '#000',
    grid: '#333',
    reactivity: 'red',
    rel: '#8884d8',
    power: '#82ca9d',
    height: '#0c233d',
};

const darkThemeColors = {
    text: '#fff',
    grid: '#eee',
    reactivity: '#ff6666',
    rel: '#7a66ff',
    power: '#66cc99',
    height: '#389aff',
};

export const ReactivitiesChart = () => {
    const { isLight, theme } = useTheme();
    const params = useReactivityStore((state) => state.computedParams);

    useCalc();
    const data = params?.calcTime?.map((t, i) => ({
        time: t.toFixed(1),
        thermalReactivity: params?.calcThermalReactivity[i].toExponential(3),
        heightReactivity: params?.calcHeightReactivity[i].toExponential(3),
        reactivity: params?.calcReactivity[i].toExponential(3),
    }));

    const [showReactivity, setShowReactivity] = useState(true);
    const [showThermalReactivity, setShowThermalReactivity] = useState(true);
    const [showHeightReactivity, setShowHeightReactivity] = useState(true);

    const xTicks = [];
    for (let i = 0; i <= 120; i += 2) {
        xTicks.push(i);
    }

    const themeColors = isLight(theme) ? lightThemeColors : darkThemeColors;

    return (
        <div
            className={classNames(styles.chartContainer, {
                [styles.dark]: !isLight(theme),
            })}
        >
            <LineChart width={1000} height={500} data={data}>
                <XAxis
                    dataKey="time"
                    type="number"
                    domain={[
                        0,
                        (dataMax: number) => (dataMax > 150 ? dataMax : 150),
                    ]}
                    allowDataOverflow
                    label={{
                        value: 'Время (с)',
                        position: 'insideBottomRight',
                        offset: 0,
                        style: { fill: themeColors.text },
                    }}
                />
                <Legend
                    onClick={(data) => {
                        if (data.dataKey === 'reactivity') {
                            setShowReactivity(!showReactivity);
                        } else if (data.dataKey === 'thermalReactivity') {
                            setShowThermalReactivity(!showThermalReactivity);
                        } else if (data.dataKey === 'heightReactivity') {
                            setShowHeightReactivity(!showHeightReactivity);
                        }
                    }}
                    wrapperStyle={{
                        color: themeColors.text,
                    }}
                />
                <YAxis
                    yAxisId="reactivity"
                    dataKey="reactivity"
                    type="number"
                    domain={[0.5, 0.5]}
                    allowDataOverflow
                    label={{
                        value: 'reactivity',
                        angle: -90,
                        offset: 50,
                        position: 'insideTop',
                        style: { fill: themeColors.rel },
                    }}
                    tick={{
                        fill: themeColors.rel,
                    }}
                />
                <YAxis
                    yAxisId="thermalReactivity"
                    dataKey="thermalReactivity"
                    type="number"
                    domain={[0.5, 0.5]}
                    allowDataOverflow
                    label={{
                        value: 'thermalReactivity',
                        angle: -90,
                        offset: 50,
                        position: 'insideTop',
                        style: { fill: themeColors.reactivity },
                    }}
                    tick={{
                        fill: themeColors.reactivity,
                    }}
                    tickFormatter={(value) => value.toExponential()}
                />
                <YAxis
                    yAxisId="heightReactivity"
                    dataKey="heightReactivity"
                    type="number"
                    domain={[0.5, 0.5]}
                    allowDataOverflow
                    label={{
                        value: 'heightReactivity',
                        angle: -90,
                        offset: 50,
                        position: 'insideTop',
                        style: { fill: themeColors.power },
                    }}
                    tick={{
                        fill: themeColors.power,
                    }}
                    tickFormatter={(value) => value.toExponential()}
                />
                <Tooltip
                    labelFormatter={(label) => `Время (с): ${label}`}
                    contentStyle={{
                        backgroundColor: isLight(theme) ? '#fff' : '#333',
                        color: themeColors.text,
                    }}
                />
                <CartesianGrid
                    stroke={themeColors.grid}
                    strokeDasharray="5 5"
                />
                <ReferenceLine y={0} stroke="darkblue" yAxisId={'reactivity'}>
                    <Label value="Реактивность = 0" position="insideTop" />
                </ReferenceLine>
                <Line
                    type="monotone"
                    name="Реактивность"
                    dataKey="reactivity"
                    yAxisId="reactivity"
                    stroke={themeColors.reactivity}
                    dot={false}
                    hide={!showReactivity}
                    strokeWidth={2}
                />
                <Line
                    name="Реактивность от высоты стержней"
                    type="monotone"
                    dataKey="heightReactivity"
                    yAxisId={'heightReactivity'}
                    stroke={themeColors.power}
                    dot={false}
                    hide={!showHeightReactivity}
                    strokeWidth={2}
                />
                <Line
                    name="Реактивность от температуры"
                    type="monotone"
                    dataKey="thermalReactivity"
                    yAxisId={'thermalReactivity'}
                    stroke={themeColors.height}
                    dot={false}
                    hide={!showThermalReactivity}
                    strokeWidth={2}
                />
            </LineChart>
        </div>
    );
};
