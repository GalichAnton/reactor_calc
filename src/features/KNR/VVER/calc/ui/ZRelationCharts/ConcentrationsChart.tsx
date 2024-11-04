import { useState } from 'react';

import { ZRelations } from '@features/KNR/VVER/calc/model/types/zRelations.ts';
import styles from '@features/KNR/VVER/calc/ui/ZRelationCharts/chart.module.css';
import { useTheme } from '@shared/lib/hooks';
import classNames from 'classnames';
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

const lightThemeColors = {
    text: '#000',
    grid: '#333',
    nuclearConcentration235UByBat: '#e2cd65',
    nuclearConcentration239PuByBat: '#e2cd65',
    nuclearConcentration239PuByRum: '#0c233d',
    nuclearConcentration235UByRum: '#0c233d',
    nuclearConcentration239PuByKR: '#2aac0c',
    nuclearConcentration235UByKR: '#2aac0c',
};

const darkThemeColors = {
    text: '#fff',
    grid: '#eee',
    nuclearConcentration235UByBat: '#fee380',
    nuclearConcentration239PuByBat: '#fee380',
    nuclearConcentration239PuByRum: '#389aff',
    nuclearConcentration235UByRum: '#389aff',
    nuclearConcentration239PuByKR: '#7bf264',
    nuclearConcentration235UByKR: '#7bf264',
};

interface ConcentrationsChartProps {
    zRelationsParams?: ZRelations[];
}

export const ConcentrationsChart = (props: ConcentrationsChartProps) => {
    const { zRelationsParams } = props;
    const { isLight, theme } = useTheme();

    const data = zRelationsParams?.map((p) => ({
        N5ByBat: p.nuclearConcentration235UByBat.toExponential(3),
        N9ByBat: p.nuclearConcentration239PuByBat.toExponential(3),
        N5ByRum: p.nuclearConcentration235UByRum.toExponential(3),
        N9ByRum: p.nuclearConcentration239PuByRum.toExponential(3),
        N5ByKR: p.nuclearConcentration235UByKR.toExponential(3),
        N9ByKR: p.nuclearConcentration239PuByKR.toExponential(3),
        z: p.z,
    }));

    const [showN5ByBat, setShowN5ByBat] = useState(true);
    const [showN9ByBat, setShowN9ByBat] = useState(true);
    const [showN5ByRum, setShowN5ByRum] = useState(true);
    const [showN9ByRum, setShowN9ByRum] = useState(true);
    const [showN5ByKR, setShowN5ByKR] = useState(true);
    const [showN9ByKR, setShowN9ByKR] = useState(true);

    const themeColors = isLight(theme) ? lightThemeColors : darkThemeColors;

    const domain = [0, 10e20];

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
                        if (data.dataKey === 'N5ByBat') {
                            setShowN5ByBat(!showN5ByBat);
                        } else if (data.dataKey === 'N9ByBat') {
                            setShowN9ByBat(!showN9ByBat);
                        } else if (data.dataKey === 'N5ByRum') {
                            setShowN5ByRum(!showN5ByRum);
                        } else if (data.dataKey === 'N9ByRum') {
                            setShowN9ByRum(!showN9ByRum);
                        } else if (data.dataKey === 'N5ByKR') {
                            setShowN5ByKR(!showN5ByKR);
                        } else if (data.dataKey === 'N9ByKR') {
                            setShowN9ByKR(!showN9ByKR);
                        }
                    }}
                    wrapperStyle={{
                        color: themeColors.text,
                    }}
                />
                <YAxis
                    yAxisId="nuclearConcentration"
                    type="number"
                    domain={domain}
                    allowDataOverflow
                    label={{
                        value: 'U235, Pu239',
                        angle: -90,
                        offset: 150,
                        position: 'insideTop',
                        style: {
                            fill: themeColors.nuclearConcentration235UByRum,
                        },
                    }}
                    tick={{
                        fill: themeColors.nuclearConcentration235UByRum,
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
                <Line
                    name="Концентрация U235 по Бать"
                    type="monotone"
                    dataKey="N5ByBat"
                    yAxisId="nuclearConcentration"
                    stroke={themeColors.nuclearConcentration235UByBat}
                    isAnimationActive={false}
                    strokeWidth={3}
                    dot={false}
                    hide={!showN5ByBat}
                    strokeDasharray="7"
                />
                <Line
                    name="Концентрация Pu239 по Бать"
                    type="monotone"
                    dataKey="N9ByBat"
                    yAxisId="nuclearConcentration"
                    stroke={themeColors.nuclearConcentration239PuByBat}
                    isAnimationActive={false}
                    dot={false}
                    hide={!showN9ByBat}
                    strokeDasharray="7"
                    strokeWidth={2}
                />
                <Line
                    name="Концентрация U235 по Румянцеву"
                    type="monotone"
                    dataKey="N5ByRum"
                    yAxisId="nuclearConcentration"
                    stroke={themeColors.nuclearConcentration235UByRum}
                    isAnimationActive={false}
                    strokeWidth={2}
                    dot={false}
                    hide={!showN5ByRum}
                    strokeDasharray="4"
                />
                <Line
                    name="Концентрация Pu239 по Румянцеву"
                    type="monotone"
                    dataKey="N9ByRum"
                    yAxisId="nuclearConcentration"
                    stroke={themeColors.nuclearConcentration239PuByRum}
                    dot={false}
                    hide={!showN9ByRum}
                    strokeDasharray="4"
                    strokeWidth={2}
                />
                <Line
                    name="Концентрация U235 по методу конечных-разностей"
                    type="monotone"
                    dataKey="N5ByKR"
                    yAxisId="nuclearConcentration"
                    stroke={themeColors.nuclearConcentration235UByKR}
                    dot={false}
                    hide={!showN5ByKR}
                    strokeWidth={2}
                />
                <Line
                    name="Концентрация Pu239 по методу конечных-разностей"
                    type="monotone"
                    dataKey="N9ByKR"
                    yAxisId="nuclearConcentration"
                    stroke={themeColors.nuclearConcentration239PuByKR}
                    dot={false}
                    hide={!showN9ByKR}
                    strokeWidth={2}
                />
            </LineChart>
        </div>
    );
};
