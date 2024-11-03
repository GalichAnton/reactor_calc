import { useMemo, useState } from 'react';

import { ZRelations } from '@features/KNR/VVER/calc/model/types/zRelations.ts';
import { START_Z } from '@features/KNR/VVER/setInitialValues';
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
    time: 'red',
    k_ef: '#0c233d',
};

const darkThemeColors = {
    text: '#fff',
    grid: '#eee',
    reactivity: '#ff6666',
    rel: '#7a66ff',
    time: '#ff6666',
    k_ef: '#389aff',
};

interface ZRelationChart {
    zRelationsParams?: ZRelations[];
}

export const ZRelationChart = (props: ZRelationChart) => {
    const { zRelationsParams } = props;
    const { isLight, theme } = useTheme();

    const data = zRelationsParams?.map((p) => ({
        reactorOperationalTime: p.reactorOperationalTime,
        k_ef: p.effectiveNeutronMultiplicationFactor,
    }));

    const [showTime, setShowTime] = useState(true);
    const [showKef, setShowKef] = useState(true);

    const themeColors = isLight(theme) ? lightThemeColors : darkThemeColors;
    console.log(data);

    const dataSource = useMemo(() => {
        return data?.map((p, i) => ({
            ...p,
            z: START_Z[i],
        }));
    }, [data]);

    return (
        <div
            className={classNames(styles.chartContainer, {
                [styles.dark]: !isLight(theme),
            })}
        >
            <LineChart width={1000} height={500} data={dataSource}>
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
