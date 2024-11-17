import { gammaFunc } from '@shared/lib/utils';
import { SetParams } from '@shared/types/param.ts';
import BESSEL from 'bessel';

import { CompensationParameters } from '../../../model/types/compensationParameters.ts';

/**
 * Интерфейс входных параметров для расчета компенсируемости
 */
interface ReactivityReserveProps {
    /** К эффективное года */
    KefYear: number;
    /** Реактивность в отравленном состоянии (о.е.) */
    reactivitySlug: number;
    /** Реактивность в НЕ отравленном состоянии (о.е.) */
    reactivityPure: number;
    /** Температурный эффект реактивности  (о.е.) */
    dRoThermalCoef: number;
    /** Суммарное транспортное макроскопическое сечение */
    transportCrossSectionTotal: number;
    /** Суммарное транспортное макроскопическое сечение на 1эв */
    transportCrossSectionTotal1EV: number;
    /** Суммарное транспортное макроскопическое сечение на 1эв */
    radiusControls: number;
    /** Геометрический параметр */
    geometricParameter: number;
    /** Длинна диффузии */
    diffusionLength: number;
    /** Время жизни теплового нейтрона */
    neutronAge: number;
    /** Диаметр АЗ */
    azDiameter: number;
}

export const calculateCompensationParams = (
    props: ReactivityReserveProps,
): SetParams<CompensationParameters> => {
    const {
        KefYear,
        reactivitySlug,
        reactivityPure,
        dRoThermalCoef,
        transportCrossSectionTotal1EV,
        transportCrossSectionTotal,
        radiusControls,
        geometricParameter,
        diffusionLength,
        neutronAge,
        azDiameter,
    } = props;
    try {
        const dRoOtr = reactivityPure - reactivitySlug;

        const dRoYear = (KefYear - 1) / KefYear;

        const totalReactivity =
            Math.abs(dRoThermalCoef) + dRoOtr + dRoYear + 0.02;

        const D1 = 1 / (3 * transportCrossSectionTotal1EV);
        const D2 = 1 / (3 * transportCrossSectionTotal);
        const unknownCoef = radiusControls * transportCrossSectionTotal;

        const rodBlackness = gammaFunc(unknownCoef);

        const epsilon2 = 1 / (3 * D2 * rodBlackness);

        const alpha2 = Math.sqrt(
            geometricParameter +
                (neutronAge + diffusionLength) / (neutronAge * diffusionLength),
        );

        const w1 =
            (D2 / D1) * (1 / diffusionLength + geometricParameter) * neutronAge;
        const w2 = -(D2 / D1) * (1 + geometricParameter * neutronAge);

        const besselK0 = BESSEL.besselk(
            Math.sqrt(geometricParameter) * radiusControls,
            0,
        );
        const besselK1 = BESSEL.besselk(
            Math.sqrt(geometricParameter) * radiusControls,
            1,
        );

        const besselJ0 = BESSEL.besselj(
            (Math.sqrt(geometricParameter) * azDiameter) / 2,
            0,
        );
        const besselJ1 = BESSEL.besselj(
            (Math.sqrt(geometricParameter) * azDiameter) / 2,
            1,
        );

        const Cnominator = w2 * epsilon2 * alpha2 * besselK1;
        const Cdenominator =
            w2 *
                (epsilon2 *
                    Math.log(2.124 * ((2 * radiusControls) / azDiameter)) -
                    1 / radiusControls) *
                alpha2 *
                besselK1 +
            (w1 / radiusControls) * (epsilon2 * besselK0 + alpha2 * besselK1);
        const C = -Cnominator / Cdenominator;

        const centralRodCompensation =
            (2 * C * (neutronAge + diffusionLength)) /
            (Math.pow(azDiameter / 2, 2) * (besselJ0 ** 2 + besselJ1 ** 2));
        console.log('centralRodCompensation', centralRodCompensation);
        const nControlRoads =
            Math.log(1 + totalReactivity) /
            (centralRodCompensation * (besselJ0 ** 2 + besselJ1 ** 2));

        const nSUZ = nControlRoads / 18;

        return {
            nControlRoads,
            centralRodCompensation,
            totalReactivity,
            rodBlackness,
            nSUZ,
        };
    } catch (error) {
        throw new Error(
            `Ошибка при расчете параметров компенсируемости: ${error}`,
        );
    }
};
