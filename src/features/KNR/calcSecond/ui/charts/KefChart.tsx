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
    ReferenceDot,
    ReferenceLine,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

import styles from './chart.module.css';
import { useCompanyParamsStore, useZRelationsStore } from '../../index';

const lightThemeColors = {
    grid: '#333',
    nU5con: '#1f5316',
    nPu9con: '#55278d',
    time: 'red',
    k_ef: '#0c233d',
    reactivity: '#210741',
    text: '#2C3E50', // темно-синий для текста
    background: '#FFFFFF', // белый фон
};

const darkThemeColors = {
    text: '#ECF0F1', // светло-серый для текста
    background: '#2C3E50', // темно-синий фон
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
            company: { z: zCompany, k_ef: KefCompany },
            year: { z: zYear, k_ef: KefYear },
            withoutPu: { z: zWithoutPum, k_ef: KefWithoutPu },
            otr: { z: z_otr, k_ef: k_efOtr },
            fuelCompany: { z: z_fuel, k_ef: KefFuel },
        },
    } = useCompanyParamsStore();
    const { isLight, theme } = useTheme();

    const data = zRelationsParams?.map((p) => ({
        reactorOperationalTime: p.reactorOperationalTime.toFixed(precision),
        k_ef: p.effectiveNeutronMultiplicationFactor.toExponential(precision),
        z: p.z.toExponential(precision),
        reactivity: p.reactivity.toExponential(precision),
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
                <ReferenceDot
                    yAxisId={'k_ef'}
                    x={zWithoutPum.value}
                    y={KefWithoutPu.value}
                    r={4}
                    fill={themeColors.k_ef}
                    label={{
                        value: `K_ef без учета Pu=${KefWithoutPu.value.toFixed(precision)}`,
                        position: 'insideBottomLeft',
                        fill: themeColors.text,
                        fontSize: 12,
                        fontWeight: 'normal',
                    }}
                />
                <ReferenceDot
                    yAxisId={'k_ef'}
                    x={zCompany.value}
                    y={KefCompany.value}
                    r={4}
                    fill={themeColors.k_ef}
                    label={{
                        value: `K_ef=${KefCompany.value.toFixed(2)}`,
                        position: 'insideBottomLeft',
                        fill: themeColors.text,
                        fontSize: 12,
                        fontWeight: 'normal',
                    }}
                />
                <ReferenceDot
                    yAxisId={'k_ef'}
                    x={z_fuel.value}
                    y={KefFuel.value}
                    r={4}
                    fill={themeColors.k_ef}
                    label={{
                        value: `K_ef компании топлива = ${KefFuel.value.toFixed(precision)}`,
                        position: 'insideRight',
                        fill: themeColors.text,
                    }}
                />
                <ReferenceDot
                    yAxisId={'k_ef'}
                    x={zYear.value}
                    y={KefYear.value}
                    r={4}
                    fill={themeColors.k_ef}
                    label={{
                        value: `K_ef года=${KefYear.value.toFixed(precision)}`,
                        position: 'insideBottomLeft',
                        fill: themeColors.text,
                        fontSize: 12,
                        fontWeight: 'normal',
                    }}
                />
                <ReferenceDot
                    yAxisId={'k_ef'}
                    x={z_otr.value}
                    y={k_efOtr.value}
                    r={4}
                    fill={themeColors.k_ef}
                    label={{
                        value: `K_ef отравленый=${k_efOtr.value.toFixed(precision)}`,
                        position: 'insideBottomLeft',
                        fill: themeColors.text,
                        fontSize: 12,
                        fontWeight: 'normal',
                    }}
                />
                <Line
                    name="Эффективный коэффициент"
                    type="monotone"
                    dataKey="k_ef"
                    yAxisId="k_ef"
                    stroke={themeColors.k_ef}
                    hide={!showKef}
                    dot={false}
                />
                <Line
                    name="Время работы реактора в сутках"
                    type="monotone"
                    dataKey="reactorOperationalTime"
                    yAxisId="reactorOperationalTime"
                    stroke={themeColors.time}
                    dot={false}
                    hide={!showTime}
                />
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
