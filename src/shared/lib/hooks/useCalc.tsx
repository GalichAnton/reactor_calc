import { useContext, useEffect, useState } from 'react';

import { AppContext } from '../../../store';
import { betta, Lambda, lambda } from '../../constants/general.ts';
import { calcC } from '../utils/calcC.ts';
import { calcH } from '../utils/calcH.ts';
import { calcPower } from '../utils/calcPower.ts';
import { calcReactivity } from '../utils/calcReactivity.ts';

interface OutParams {
    time: number[];
    reactivity: number[];
    power: number[];
    c: number[];
}

export const useCalc = (): OutParams => {
    const {
        state: {
            velocity,
            mode,
            startReactivity,
            height,
            interval,
            nominalPower,
        },
        changeHeight,
    } = useContext(AppContext);
    const [params, setParams] = useState<OutParams>({
        time: [0],
        reactivity: [startReactivity],
        power: [0.5 * nominalPower],
        c: [(nominalPower * betta) / (lambda * Lambda)],
    });

    useEffect(() => {
        const timeInterval = setInterval(() => {
            const newH = calcH(height, interval, velocity, mode);
            const lastIndex = params.reactivity.length - 1;
            const newReactivity = calcReactivity(
                params.reactivity[lastIndex],
                interval,
                velocity,
            );

            const newPower = calcPower(
                params.power[lastIndex],
                interval,
                params.c[lastIndex],
                mode,
            );
            const newC = calcC(params.c[lastIndex], newPower, interval);

            changeHeight(newH);
            setParams((prev) => ({
                ...prev,
                time: [...prev.time, prev.time[lastIndex] + interval],
                reactivity: [...prev.reactivity, newReactivity],
                power: [...prev.power, newPower],
                c: [...prev.c, newC],
            }));
        }, interval * 1000);

        return () => {
            clearInterval(timeInterval);
        };
    }, [interval, velocity, mode]);

    return params;
};
