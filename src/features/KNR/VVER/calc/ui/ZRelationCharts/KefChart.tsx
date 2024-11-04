import { Fragment, useMemo, useState } from 'react';

import { useTheme } from '@shared/lib/hooks';
import { findClosestToTarget } from '@shared/lib/utils';
import { Space } from '@shared/ui';
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
import { KefChartTable } from './KefChartTable.tsx';
import { useIsotopeCompositionStore } from '../../model/store/isotopeCompositionStore.ts';
import { ZRelations } from '../../model/types/zRelations.ts';

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

type ChartValues = {
    reactorOperationalTime: number[];
    k_ef: number[];
    z: number[];
};

export const KefChart = (props: KefChart) => {
    const { zRelationsParams } = props;
    const { isLight, theme } = useTheme();
    const { Sf5, averageSpecificByVolumePower } = useIsotopeCompositionStore(
        (state) => state.isotopesParams,
    );

    const values = useMemo(() => {
        return zRelationsParams?.reduce<ChartValues>(
            (acc, p) => {
                acc.reactorOperationalTime.push(p.reactorOperationalTime);
                acc.k_ef.push(p.effectiveNeutronMultiplicationFactor);
                acc.z.push(p.z);
                return acc;
            },
            { reactorOperationalTime: [], k_ef: [], z: [] },
        );
    }, [zRelationsParams]);

    const data = zRelationsParams?.map((p) => ({
        reactorOperationalTime: p.reactorOperationalTime.toFixed(0),
        k_ef: p.effectiveNeutronMultiplicationFactor.toExponential(3),
        z: p.z,
    }));

    const {
        x: z_company,
        y: company,
        index: companyIndex,
    } = findClosestToTarget(values?.z, values?.k_ef);

    const { x: z_year, index: yearIndex } = findClosestToTarget(
        values?.z,
        values?.reactorOperationalTime,
        365,
    );

    const [showTime, setShowTime] = useState(true);
    const [showKef, setShowKef] = useState(true);

    const themeColors = isLight(theme) ? lightThemeColors : darkThemeColors;

    const reactorCompanyWithoutPu = useMemo(() => {
        if (!zRelationsParams) return;

        const dN5 = Math.abs(
            zRelationsParams[0].nuclearConcentration235UByKR -
                zRelationsParams[companyIndex].nuclearConcentration235UByKR,
        );

        const tcompany =
            (dN5 * Sf5) / (2.85 * 1e18 * averageSpecificByVolumePower);

        const { x: z_companyWithoutPu, index: withoutPu } = findClosestToTarget(
            values?.z,
            values?.reactorOperationalTime,
            tcompany,
        );
        return { z_companyWithoutPu, withoutPu };
    }, [zRelationsParams]);

    return (
        <Space fullWidth direction={'vertical'}>
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

                    <Tooltip
                        labelFormatter={(label) =>
                            `Глубина выгорания: ${label}`
                        }
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
                        isAnimationActive={false}
                        dot={(props) => {
                            const { cx, cy, payload } = props;
                            const labels = [
                                {
                                    value: z_company,
                                    label: 'K_ef кампании',
                                    color: 'red',
                                },
                                {
                                    value: reactorCompanyWithoutPu?.z_companyWithoutPu,
                                    label: 'K_ef кампании без учета Pu',
                                    color: 'red',
                                },
                                {
                                    value: z_year,
                                    label: 'K_ef через год',
                                    color: 'red',
                                },
                            ];

                            for (let i = 0; i < labels.length; i++) {
                                if (payload.z === labels[i].value) {
                                    return (
                                        <Fragment key={labels[i].label}>
                                            <circle
                                                cx={cx}
                                                cy={cy}
                                                r={5}
                                                fill={labels[i].color}
                                                stroke="none"
                                            />
                                            <text
                                                x={cx}
                                                y={
                                                    i % 2 === 0
                                                        ? cy - 10
                                                        : cy + 15
                                                } // Немного поднять текст выше точки
                                                textAnchor="middle"
                                                fill="#333"
                                            >
                                                {labels[i].label}
                                            </text>
                                        </Fragment>
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
                        isAnimationActive={false}
                        dot={false}
                        hide={!showTime}
                    />
                </LineChart>
            </div>
            <KefChartTable
                company={values?.reactorOperationalTime[companyIndex]}
                Z_company={z_company}
                Z_year={z_year}
                K_ef_year={values?.k_ef[yearIndex]}
                K_ef_company={company}
                companyWithoutPu={
                    reactorCompanyWithoutPu
                        ? values?.reactorOperationalTime[
                              reactorCompanyWithoutPu.withoutPu
                          ]
                        : 0
                }
            />
        </Space>
    );
};
