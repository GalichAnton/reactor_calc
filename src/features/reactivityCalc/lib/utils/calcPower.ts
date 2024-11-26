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
    nominalThermalPower: number;
    reactorHeight: number;
    prevC: number[];
    prevCalcUraniumTemperature: number;
    prevCalcHeightReactivity: number;
    prevCalcThermalReactivity: number;
    uraniumVolume: number;
    tauZero: number;
    aCoef: number;
    coolantTemp: number;
    dh: number;
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
        nominalThermalPower,
        tauZero,
        aCoef,
        prevCalcUraniumTemperature,
        coolantTemp,
        prevCalcHeightReactivity,
        prevCalcThermalReactivity,
        uraniumVolume,
        dh,
    } = props;

    const newInterwal = interval;

    const newH = calculateNewHeight(
        prevH,
        velocity,
        mode,
        interval,
        reactorHeight,
        dh,
    );

    const dH = (newH - prevH) / newInterwal;
    const newSigma = prevC.reduce((acc, c, i) => acc + lambdaSix[i] * c, 0);

    const newC = prevC.map((c, i) => {
        return (
            c +
            newInterwal *
                ((bettaSix[i] * prevPower) / Lambda - lambdaSix[i] * c)
        );
    });

    const newPower =
        (prevPower + newInterwal * newSigma) /
        (1 - newInterwal * ((prevRo - betta) / Lambda));

    const rel = calculateRelativePower(newPower, nominalPower);

    const thermalPower = nominalThermalPower * rel;

    const thermalDensity = thermalPower / uraniumVolume;

    const uraniumTemp = calculateUraniumTemperature(
        prevCalcUraniumTemperature,
        newInterwal,
        tauZero,
        aCoef,
        thermalDensity,
        coolantTemp,
    );

    const uraniumTempSh =
        (aCoef * thermalDensity + coolantTemp - uraniumTemp) / tauZero;

    const heightReactivity = prevCalcHeightReactivity + KH * dH * newInterwal;

    const thermalReactivity =
        prevCalcThermalReactivity + K_U * uraniumTempSh * newInterwal;

    const newRo =
        prevRo + K_U * uraniumTempSh * newInterwal + KH * dH * newInterwal;

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

    return data;
};

const calculateNewHeight = (
    prevH: number,
    velocity: number,
    mode: number,
    interval: number,
    reactorHeight: number,
    dh: number,
) => {
    let newH = roundToDecimal(
        prevH + dh + velocity * mode * interval,
        precision,
    );
    if (newH >= reactorHeight) {
        newH = reactorHeight;
    }
    if (newH <= 0) {
        newH = 0;
    }
    return newH;
};

const calculateRelativePower = (prevPower: number, nominalPower: number) => {
    return prevPower / nominalPower;
};

/**
 * Рассчитывает температуру урана
 * @param  prevCalcUraniumTemperature - Предыдущая температура урана
 * @param interval - Интервал времени
 * @param  tauZero - Параметр тау
 * @param aCoef - Коэффициент a
 * @param  thermalDensity - Тепловая плотность
 * @param  coolantTemp - Температура теплоносителя
 * @returns - Рассчитанная температура урана
 */
const calculateUraniumTemperature = (
    prevCalcUraniumTemperature: number,
    interval: number,
    tauZero: number,
    aCoef: number,
    thermalDensity: number,
    coolantTemp: number,
) => {
    if (prevCalcUraniumTemperature < coolantTemp) {
        return coolantTemp;
    }

    const uraniumTemp =
        (prevCalcUraniumTemperature +
            (interval / tauZero) * (aCoef * thermalDensity + coolantTemp)) /
        (1 + interval / tauZero);

    return uraniumTemp;
};
