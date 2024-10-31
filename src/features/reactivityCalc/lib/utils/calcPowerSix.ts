import { roundToDecimal } from '@shared/lib/utils';

import { betta, bettaSix, k, Lambda, lambdaSix } from '../../constants/general';

interface Props {
    prevPower: number;
    prevH: number;
    prevRo: number;
    velocity: number;
    interval: number;
    mode: number;
    prevC: number[];
    nominalPower: number;
    reactorHeight: number;
}

export const calcPowerSix = (props: Props) => {
    const {
        prevPower,
        prevH,
        interval,
        prevC,
        prevRo,
        velocity,
        mode,
        nominalPower,
        reactorHeight,
    } = props;
    let newH = roundToDecimal(prevH + velocity * mode * interval, 2);

    if (newH >= reactorHeight) {
        newH = reactorHeight;
    }

    if (newH <= 0) {
        newH = 0;
    }

    const dH = (newH - prevH) / interval;

    const newRo = prevRo + k * interval * dH;

    const sigma = prevC.reduce((acc, c, i) => acc + lambdaSix[i] * c, 0);
    const newC = prevC.map((c, i) => {
        return (
            c +
            interval * ((bettaSix[i] * prevPower) / Lambda - lambdaSix[i] * c)
        );
    });

    const newPower =
        (prevPower + interval * sigma) /
        (1 - interval * ((newRo - betta) / Lambda));

    const rel = prevPower / (0.5 * nominalPower);

    return {
        newH,
        newC,
        newRo,
        newPower,
        rel,
        dH,
    };
};
