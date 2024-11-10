import { roundToDecimal } from '@shared/lib/utils';

import {
    betta,
    bettaSix,
    k,
    Lambda,
    lambda,
    lambdaSix,
} from '../../constants/general';

interface CalcPowerProps {
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

const calculateNewHeight = (
    prevH: number,
    velocity: number,
    mode: number,
    interval: number,
    reactorHeight: number,
) => {
    let newH = roundToDecimal(prevH + velocity * mode * interval, 2);
    if (newH >= reactorHeight) {
        newH = reactorHeight;
    }
    if (newH <= 0) {
        newH = 0;
    }
    return newH;
};

const calculateNewReactivity = (
    prevRo: number,
    dH: number,
    interval: number,
) => {
    return prevRo + k * interval * dH;
};

const calculateNewPower = (
    prevPower: number,
    interval: number,
    newRo: number,
    prevC: number,
) => {
    return roundToDecimal(
        (prevPower + interval * lambda * prevC) /
            (1 - interval * ((newRo - betta) / Lambda)),
        2,
    );
};

const calculateNewConcentration = (
    prevC: number,
    interval: number,
    newPower: number,
) => {
    return prevC + interval * ((newPower * betta) / Lambda - lambda * prevC);
};

const calculateRelativePower = (prevPower: number, nominalPower: number) => {
    return prevPower / (0.5 * nominalPower);
};

export const calcPower = (props: CalcPowerProps) => {
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

    const newH = calculateNewHeight(
        prevH,
        velocity,
        mode,
        interval,
        reactorHeight,
    );
    const dH = (newH - prevH) / interval;
    const newRo = calculateNewReactivity(prevRo, dH, interval);
    const newPower = calculateNewPower(prevPower, interval, newRo, prevC);
    const newC = calculateNewConcentration(prevC, interval, newPower);
    const rel = calculateRelativePower(prevPower, nominalPower);

    return {
        newH,
        newC,
        newRo,
        newPower,
        rel,
        dH,
    };
};

interface CalcPowerPropsSix extends Omit<CalcPowerProps, 'prevC'> {
    prevC: number[];
}

export const calcPowerSix = (props: CalcPowerPropsSix) => {
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

    const newH = calculateNewHeight(
        prevH,
        velocity,
        mode,
        interval,
        reactorHeight,
    );
    const dH = (newH - prevH) / interval;
    const newRo = calculateNewReactivity(prevRo, dH, interval);
    const sigma = prevC.reduce((acc, c, i) => acc + lambdaSix[i] * c, 0);
    const newPower =
        (prevPower + interval * sigma) /
        (1 - interval * ((newRo - betta) / Lambda));

    const newC = prevC.map((c, i) => {
        return (
            c +
            interval * ((bettaSix[i] * prevPower) / Lambda - lambdaSix[i] * c)
        );
    });
    const rel = calculateRelativePower(prevPower, nominalPower);

    return {
        newH,
        newC,
        newRo,
        newPower,
        rel,
        dH,
    };
};
