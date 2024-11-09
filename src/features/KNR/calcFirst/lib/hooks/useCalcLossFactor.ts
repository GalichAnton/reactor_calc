import { useEffect } from 'react';

import {
    calculateBlockFlux,
    calculateDiffusionCoefficient,
    calculateInverseDiffusionLength,
    calculateLossFactorOther,
    calculateLossFactorSimple,
    calculateModeratorFlux,
    calculateP,
} from '@features/KNR/calcFirst/lib/utils/calcLossFactor.ts';
import { useTwoZoneModelParamsStore } from '@features/KNR/twoZone/model/store/twoZoneParamsStore.ts';
import { useBessel } from '@shared/lib/hooks';

import { useLossFactorParamsStore } from '../../model/stores/lossFactorParamsStore.ts';
import { useModerationCapacityStore } from '../../model/stores/ModerationCapacityStore.ts';

export const useCalcLossFactorParams = () => {
    const { setLossFactorParams } = useLossFactorParamsStore();

    const {
        moderationCapacityParams: {
            moderationCapacityU235,
            moderationCapacityU238,
            moderationCapacityO2,
            moderationCapacityH2O,
            moderationCapacityZr,
        },
    } = useModerationCapacityStore();

    const {
        params: {
            twoZoneBlockTransportCrossSection,
            twoZoneFirstZoneRadius,
            twoZoneModeratorTransportCrossSection,
            twoZoneTotalRadius,
            twoZoneBlockAbsorptionCrossSection,
            twoZoneModeratorAbsorptionCrossSection,
        },
    } = useTwoZoneModelParamsStore();

    const { besselI, besselK } = useBessel();

    useEffect(() => {
        const powerRatio = calculateP(
            moderationCapacityU235.value,
            moderationCapacityU238.value,
            moderationCapacityO2.value,
            moderationCapacityH2O.value,
            moderationCapacityZr.value,
        );

        const blockDiffusionCoef = calculateDiffusionCoefficient(
            twoZoneBlockTransportCrossSection.value,
        );

        const blockInverseDiffLength = calculateInverseDiffusionLength(
            twoZoneBlockAbsorptionCrossSection.value,
            blockDiffusionCoef,
        );

        const moderatorDiffusionCoef = calculateDiffusionCoefficient(
            twoZoneModeratorTransportCrossSection.value,
        );

        const moderatorInverseDiffLength = calculateInverseDiffusionLength(
            twoZoneModeratorAbsorptionCrossSection.value,
            moderatorDiffusionCoef,
        );

        const besselI1 = besselI(
            blockInverseDiffLength * twoZoneFirstZoneRadius.value,
            1,
        );
        const besselI0 = besselI(
            blockInverseDiffLength * twoZoneFirstZoneRadius.value,
            0,
        );
        const moderatorG0 =
            besselI(
                moderatorInverseDiffLength * twoZoneFirstZoneRadius.value,
                0,
            ) +
            (besselI(moderatorInverseDiffLength * twoZoneTotalRadius.value, 1) /
                besselK(
                    moderatorInverseDiffLength * twoZoneTotalRadius.value,
                    1,
                )) *
                besselK(
                    moderatorInverseDiffLength * twoZoneFirstZoneRadius.value,
                    0,
                );

        const moderatorG1 =
            besselI(
                moderatorInverseDiffLength * twoZoneFirstZoneRadius.value,
                1,
            ) -
            (besselI(moderatorInverseDiffLength * twoZoneTotalRadius.value, 1) /
                besselK(
                    moderatorInverseDiffLength * twoZoneTotalRadius.value,
                    1,
                )) *
                besselK(
                    moderatorInverseDiffLength * twoZoneFirstZoneRadius.value,
                    1,
                );

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
    }, [
        moderationCapacityU235,
        moderationCapacityU238,
        moderationCapacityO2,
        moderationCapacityH2O,
        moderationCapacityZr,
        twoZoneBlockTransportCrossSection,
        twoZoneFirstZoneRadius,
        twoZoneModeratorTransportCrossSection,
        twoZoneTotalRadius,
    ]);
};
