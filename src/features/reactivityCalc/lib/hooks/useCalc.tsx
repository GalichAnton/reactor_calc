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

export const useCalc = () => {
    const {
        data: {
            velocity,
            mode,
            startReactivity,
            height,
            interval,
            nominalPower,
            start,
            reactorHeight,
            params,
            isSix,
        },
        actions: {
            changeHeight,
            changeCalcHeight,
            changePower,
            changeStartReactivity,
            updateCalcParams,
        },
    } = useReactivityStore();

    useEffect(() => {
        if (start && !params) {
            const initialParams = {
                time: 0,
                height: height,
                reactivity: startReactivity,
                power: 0.5 * nominalPower,
                c: (0.5 * nominalPower * betta) / (lambda * Lambda),
                rel: 1,
                reactorHeight,
            };

            const initialSixParams = {
                time: 0,
                height: height,
                reactivity: startReactivity,
                power: 0.5 * nominalPower,
                c: bettaSix.map((b, i) => {
                    return (b * nominalPower) / (lambdaSix[i] * Lambda);
                }),
                rel: 1,
                reactorHeight,
            };

            updateCalcParams(isSix ? initialSixParams : initialParams);
        }
    }, [start]);

    useEffect(() => {
        if (!start || !params) {
            return;
        }

        const timeInterval = setInterval(() => {
            const currentState = useReactivityStore.getState();

            if (!currentState.data.params) {
                return;
            }
            const lastIndex =
                currentState.data.params.calcReactivity.length - 1;
            const currentHeight =
                currentState.data.params.calcHeight[lastIndex];
            const currentTime = currentState.data.params.calcTime[lastIndex];
            if (currentHeight >= reactorHeight) {
                changeCalcHeight(reactorHeight);
            }

            if (currentHeight <= 0) {
                changeCalcHeight(0);
            }

            const calcFn = isSix ? calcPowerSix : calcPower;

            const newParams = calcFn({
                prevH: currentHeight,
                prevRo: currentState.data.params.calcReactivity[lastIndex],
                prevPower: currentState.data.params.calcPower[lastIndex],
                // @ts-ignore
                prevC: currentState.data.params.calcC[lastIndex],
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
