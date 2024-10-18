import { useContext, useEffect, useRef, useState } from 'react';

import { AppContext } from '../../../store';
import { betta, Lambda, lambda } from '../../constants/general.ts';
import { ReactorParams } from '../../types/reactorParams.ts';
import { calcPower } from '../utils/calcPower.ts';

export const useCalc = (): ReactorParams => {
    const {
        state: {
            velocity,
            mode,
            startReactivity,
            height,
            interval,
            nominalPower,
            start,
            reactorHeight,
        },
        changeHeight,
        changePower,
        changeStartReactivity,
    } = useContext(AppContext);

    const [params, setParams] = useState<ReactorParams | null>(null);
    console.log(params);
    const paramsRef = useRef({ params, velocity, interval, mode });
    const heightRef = useRef(height);

    useEffect(() => {
        paramsRef.current = { params, velocity, interval, mode };
    }, [params, velocity, mode, interval, height]);

    useEffect(() => {
        heightRef.current = height;
    }, [height]);

    // Инициализируем params только один раз, когда все значения доступны
    useEffect(() => {
        if (start && params === null) {
            const initialParams = {
                time: [0],
                height: [height],
                reactivity: [startReactivity],
                power: [0.5 * nominalPower],
                c: [(0.5 * nominalPower * betta) / (lambda * Lambda)],
                rel: [1],
                reactorHeight,
            };

            setParams(initialParams);

            // Обновляем реф после инициализации
            paramsRef.current = {
                params: initialParams,
                velocity,
                interval,
                mode,
            };
        }
    }, [start]);

    useEffect(() => {
        if (!start) {
            return;
        }

        const timeInterval = setInterval(() => {
            const currentParams = paramsRef.current;
            const currentHeight = heightRef.current;
            if (!currentParams.params) {
                return;
            }

            if (currentHeight >= currentParams.params.reactorHeight) {
                heightRef.current = reactorHeight;
            }

            if (currentHeight <= 0) {
                heightRef.current = 0;
            }

            const lastIndex = currentParams.params.reactivity.length - 1;

            const newParams = calcPower({
                prevH: currentHeight,
                prevRo: currentParams.params.reactivity[lastIndex],
                prevPower: currentParams.params.power[lastIndex],
                prevC: currentParams.params.c[lastIndex],
                velocity: currentParams.velocity,
                interval: currentParams.interval,
                mode: currentParams.mode,
                reactorHeight: currentParams.params.reactorHeight,
                nominalPower,
            });
            console.log('newParams', newParams);

            changeHeight(newParams.newH);
            changePower(newParams.newPower);
            changeStartReactivity(newParams.newRo);
            // Обновляем состояние и реф
            setParams((prev) => {
                if (!prev) {
                    return null;
                }
                const updatedParams = {
                    ...prev,
                    height: [...prev.height, newParams.newH],
                    time: [...prev.time, prev.time[lastIndex] + interval],
                    reactivity: [...prev.reactivity, newParams.newRo],
                    power: [...prev.power, newParams.newPower],
                    c: [...prev.c, newParams.newC],
                    rel: [...prev.rel, newParams.rel],
                };
                paramsRef.current.params = updatedParams;
                return updatedParams;
            });
        }, interval * 1000);

        return () => {
            clearInterval(timeInterval);
        };
    }, [interval, velocity, mode, start, height]);

    return params || ({} as ReactorParams);
};
