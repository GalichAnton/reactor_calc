import { LossFactorParams } from '@features/KNR/calcFirst/model/types/lossFactorParams.ts';
import { SetParams } from '@shared/types/param.ts';
import BESSEL from 'bessel';

import {
    calculateBlockFlux,
    calculateDiffusionCoefficient,
    calculateInverseDiffusionLength,
    calculateLossFactorOther,
    calculateLossFactorSimple,
    calculateModeratorFlux,
    calculateModeratorG0,
    calculateModeratorG1,
    calculateP,
} from './helpers';

/**
 * Интерфейс входных параметров для расчета факторов потерь
 */
interface LossFactorProps {
    /** Параметры замедляющей способности */
    moderationCapacity: {
        U235: number;
        U238: number;
        O2: number;
        H2O: number;
        Zr: number;
    };
    /** Параметры двухзонной модели */
    twoZoneParams: {
        blockTransportCrossSection: number;
        firstZoneRadius: number;
        moderatorTransportCrossSection: number;
        totalRadius: number;
        blockAbsorptionCrossSection: number;
        moderatorAbsorptionCrossSection: number;
    };
}

/**
 * Рассчитывает параметры факторов потерь
 *
 * @returns {Promise<LossFactorResults>} Объект с рассчитанными параметрами
 * @throws {Error} Ошибка при некорректных входных данных
 */
export const calculateLossFactorParams = async (
    params: LossFactorProps,
): Promise<SetParams<LossFactorParams>> => {
    try {
        const { moderationCapacity, twoZoneParams } = params;

        // Расчет коэффициента мощности
        const powerRatio = calculateP(
            moderationCapacity.U235,
            moderationCapacity.U238,
            moderationCapacity.O2,
            moderationCapacity.H2O,
            moderationCapacity.Zr,
        );

        // Расчет параметров блока
        const blockDiffusionCoef = calculateDiffusionCoefficient(
            twoZoneParams.blockTransportCrossSection,
        );
        const blockInverseDiffLength = calculateInverseDiffusionLength(
            twoZoneParams.blockAbsorptionCrossSection,
            blockDiffusionCoef,
        );

        // Расчет параметров замедлителя
        const moderatorDiffusionCoef = calculateDiffusionCoefficient(
            twoZoneParams.moderatorTransportCrossSection,
        );
        const moderatorInverseDiffLength = calculateInverseDiffusionLength(
            twoZoneParams.moderatorAbsorptionCrossSection,
            moderatorDiffusionCoef,
        );

        // Расчет функций Бесселя
        const besselI1 = BESSEL.besseli(
            blockInverseDiffLength * twoZoneParams.firstZoneRadius,
            1,
        );
        const besselI0 = BESSEL.besseli(
            blockInverseDiffLength * twoZoneParams.firstZoneRadius,
            0,
        );

        // Расчет G-функций для замедлителя
        const moderatorG0 = calculateModeratorG0(
            moderatorInverseDiffLength,
            twoZoneParams.firstZoneRadius,
            twoZoneParams.totalRadius,
        );
        const moderatorG1 = calculateModeratorG1(
            moderatorInverseDiffLength,
            twoZoneParams.firstZoneRadius,
            twoZoneParams.totalRadius,
        );

        // Расчет плотностей потока
        const blockFluxDensity = calculateBlockFlux({
            blockDiffusionCoef,
            blockInverseDiffLength,
            moderatorDiffusionCoef,
            moderatorInverseDiffLength,
            G0: moderatorG0,
            G1: moderatorG1,
            powerRatio,
            I0: besselI0,
            I1: besselI1,
            R1: twoZoneParams.firstZoneRadius,
            twoZoneBlockAbsorptionCrossSection:
                twoZoneParams.blockAbsorptionCrossSection,
            twoZoneModeratorAbsorptionCrossSection:
                twoZoneParams.moderatorAbsorptionCrossSection,
        });

        const moderatorFluxDensity = calculateModeratorFlux({
            blockDiffusionCoef,
            blockInverseDiffLength,
            moderatorDiffusionCoef,
            moderatorInverseDiffLength,
            G0: moderatorG0,
            G1: moderatorG1,
            powerRatio,
            I0: besselI0,
            I1: besselI1,
            R1: twoZoneParams.firstZoneRadius,
            R2: twoZoneParams.totalRadius,
            twoZoneBlockAbsorptionCrossSection:
                twoZoneParams.blockAbsorptionCrossSection,
            twoZoneModeratorAbsorptionCrossSection:
                twoZoneParams.moderatorAbsorptionCrossSection,
        });

        // Расчет факторов потерь
        const lossFactor = calculateLossFactorSimple(
            blockFluxDensity,
            moderatorFluxDensity,
        );

        const lossFactorOther = calculateLossFactorOther({
            powerRatio,
            I0: besselI0,
            I1: besselI1,
            R1: twoZoneParams.firstZoneRadius,
            R2: twoZoneParams.totalRadius,
            blockInverseDiffLength,
            blockDiffusionCoef,
            twoZoneBlockAbsorptionCrossSection:
                twoZoneParams.blockAbsorptionCrossSection,
            moderatorDiffusionCoef,
        });

        return {
            blockDiffusionCoef,
            blockFluxDensity,
            blockInverseDiffLength,
            besselI0,
            besselI1,
            moderatorG0,
            moderatorG1,
            moderatorDiffusionCoef,
            moderatorFluxDensity,
            moderatorInverseDiffLength,
            lossFactor,
            powerRatio,
            lossFactorOther,
        };
    } catch (error) {
        throw new Error(
            `Ошибка при расчете параметров фактора потерь: ${error}`,
        );
    }
};
