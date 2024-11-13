import { useEffect } from 'react';

import { ReactorParams } from '@entities/reactor';

import { bettaSix, Lambda, lambdaSix } from '../../constants/general.ts';
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
                calcThermalCoefficient: [],
            };

            setComputedParams(initialParams);
        }
    }, [start]);

    useEffect(() => {
        if (!start || !computedParams.calcC.length) {
            return;
        }

        const timeInterval = setInterval(() => {
            const currentState = useReactivityStore.getState();

            if (!currentState.computedParams) {
                return;
            }
            const lastIndex =
                currentState.computedParams.calcReactivity.length - 1;
            const currentHeight =
                currentState.computedParams.calcHeight[lastIndex];
            const currentTime = currentState.computedParams.calcTime[lastIndex];
            if (currentHeight >= reactorHeight) {
                setComputedParam('calcHeight', reactorHeight);
            }

            if (currentHeight <= 0) {
                setComputedParam('calcHeight', 0);
            }

            const newParams = calcPowerSix({
                prevH: currentHeight,
                prevRo: currentState.computedParams.calcReactivity[lastIndex],
                prevPower: currentState.computedParams.calcPower[lastIndex],
                prevC: currentState.computedParams.calcC[lastIndex],
                velocity: velocity,
                interval: interval,
                mode: currentState.initialParams.mode,
                reactorHeight: reactorHeight,
                nominalPower,
            });
            console.log(newParams);
            setInitialParam('height', newParams.newH);
            setInitialParam('power', newParams.newPower);
            setInitialParam('startReactivity', newParams.newRo);

            setComputedParams({
                calcHeight: newParams.newH,
                calcTime: currentTime + interval,
                calcReactivity: newParams.newRo,
                calcPower: newParams.newPower,
                calcC: newParams.newC,
                calcRel: newParams.rel,
                calcThermalCoefficient: 0,
            });
        }, interval * 1000);

        return () => {
            clearInterval(timeInterval);
        };
    }, [interval, velocity, mode, start, height, computedParams]);

    return computedParams || ({} as ReactorParams);
};
