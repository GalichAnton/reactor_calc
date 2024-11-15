import { precision } from '@shared/constants/precision.ts';
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

interface ReturnParams {
    newH: number;
    newC: number[];
    newRo: number;
    newPower: number;
    rel: number;
    dH: number;
    thermalPower: number;
    uraniumTemp: number;
    uraniumTempSh: number;
    heightReactivity: number;
    thermalReactivity: number;
    thermalDensity: number;
}

export const calcPowerSix = (props: CalcPowerProps): ReturnParams => {
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
    const dH = roundToDecimal(Math.abs(newH - prevH) / interval, precision);
    const sigma = prevC.reduce((acc, c, i) => acc + lambdaSix[i] * c, 0);

    const newC = prevC.map((c, i) => {
        return roundToDecimal(
            c +
                interval *
                    ((bettaSix[i] * prevPower) / Lambda - lambdaSix[i] * c),
            precision,
        );
    });

    const newPower =
        (prevPower + interval * sigma) /
        (1 - interval * ((prevRo - betta) / Lambda));

    const rel = calculateRelativePower(prevPower, nominalPower);

    const thermalPower = roundToDecimal(prevThermalPower * rel, precision);

    const thermalDensity = roundToDecimal(
        thermalPower / uraniumVolume,
        precision,
    );

    const uraniumTemp = roundToDecimal(
        (prevCalcUraniumTemperature +
            (interval / tauZero) * (aCoef * thermalDensity + coolantTemp)) /
            (1 + interval / tauZero),
        precision,
    );

    const uraniumTempSh = roundToDecimal(
        (aCoef * thermalDensity + coolantTemp - uraniumTemp) / tauZero,
        precision,
    );

    const heightReactivity = roundToDecimal(
        prevCalcHeightReactivity + KH * dH * interval,
        precision,
    );

    const thermalReactivity = roundToDecimal(
        prevCalcThermalReactivity + K_U * uraniumTempSh * interval,
        precision,
    );

    const newRo = prevRo + thermalReactivity + heightReactivity;

    const data: ReturnParams = {
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
    console.log(data);
    return data;
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
