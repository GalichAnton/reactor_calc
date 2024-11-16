import { useState } from 'react';

import { precision } from '@shared/constants/precision.ts';
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
import { useCompanyParamsStore, useZRelationsStore } from '../../index';

const lightThemeColors = {
    text: '#000',
    grid: '#333',
    nU5con: '#1f5316',
    nPu9con: '#55278d',
    time: 'red',
    k_ef: '#0c233d',
    reactivity: '#210741',
};

const darkThemeColors = {
    text: '#fff',
    grid: '#eee',
    nU5con: '#55e13b',
    nPu9con: '#8c3dee',
    time: '#ff6666',
    k_ef: '#389aff',
    reactivity: '#c391ff',
};

export const KefChart = () => {
    const { zRelationsParams } = useZRelationsStore();
    const {
        companyParams: {
            company: { z },
            year: { z: zYear },
            withoutPu: { z: zWithoutPu },
            otr: { z: z_otr, k_ef: k_efOtr },
        },
    } = useCompanyParamsStore();

    const { isLight, theme } = useTheme();

    const data = zRelationsParams?.map((p) => ({
        reactorOperationalTime: p.reactorOperationalTime.toFixed(3),
        k_ef: p.effectiveNeutronMultiplicationFactor.toExponential(3),
        z: p.z.toExponential(precision),
        reactivity: p.reactivity.toExponential(3),
    }));

    const [showTime, setShowTime] = useState(true);
    const [showKef, setShowKef] = useState(true);
    const [showReactivity, setShowReactivity] = useState(true);

    const themeColors = isLight(theme) ? lightThemeColors : darkThemeColors;

    return (
        <div
            className={classNames(styles.chartContainer, {
                [styles.dark]: !isLight(theme),
            })}
        >
            <LineChart width={1000} height={500} data={data}>
                <XAxis
                    dataKey="z"
                    type="number"
                    domain={[0, 2]}
                    allowDataOverflow
                    label={{
                        value: 'Глубина выгорания',
                        position: 'insideBottomRight',
                        offset: 0,
                        style: { fill: themeColors.text },
                    }}
                />
                <Legend
                    onClick={(data) => {
                        if (data.dataKey === 'k_ef') {
                            setShowKef(!showKef);
                        } else if (data.dataKey === 'reactorOperationalTime') {
                            setShowTime(!showTime);
                        } else if (data.dataKey === 'reactivity') {
                            setShowReactivity(!showReactivity);
                        }
                    }}
                    wrapperStyle={{
                        color: themeColors.text,
                    }}
                />
                <YAxis
                    yAxisId="k_ef"
                    dataKey="k_ef"
                    type="number"
                    domain={[0.5, 1.5]}
                    allowDataOverflow
                    label={{
                        value: 'k_ef',
                        angle: -90,
                        offset: 50,
                        position: 'insideTop',
                        style: { fill: themeColors.k_ef },
                    }}
                    tick={{
                        fill: themeColors.k_ef,
                    }}
                    tickFormatter={(value) => value.toExponential()}
                />
                <YAxis
                    yAxisId="reactorOperationalTime"
                    dataKey="reactorOperationalTime"
                    type="number"
                    domain={[0, 1500]}
                    allowDataOverflow
                    label={{
                        value: 'reactorOperationalTime',
                        angle: -90,
                        offset: 50,
                        position: 'insideTop',
                        style: { fill: themeColors.time },
                    }}
                    tick={{
                        fill: themeColors.time,
                    }}
                    tickFormatter={(value) => value.toExponential()}
                />
                <YAxis
                    yAxisId="reactivity"
                    dataKey="reactivity"
                    type="number"
                    domain={[-0.3, 0.3]}
                    allowDataOverflow
                    label={{
                        value: 'reactivity',
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
                <Tooltip
                    labelFormatter={(label) => `Глубина выгорания: ${label}`}
                    contentStyle={{
                        backgroundColor: isLight(theme) ? '#fff' : '#333',
                        color: themeColors.text,
                    }}
                />
                <CartesianGrid
                    stroke={themeColors.grid}
                    strokeDasharray="5 5"
                />
                <ReferenceLine y={1} stroke="darkblue" yAxisId={'k_ef'}>
                    <Label value="k_ef = 1" position="insideBottomLeft" />
                </ReferenceLine>
                <Line
                    name="Эффективный коэффициент"
                    type="monotone"
                    dataKey="k_ef"
                    yAxisId="k_ef"
                    stroke={themeColors.k_ef}
                    dot={(props) => {
                        const { cx, cy, payload } = props;
                        const labels = [
                            {
                                value: 1e-24,
                                label: 'K_ef отравленный',
                                color: 'red',
                                positionY: cy - 10,
                                positionX: cx + 60,
                            },
                            {
                                value: z.value,
                                label: 'K_ef кампании',
                                color: 'red',
                                positionY: cy - 5,
                                positionX: cx + 50,
                            },
                            {
                                value: zWithoutPu.value,
                                label: 'K_ef кампании без учета Pu',
                                color: 'red',
                                positionY: cy - 10,
                                positionX: cx + 70,
                            },
                            {
                                value: zYear.value,
                                label: 'K_ef через год',
                                color: 'red',
                                positionY: cy - 10,
                                positionX: cx - 20,
                            },
                        ];

                        for (let i = 0; i < labels.length; i++) {
                            if (
                                payload.z ===
                                labels[i].value.toExponential(precision)
                            ) {
                                return (
                                    <>
                                        <circle
                                            cx={cx}
                                            cy={cy}
                                            r={5}
                                            fill={labels[i].color}
                                            stroke="none"
                                        />
                                        <text
                                            x={labels[i].positionX}
                                            y={labels[i].positionY} // Немного поднять текст выше точки
                                            textAnchor="middle"
                                            fill="#333"
                                            fontWeight="bold"
                                        >
                                            {labels[i].label}
                                        </text>
                                    </>
                                );
                            }
                        }

                        return <></>;
                    }}
                    hide={!showKef}
                />
                <Line
                    name="Время работы реактора в сутках"
                    type="monotone"
                    dataKey="reactorOperationalTime"
                    yAxisId="reactorOperationalTime"
                    stroke={themeColors.time}
                    dot={false}
                    hide={!showTime}
                />{' '}
                <Line
                    name="Реактивность"
                    type="linear"
                    dataKey="reactivity"
                    yAxisId="reactivity"
                    stroke={themeColors.reactivity}
                    dot={false}
                    hide={!showReactivity}
                />
            </LineChart>
        </div>
    );
};
