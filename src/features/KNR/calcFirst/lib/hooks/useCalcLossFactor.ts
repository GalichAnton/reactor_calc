import {
    calculateBlockFlux,
    calculateDiffusionCoefficient,
    calculateInverseDiffusionLength,
    calculateLossFactorOther,
    calculateLossFactorSimple,
    calculateModeratorFlux,
    calculateP,
} from '@features/KNR/calcFirst/lib/utils/calcLossFactor.ts';
import { useTwoZoneModelParamsStore } from '@features/KNR/calcFirst/model/stores/twoZoneParamsStore.ts';
import { useBessel } from '@shared/lib/hooks';

import { useLossFactorParamsStore } from '../../model/stores/lossFactorParamsStore.ts';
import { useModerationCapacityStore } from '../../model/stores/ModerationCapacityStore.ts';

export const useCalcLossFactorParams = () => {
    const { setLossFactorParams } = useLossFactorParamsStore();
    const { besselI, besselK } = useBessel();

    const computeLossFactorParams = async () => {
        try {
            const {
                moderationCapacityParams: {
                    moderationCapacityU235,
                    moderationCapacityU238,
                    moderationCapacityO2,
                    moderationCapacityH2O,
                    moderationCapacityZr,
                },
            } = useModerationCapacityStore.getState();

            const {
                params: {
                    twoZoneBlockTransportCrossSection,
                    twoZoneFirstZoneRadius,
                    twoZoneModeratorTransportCrossSection,
                    twoZoneTotalRadius,
                    twoZoneBlockAbsorptionCrossSection,
                    twoZoneModeratorAbsorptionCrossSection,
                },
            } = useTwoZoneModelParamsStore.getState();

            // Расчет коэффициента мощности
            const powerRatio = calculateP(
                moderationCapacityU235.value,
                moderationCapacityU238.value,
                moderationCapacityO2.value,
                moderationCapacityH2O.value,
                moderationCapacityZr.value,
            );

            // Расчет параметров блока
            const blockDiffusionCoef = calculateDiffusionCoefficient(
                twoZoneBlockTransportCrossSection.value,
            );
            const blockInverseDiffLength = calculateInverseDiffusionLength(
                twoZoneBlockAbsorptionCrossSection.value,
                blockDiffusionCoef,
            );

            // Расчет параметров замедлителя
            const moderatorDiffusionCoef = calculateDiffusionCoefficient(
                twoZoneModeratorTransportCrossSection.value,
            );
            const moderatorInverseDiffLength = calculateInverseDiffusionLength(
                twoZoneModeratorAbsorptionCrossSection.value,
                moderatorDiffusionCoef,
            );

            // Расчет функций Бесселя
            const besselI1 = besselI(
                blockInverseDiffLength * twoZoneFirstZoneRadius.value,
                1,
            );
            const besselI0 = besselI(
                blockInverseDiffLength * twoZoneFirstZoneRadius.value,
                0,
            );

            // Расчет G-функций для замедлителя
            const moderatorG0 = calculateModeratorG0(
                moderatorInverseDiffLength,
                twoZoneFirstZoneRadius.value,
                twoZoneTotalRadius.value,
                besselI,
                besselK,
            );
            const moderatorG1 = calculateModeratorG1(
                moderatorInverseDiffLength,
                twoZoneFirstZoneRadius.value,
                twoZoneTotalRadius.value,
                besselI,
                besselK,
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
                R1: twoZoneFirstZoneRadius.value,
                twoZoneBlockAbsorptionCrossSection:
                    twoZoneBlockAbsorptionCrossSection.value,
                twoZoneModeratorAbsorptionCrossSection:
                    twoZoneModeratorAbsorptionCrossSection.value,
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
                R1: twoZoneFirstZoneRadius.value,
                R2: twoZoneTotalRadius.value,
                twoZoneBlockAbsorptionCrossSection:
                    twoZoneBlockAbsorptionCrossSection.value,
                twoZoneModeratorAbsorptionCrossSection:
                    twoZoneModeratorAbsorptionCrossSection.value,
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
                R1: twoZoneFirstZoneRadius.value,
                R2: twoZoneTotalRadius.value,
                blockInverseDiffLength,
                blockDiffusionCoef,
                twoZoneBlockAbsorptionCrossSection:
                    twoZoneBlockAbsorptionCrossSection.value,
                moderatorDiffusionCoef,
            });

            // Установка параметров в store
            setLossFactorParams({
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
            });
        } catch (error) {
            console.error(
                'Ошибка при расчете параметров фактора потерь',
                error,
            );
        }
    };

    return { computeLossFactorParams };
};

// Вспомогательные функции для расчета G-функций
const calculateModeratorG0 = (
    moderatorInverseDiffLength: number,
    R1: number,
    R2: number,
    besselI: Function,
    besselK: Function,
) => {
    return (
        besselI(moderatorInverseDiffLength * R1, 0) +
        (besselI(moderatorInverseDiffLength * R2, 1) /
            besselK(moderatorInverseDiffLength * R2, 1)) *
            besselK(moderatorInverseDiffLength * R1, 0)
    );
};

const calculateModeratorG1 = (
    moderatorInverseDiffLength: number,
    R1: number,
    R2: number,
    besselI: Function,
    besselK: Function,
) => {
    return (
        besselI(moderatorInverseDiffLength * R1, 1) -
        (besselI(moderatorInverseDiffLength * R2, 1) /
            besselK(moderatorInverseDiffLength * R2, 1)) *
            besselK(moderatorInverseDiffLength * R1, 1)
    );
};
