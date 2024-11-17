import { useState } from 'react';

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

import styles from './chart.module.css';
import { ZRelations } from '../../model/types/zRelations.ts';

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

    const [showByBat, setShowByBat] = useState(true);
    const [showByRum, setShowByRum] = useState(true);
    const [showByKR, setShowByKR] = useState(true);

    const themeColors = isLight(theme) ? lightThemeColors : darkThemeColors;

    const domain = [0, 1e21];

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
                        if (data.dataKey === 'N5ByBat') {
                            setShowByBat(!showByBat);
                        } else if (data.dataKey === 'N9ByBat') {
                            setShowByBat(!showByBat);
                        } else if (data.dataKey === 'N5ByRum') {
                            setShowByRum(!showByRum);
                        } else if (data.dataKey === 'N9ByRum') {
                            setShowByRum(!showByRum);
                        } else if (data.dataKey === 'N5ByKR') {
                            setShowByKR(!showByKR);
                        } else if (data.dataKey === 'N9ByKR') {
                            setShowByKR(!showByKR);
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
                    strokeWidth={3}
                    dot={false}
                    hide={!showByBat}
                    strokeDasharray="7"
                />
                <Line
                    name="Концентрация Pu239 по Бать"
                    type="monotone"
                    dataKey="N9ByBat"
                    yAxisId="nuclearConcentration"
                    stroke={themeColors.nuclearConcentration239PuByBat}
                    dot={false}
                    hide={!showByBat}
                    strokeDasharray="7"
                    strokeWidth={2}
                />
                <Line
                    name="Концентрация U235 по Румянцеву"
                    type="monotone"
                    dataKey="N5ByRum"
                    yAxisId="nuclearConcentration"
                    stroke={themeColors.nuclearConcentration235UByRum}
                    strokeWidth={4}
                    dot={false}
                    hide={!showByRum}
                    strokeDasharray="4"
                />
                <Line
                    name="Концентрация Pu239 по Румянцеву"
                    type="monotone"
                    dataKey="N9ByRum"
                    yAxisId="nuclearConcentration"
                    stroke={themeColors.nuclearConcentration239PuByRum}
                    dot={false}
                    hide={!showByRum}
                    strokeDasharray="4"
                    strokeWidth={4}
                />
                <Line
                    name="Концентрация U235 по методу конечных-разностей"
                    type="monotone"
                    dataKey="N5ByKR"
                    yAxisId="nuclearConcentration"
                    stroke={themeColors.nuclearConcentration235UByKR}
                    dot={false}
                    hide={!showByKR}
                    strokeWidth={2}
                />
                <Line
                    name="Концентрация Pu239 по методу конечных-разностей"
                    type="monotone"
                    dataKey="N9ByKR"
                    yAxisId="nuclearConcentration"
                    stroke={themeColors.nuclearConcentration239PuByKR}
                    dot={false}
                    hide={!showByKR}
                    strokeWidth={2}
                />
            </LineChart>
        </div>
    );
};
