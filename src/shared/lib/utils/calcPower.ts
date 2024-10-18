import { betta, k, Lambda, lambda } from '../../constants/general.ts';

interface Props {
    prevPower: number;
    prevH: number;
    prevRo: number;
    velocity: number;
    interval: number;
    mode: number;
    prevC: number;
    nominalPower: number;
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
    } = props;
    const newH = prevH + velocity * mode * interval;
    const dH = (newH - prevH) / interval;

    const newRo = prevRo + k * interval * dH;

    const newPower =
        (prevPower + interval * lambda * prevC) /
        (1 - interval * ((newRo - betta) / Lambda));

    const newC =
        prevC + interval * ((newPower * betta) / Lambda - lambda * prevC);

    const rel = newPower / (0.5 * nominalPower);

    return {
        newH,
        newC,
        newRo,
        newPower,
        rel,
        dH,
    };
};
