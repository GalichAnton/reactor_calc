import { useEffect } from 'react';

import { ReactorParams } from '@entities/reactor';

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
        },
        setComputedParams,
        setComputedParam,
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
                calcPower: 0.5 * nominalPower,
                calcC: bettaSix.map((b, i) => {
                    return (b * 0.5 * nominalPower) / (lambdaSix[i] * Lambda);
                }),
                calcRel: 1,
                calcThermalReactivity: 0,
                calcHeightReactivity: 0,
                calcThermalPower: 0,
                calcUraniumTemperature: 0,
            };

            const uraniumVolume =
                Math.PI * r_t ** 2 * nTvel * nTvs * reactorHeight;

            const thermalTransferCoeff =
                1 /
                ((r_t * 0.4) / LAMBDA_U +
                    DELTA_ZAZ / LAMBDA_ZAZ +
                    DELTA_OB / LAMBDA_OB);

            const tauZero =
                ((r_t * URANIUM_DENSITY * URANIUM_HEAT_CAPACITY) / 2) *
                thermalTransferCoeff;

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
            const currentHeight = computedParams.calcHeight[lastIndex];
            const currentTime = computedParams.calcTime[lastIndex];
            if (currentHeight >= reactorHeight) {
                setComputedParam('calcHeight', reactorHeight);
            }

            if (currentHeight <= 0) {
                setComputedParam('calcHeight', 0);
            }

            const newParams = calcPowerSix({
                prevH: currentHeight,
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
                prevThermalPower: computedParams.calcThermalPower[lastIndex],
                coolantTemp: coolantTemp,
                uraniumVolume,
                nominalPower,
                tauZero,
                aCoef,
            });

            setInitialParam('height', newParams.newH);
            setInitialParam('power', newParams.newPower);
            setInitialParam('startReactivity', newParams.newRo);
            setInitialParam('thermalPower', newParams.thermalPower);
            setInitialParam('averageUraniumTemp', newParams.uraniumTemp);
            setInitialParam('corePowerDensity', newParams.thermalDensity);

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
                calcUraniumTemperature: newParams.uraniumTemp,
            });
        }, interval * 1000);

        return () => {
            clearInterval(timeInterval);
        };
    }, [interval, velocity, mode, start, height, computedParams]);

    return computedParams || ({} as ReactorParams);
};
