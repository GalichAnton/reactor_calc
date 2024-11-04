import { useState } from 'react';

import { ZRelations } from '@features/KNR/VVER/calc/model/types/zRelations.ts';
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
    nU5con: '#1f5316',
    nPu9con: '#55278d',
    time: 'red',
    k_ef: '#0c233d',
};

const darkThemeColors = {
    text: '#fff',
    grid: '#eee',
    nU5con: '#55e13b',
    nPu9con: '#8c3dee',
    time: '#ff6666',
    k_ef: '#389aff',
};

interface KefChart {
    zRelationsParams?: ZRelations[];
}

export const KefChart = (props: KefChart) => {
    const { zRelationsParams } = props;
    const { isLight, theme } = useTheme();

    const data = zRelationsParams?.map((p) => ({
        reactorOperationalTime: p.reactorOperationalTime.toFixed(3),
        k_ef: p.effectiveNeutronMultiplicationFactor.toExponential(3),
        z: p.z,
    }));

    const [showTime, setShowTime] = useState(true);
    const [showKef, setShowKef] = useState(true);

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
                    domain={[0, 'dataMax']}
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
                        } else if (data.dataKey === 'time') {
                            setShowTime(!showTime);
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
                    yAxisId="nU5con"
                    dataKey="nU5con"
                    type="number"
                    domain={[0, 10e20]}
                    allowDataOverflow
                    label={{
                        value: 'nU5con',
                        angle: -90,
                        offset: 50,
                        position: 'insideTop',
                        style: { fill: themeColors.nU5con },
                    }}
                    tick={{
                        fill: themeColors.nU5con,
                    }}
                    tickFormatter={(value) => value.toExponential()}
                />
                <YAxis
                    yAxisId="nPu9con"
                    dataKey="nPu9con"
                    type="number"
                    domain={[0, 10e20]}
                    allowDataOverflow
                    label={{
                        value: 'nPu9con',
                        angle: -90,
                        offset: 50,
                        position: 'insideTop',
                        style: { fill: themeColors.nPu9con },
                    }}
                    tick={{
                        fill: themeColors.nPu9con,
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
                    <Label value="k_ef = 1" position="insideTop" />
                </ReferenceLine>
                <Line
                    name="Эффективный коэффициент"
                    type="monotone"
                    dataKey="k_ef"
                    yAxisId="k_ef"
                    stroke={themeColors.k_ef}
                    isAnimationActive={false}
                    dot={false}
                    hide={!showKef}
                />
                <Line
                    name="Ядерная концентрация 239Pu, в см⁻³"
                    type="monotone"
                    dataKey="nPu9con"
                    yAxisId="nPu9con"
                    stroke={themeColors.nPu9con}
                    isAnimationActive={false}
                    dot={false}
                    hide={!showTime}
                />
                <Line
                    name="Ядерная концентрация 235U, в см⁻³"
                    type="monotone"
                    dataKey="nU5con"
                    yAxisId="nU5con"
                    stroke={themeColors.nU5con}
                    isAnimationActive={false}
                    dot={false}
                    hide={!showTime}
                />
                <Line
                    name="Время работы реактора в сутках"
                    type="monotone"
                    dataKey="reactorOperationalTime"
                    yAxisId="reactorOperationalTime"
                    stroke={themeColors.time}
                    isAnimationActive={false}
                    dot={false}
                    hide={!showTime}
                />
            </LineChart>
        </div>
    );
};
