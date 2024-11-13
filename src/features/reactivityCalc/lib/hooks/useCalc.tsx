import { useEffect } from 'react';

import { ReactorParams } from '@entities/reactor';

import {
    betta,
    bettaSix,
    Lambda,
    lambda,
    lambdaSix,
} from '../../constants/general.ts';
import { calcPowerSix, calcPower } from '../../lib/utils/calcPower';
import { useReactivityStore } from '../../model/store.ts';
import { ComputedParams } from '../../model/types/computedParams.ts';

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
        },
        setComputedParams,
        config: { start, isSix },
        computedParams,
    } = useReactivityStore();

    useEffect(() => {
        if (start && !computedParams.calcC.length) {
            const initialParams: ComputedParams = {
                calcTime: [0],
                calcHeight: [height],
                calcReactivity: [startReactivity],
                calcPower: [0.5 * nominalPower],
                calcC: [(0.5 * nominalPower * betta) / (lambda * Lambda)],
                calcRel: [1],
                calcCSix: [],
                calcThermalCoefficient: [],
            };

            const initialSixParams: ComputedParams = {
                ...initialParams,
                calcC: [],
                calcCSix: [
                    bettaSix.map((b, i) => {
                        return (b * nominalPower) / (lambdaSix[i] * Lambda);
                    }),
                ],
            };

            setComputedParams(isSix ? initialSixParams : initialParams);
        }
    }, [start]);

    useEffect(() => {
        if (!start || !params) {
            return;
        }

        const timeInterval = setInterval(() => {
            const currentState = useReactivityStore.getState();

            if (!currentState.data.computedParams) {
                return;
            }
            const lastIndex =
                currentState.data.computedParams.calcReactivity.length - 1;
            const currentHeight =
                currentState.data.computedParams.calcHeight[lastIndex];
            const currentTime =
                currentState.data.computedParams.calcTime[lastIndex];
            if (currentHeight >= reactorHeight) {
                changeCalcHeight(reactorHeight);
            }

            if (currentHeight <= 0) {
                changeCalcHeight(0);
            }

            const calcFn = isSix ? calcPowerSix : calcPower;

            const newParams = calcFn({
                prevH: currentHeight,
                prevRo: currentState.data.computedParams.calcReactivity[
                    lastIndex
                ],
                prevPower:
                    currentState.data.computedParams.calcPower[lastIndex],
                // @ts-ignore
                prevC: currentState.data.computedParams.calcC[lastIndex],
                velocity: velocity,
                interval: interval,
                mode: currentState.data.mode,
                reactorHeight: currentState.data.reactorHeight,
                nominalPower,
            });

            changeHeight(newParams.newH);
            changePower(newParams.newPower);
            changeStartReactivity(newParams.newRo);

            updateCalcParams({
                height: newParams.newH,
                time: currentTime + interval,
                reactivity: newParams.newRo,
                power: newParams.newPower,
                c: newParams.newC,
                rel: newParams.rel,
            });
        }, interval * 1000);

        return () => {
            clearInterval(timeInterval);
        };
    }, [interval, velocity, mode, start, height, params]);

    return params || ({} as ReactorParams);
};
