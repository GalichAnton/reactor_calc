import { roundToDecimal } from '@shared/lib/utils';

import { betta, k, Lambda, lambda } from '../../constants/general';

interface Props {
    prevPower: number;
    prevH: number;
    prevRo: number;
    velocity: number;
    interval: number;
    mode: number;
    prevC: number;
    nominalPower: number;
    reactorHeight: number;
}

export const calcPower = (props: Props) => {
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
    const newPower = roundToDecimal(
        (prevPower + interval * lambda * prevC) /
            (1 - interval * ((newRo - betta) / Lambda)),
        2,
    );

    const newC =
        prevC + interval * ((newPower * betta) / Lambda - lambda * prevC);

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
