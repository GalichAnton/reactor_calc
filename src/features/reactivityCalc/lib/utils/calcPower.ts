import { roundToDecimal } from '@shared/lib/utils';

import {
    betta,
    bettaSix,
    K_U,
    KH,
    Lambda,
    lambdaSix,
} from '../../constants/general';

interface CalcPowerProps {
    prevPower: number;
    prevH: number;
    prevRo: number;
    velocity: number;
    interval: number;
    mode: number;
    nominalPower: number;
    reactorHeight: number;
    prevC: number[];
    prevThermalPower: number;
    prevCalcUraniumTemperature: number;
    prevCalcHeightReactivity: number;
    prevCalcThermalReactivity: number;
    uraniumVolume: number;
    tauZero: number;
    aCoef: number;
    coolantTemp: number;
}

export const calcPowerSix = (props: CalcPowerProps) => {
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
        prevThermalPower,
        tauZero,
        aCoef,
        prevCalcUraniumTemperature,
        coolantTemp,
        prevCalcHeightReactivity,
        prevCalcThermalReactivity,
        uraniumVolume,
    } = props;

    const newH = calculateNewHeight(
        prevH,
        velocity,
        mode,
        interval,
        reactorHeight,
    );
    const dH = (newH - prevH) / interval;
    const sigma = prevC.reduce((acc, c, i) => acc + lambdaSix[i] * c, 0);

    const newC = prevC.map((c, i) => {
        return (
            c +
            interval * ((bettaSix[i] * prevPower) / Lambda - lambdaSix[i] * c)
        );
    });

    const newPower =
        (prevPower + interval * sigma) /
        (1 - interval * ((prevRo - betta) / Lambda));

    const rel = calculateRelativePower(prevPower, nominalPower);

    const thermalPower = prevThermalPower * rel;

    const thermalDensity = thermalPower / uraniumVolume;

    const uraniumTemp =
        (prevCalcUraniumTemperature +
            (interval / tauZero) * (aCoef * thermalDensity + coolantTemp)) /
        (1 + interval / tauZero);

    const uraniumTempSh =
        (aCoef * thermalDensity + coolantTemp - uraniumTemp) / tauZero;

    const heightReactivity = prevCalcHeightReactivity + KH * dH * interval;

    const thermalReactivity =
        prevCalcThermalReactivity + K_U * uraniumTempSh * interval;

    const newRo = prevRo + thermalReactivity + heightReactivity;

    return {
        newH,
        newC,
        newRo,
        newPower,
        rel,
        dH,
        thermalPower,
        uraniumTemp,
        uraniumTempSh,
        heightReactivity,
        thermalReactivity,
        thermalDensity,
    };
};

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

const calculateRelativePower = (prevPower: number, nominalPower: number) => {
    return prevPower / (0.5 * nominalPower);
};
