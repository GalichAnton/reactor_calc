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

export const Chart = () => {
    const { isLight, theme } = useTheme();
    const params = useReactivityStore((state) => state.computedParams);
    const reactorHeight = useReactivityStore(
        (state) => state.initialParams.reactorHeight,
    );
    useCalc();
    const data = params?.calcTime?.map((t, i) => ({
        time: t.toFixed(1),
        rel: params?.calcRel[i],
        power: params?.calcPower[i],
        reactivity: params?.calcReactivity[i],
        height: params?.calcHeight[i],
        uTemp: params?.calcUraniumTemperature[i],
    }));

    const [showRel, setShowRel] = useState(true);
    const [showReactivity, setShowReactivity] = useState(true);
    const [showPower, setShowPower] = useState(true);
    const [showHeight, setShowHeight] = useState(true);

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
                    domain={[0, 600]}
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
                        if (data.dataKey === 'rel') {
                            setShowRel(!showRel);
                        } else if (data.dataKey === 'reactivity') {
                            setShowReactivity(!showReactivity);
                        } else if (data.dataKey === 'power') {
                            setShowPower(!showPower);
                        } else if (data.dataKey === 'height') {
                            setShowHeight(!showHeight);
                        }
                    }}
                    wrapperStyle={{
                        color: themeColors.text,
                    }}
                />
                <YAxis
                    yAxisId="rel"
                    dataKey="rel"
                    type="number"
                    domain={[0, 2]}
                    allowDataOverflow
                    label={{
                        value: 'rel',
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
                    yAxisId="uTemp"
                    dataKey="uTemp"
                    type="number"
                    domain={[0, 1500]}
                    allowDataOverflow
                    label={{
                        value: 'uTemp',
                        angle: -90,
                        offset: 50,
                        position: 'insideTop',
                        style: { fill: themeColors.power },
                    }}
                    tick={{
                        fill: themeColors.power,
                    }}
                />
                <YAxis
                    yAxisId="height"
                    dataKey="height"
                    type="number"
                    domain={[0, 2 * reactorHeight]}
                    allowDataOverflow
                    orientation="right"
                    label={{
                        value: 'Высота',
                        angle: -90,
                        offset: 50,
                        position: 'insideTop',
                        style: { fill: themeColors.height },
                    }}
                    tick={{
                        fill: themeColors.height,
                    }}
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
                <ReferenceLine y={1} stroke="darkblue" yAxisId={'rel'}>
                    <Label value="Отношение = 1" position="insideTop" />
                </ReferenceLine>
                <Line
                    name="Мощность/Номинальная мощность"
                    type="monotone"
                    dataKey="rel"
                    yAxisId="rel"
                    stroke={themeColors.rel}
                    isAnimationActive={false}
                    dot={false}
                    hide={!showRel}
                    strokeWidth={2}
                />
                <Line
                    name="Температура урана"
                    type="monotone"
                    dataKey="uTemp"
                    yAxisId={'uTemp'}
                    stroke={themeColors.power}
                    dot={false}
                    hide={!showPower}
                    strokeWidth={2}
                />
                <Line
                    name="Высота"
                    type="monotone"
                    dataKey="height"
                    yAxisId={'height'}
                    stroke={themeColors.height}
                    dot={false}
                    hide={!showHeight}
                    strokeWidth={2}
                />
            </LineChart>
        </div>
    );
};
