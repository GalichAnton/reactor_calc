import { useEffect } from 'react';

import { ReactorParams } from '@entities/reactor';

import { betta, Lambda, lambda } from '../../constants/general.ts';
import { useReactivityStore } from '../../model/store.ts';
import { calcPower } from '../utils/calcPower.ts';

export const useCalc = () => {
    const {
        velocity,
        mode,
        startReactivity,
        height,
        interval,
        nominalPower,
        start,
        reactorHeight,
        params,
        changeHeight,
        changeCalcHeight,
        changePower,
        changeStartReactivity,
        updateCalcParams,
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

            updateCalcParams(initialParams);
        }
    }, [start]);

    useEffect(() => {
        if (!start || !params) {
            return;
        }

        const timeInterval = setInterval(() => {
            const currentState = useReactivityStore.getState();
            console.log('currentState.params', currentState.params);
            if (!currentState.params) {
                return;
            }
            const lastIndex = currentState.params.calcReactivity.length - 1;
            const currentHeight = currentState.params.calcHeight[lastIndex];
            const currentTime = currentState.params.calcTime[lastIndex];
            if (currentHeight >= reactorHeight) {
                changeCalcHeight(reactorHeight);
            }

            if (currentHeight <= 0) {
                changeCalcHeight(0);
            }

            const newParams = calcPower({
                prevH: currentHeight,
                prevRo: currentState.params.calcReactivity[lastIndex],
                prevPower: currentState.params.calcPower[lastIndex],
                prevC: currentState.params.calcC[lastIndex],
                velocity: velocity,
                interval: interval,
                mode: currentState.mode,
                reactorHeight: currentState.reactorHeight,
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
