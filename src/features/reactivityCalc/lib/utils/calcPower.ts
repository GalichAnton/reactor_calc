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
    let newH = prevH + velocity * mode * interval;

    if (newH >= reactorHeight) {
        newH = reactorHeight;
    }

    if (newH <= 0) {
        newH = 0;
    }

    const dH = (newH - prevH) / interval;

    const newRo = prevRo + k * interval * dH;
    const newPower =
        (prevPower + interval * lambda * prevC) /
        (1 - interval * ((newRo - betta) / Lambda));

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
