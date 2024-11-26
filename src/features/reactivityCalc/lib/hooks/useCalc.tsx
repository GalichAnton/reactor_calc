import { useEffect } from 'react';

import { ReactorParams } from '@entities/reactor';
import { precision } from '@shared/constants/precision.ts';
import { roundToDecimal } from '@shared/lib/utils';

import {
    bettaSix,
    Lambda,
    lambdaSix,
    LAMBDA_U,
    DELTA_ZAZ,
    LAMBDA_ZAZ,
    DELTA_OB,
    LAMBDA_OB,
    URANIUM_DENSITY,
    URANIUM_HEAT_CAPACITY,
    ALPHA_COEF,
} from '../../constants/general.ts';
import { calcPowerSix } from '../../lib/utils/calcPower';
import { useReactivityStore } from '../../model/store.ts';

export const useCalc = () => {
    const {
        initialParams: {
            velocity,
            mode,
            startReactivity,
            height,
            interval,
            nominalPower,
            reactorHeight,
            r_t,
            nTvel,
            nTvs,
            coolantTemp,
            aCoef,
            uraniumVolume,
            tauZero,
            averageUraniumTemp,
            nominalThermalPower,
        },
        setComputedParams,
        setInitialParam,
        config: { start },
        computedParams,
    } = useReactivityStore();

    useEffect(() => {
        if (start && !computedParams.calcC.length) {
            const initialParams = {
                calcTime: 0,
                calcHeight: height,
                calcReactivity: startReactivity,
                calcPower: nominalPower,
                calcC: bettaSix.map((b, i) => {
                    return (b * nominalPower) / (lambdaSix[i] * Lambda);
                }),
                calcRel: 1,
                calcThermalReactivity: 0,
                calcHeightReactivity: 0,
                calcThermalPower: nominalThermalPower,
                calcUraniumTemperature: averageUraniumTemp,
                calcPrevSigma: 0,
            };

            const uraniumVolume =
                Math.PI * r_t ** 2 * nTvel * nTvs * (reactorHeight / 100);

            const thermalTransferCoeff =
                1 /
                ((r_t * 0.4) / LAMBDA_U +
                    DELTA_ZAZ / LAMBDA_ZAZ +
                    DELTA_OB / LAMBDA_OB +
                    1 / ALPHA_COEF);

            const tauZero =
                (r_t * URANIUM_DENSITY * URANIUM_HEAT_CAPACITY) /
                (2 * thermalTransferCoeff);

            const aCoef = r_t / (2 * thermalTransferCoeff);

            setComputedParams(initialParams);
            setInitialParam('uraniumVolume', uraniumVolume);
            setInitialParam('thermalTransferCoeff', thermalTransferCoeff);
            setInitialParam('tauZero', tauZero);
            setInitialParam('aCoef', aCoef);
        }
    }, [start]);

    useEffect(() => {
        if (!start || !computedParams.calcC.length) {
            return;
        }

        const timeInterval = setInterval(() => {
            const { computedParams, initialParams } =
                useReactivityStore.getState();

            if (!computedParams) {
                return;
            }
            const lastIndex = computedParams.calcReactivity.length - 1;
            const currentHeight = initialParams.height;
            const currentTime = computedParams.calcTime[lastIndex];
            const dh = currentHeight - computedParams.calcHeight[lastIndex];

            const newParams = calcPowerSix({
                prevH: computedParams.calcHeight[lastIndex],
                prevRo: computedParams.calcReactivity[lastIndex],
                prevPower: computedParams.calcPower[lastIndex],
                prevC: computedParams.calcC[lastIndex],
                velocity: velocity,
                interval: interval,
                mode: initialParams.mode,
                reactorHeight: reactorHeight,
                prevCalcUraniumTemperature:
                    computedParams.calcUraniumTemperature[lastIndex],
                prevCalcThermalReactivity:
                    computedParams.calcThermalReactivity[lastIndex],
                prevCalcHeightReactivity:
                    computedParams.calcHeightReactivity[lastIndex],
                nominalThermalPower,
                coolantTemp: coolantTemp,
                uraniumVolume,
                nominalPower,
                tauZero,
                aCoef,
                dh,
            });

            setInitialParam(
                'height',
                roundToDecimal(newParams.newH, precision),
            );
            setInitialParam(
                'power',
                roundToDecimal(newParams.newPower, precision),
            );
            setInitialParam(
                'startReactivity',
                roundToDecimal(newParams.newRo, precision),
            );
            setInitialParam(
                'thermalPower',
                roundToDecimal(newParams.thermalPower, precision),
            );
            setInitialParam(
                'averageUraniumTemp',
                roundToDecimal(newParams.uraniumTemp, precision),
            );
            setInitialParam(
                'corePowerDensity',
                roundToDecimal(newParams.thermalDensity, precision),
            );

            setComputedParams({
                calcHeight: newParams.newH,
                calcTime: currentTime + interval,
                calcReactivity: newParams.newRo,
                calcPower: newParams.newPower,
                calcC: newParams.newC,
                calcRel: newParams.rel,
                calcHeightReactivity: newParams.heightReactivity,
                calcThermalReactivity: newParams.thermalReactivity,
                calcThermalPower: newParams.thermalPower,
                calcPrevSigma: 0,
                calcUraniumTemperature: newParams.uraniumTemp,
            });
        }, interval * 1000);

        return () => {
            clearInterval(timeInterval);
        };
    }, [interval, velocity, mode, start, height, computedParams]);

    return computedParams || ({} as ReactorParams);
};
