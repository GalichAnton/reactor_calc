import { useEffect } from 'react';

import { elemCharacteristics } from '@shared/constants/elemCharacteristics.ts';
import { WATER_NEUTRON_AGE } from '@shared/constants/general.ts';

import { useAveragedCrossSectionsStore } from '../../model/stores/averagedCrossSectionsStore.ts';
import { useNuclearConcentrationsStore } from '../../model/stores/azCompNucConStore.ts';
import { useCellParamsStore } from '../../model/stores/cellParamsStore.ts';
import { useNeutronDiffusionAgeStore } from '../../model/stores/neutronDiffusionAgeStore.ts';
import { useTransportMacroStore } from '../../model/stores/transportMacroStore.ts';

export const useCalcNeutronAgeParams = () => {
    const {
        setNeutronDiffusionAgeParams,
        neutronDiffusionAgeParams: { z },
    } = useNeutronDiffusionAgeStore();

    const {
        transportMacroCrossSections: { transportMacroTotal },
    } = useTransportMacroStore();

    const {
        averagedCrossSections: { averagedMacroATotal },
    } = useAveragedCrossSectionsStore();

    const {
        concentrations: { averageN_Zr, averageN_O2, N_0U },
    } = useNuclearConcentrationsStore();

    const {
        cellParams: { claddingVolume, fuelVolume, waterVolume, cellVolume },
    } = useCellParamsStore();

    useEffect(() => {
        const diffusionLengthSquared =
            1 / (3 * averagedMacroATotal.value * transportMacroTotal.value);

        const uraniumEquivalentVolume =
            (claddingVolume.value *
                averageN_Zr.value *
                elemCharacteristics.Zr.crossSectionTr +
                fuelVolume.value *
                    averageN_O2.value *
                    elemCharacteristics.O.crossSectionTr) /
            (N_0U.value * elemCharacteristics.U238.crossSectionTr);

        const Vrel =
            (fuelVolume.value + uraniumEquivalentVolume) /
            (uraniumEquivalentVolume + fuelVolume.value + waterVolume.value);

        const neutronAge =
            (WATER_NEUTRON_AGE * (z.value * Math.pow(cellVolume.value, 2))) /
            Math.pow(
                uraniumEquivalentVolume + fuelVolume.value + waterVolume.value,
                2,
            );

        setNeutronDiffusionAgeParams({
            neutronAge,
            uraniumEquivalentVolume,
            diffusionLengthSquared,
            Vrel,
        });
    }, [
        transportMacroTotal,
        averageN_Zr,
        averageN_O2,
        N_0U,
        claddingVolume,
        fuelVolume,
        waterVolume,
        cellVolume,
        averagedMacroATotal,
        z,
    ]);
};
