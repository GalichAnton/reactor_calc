import { elemCharacteristics } from '@shared/constants/elemCharacteristics.ts';
import { WATER_NEUTRON_AGE } from '@shared/constants/general.ts';

import { useAveragedCrossSectionsStore } from '../../model/stores/averagedCrossSectionsStore.ts';
import { useNuclearConcentrationsStore } from '../../model/stores/azCompNucConStore.ts';
import { useCellParamsStore } from '../../model/stores/cellParamsStore.ts';
import { useNeutronDiffusionAgeStore } from '../../model/stores/neutronDiffusionAgeStore.ts';
import { useTransportMacroStore } from '../../model/stores/transportMacroStore.ts';

export const useCalcNeutronAgeParams = () => {
    const { setNeutronDiffusionAgeParams } = useNeutronDiffusionAgeStore();

    const computeNeutronAgeParams = async () => {
        try {
            const {
                transportMacroCrossSections: { transportMacroTotal },
            } = useTransportMacroStore.getState();

            const {
                averagedCrossSections: { averagedMacroATotal },
            } = useAveragedCrossSectionsStore.getState();

            const {
                concentrations: { averageN_Zr, averageN_O2, N_0U },
            } = useNuclearConcentrationsStore.getState();

            const {
                cellParams: {
                    claddingVolume,
                    fuelVolume,
                    waterVolume,
                    cellVolume,
                },
            } = useCellParamsStore.getState();

            const {
                neutronDiffusionAgeParams: { z },
            } = useNeutronDiffusionAgeStore.getState();

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
                (uraniumEquivalentVolume +
                    fuelVolume.value +
                    waterVolume.value);

            const neutronAge =
                (WATER_NEUTRON_AGE *
                    (z.value * Math.pow(cellVolume.value, 2))) /
                Math.pow(
                    uraniumEquivalentVolume +
                        fuelVolume.value +
                        waterVolume.value,
                    2,
                );

            const neutronAgeParams = {
                neutronAge,
                uraniumEquivalentVolume,
                diffusionLengthSquared,
                Vrel,
            };

            setNeutronDiffusionAgeParams(neutronAgeParams);
        } catch (error) {
            console.error(
                'Ошибка при расчете параметров возраста нейтронов',
                error,
            );
        }
    };

    return { computeNeutronAgeParams };
};
