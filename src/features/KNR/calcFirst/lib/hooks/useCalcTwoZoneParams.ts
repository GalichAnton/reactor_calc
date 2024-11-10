import { useInitialParamsStore } from '@features/KNR/VVER/setInitialValues';

import { useAveragedCrossSectionsStore } from '../../model/stores/averagedCrossSectionsStore.ts';
import { useNuclearConcentrationsStore } from '../../model/stores/azCompNucConStore.ts';
import { useCellParamsStore } from '../../model/stores/cellParamsStore.ts';
import { useTransportMacroStore } from '../../model/stores/transportMacroStore.ts';
import { useTwoZoneModelParamsStore } from '../../model/stores/twoZoneParamsStore.ts';

export const useCalcTwoZoneParams = () => {
    const { setParams } = useTwoZoneModelParamsStore();

    const computeTwoZoneParams = async () => {
        try {
            const {
                concentrations: {
                    averageN_5,
                    averageN_8,
                    averageN_O2,
                    averageN_H2O,
                    averageN_Zr,
                },
            } = useNuclearConcentrationsStore.getState();

            const {
                initialParams: { claddingInnerRadius },
            } = useInitialParamsStore.getState();

            const {
                cellParams: {
                    cellVolume,
                    fuelVolume,
                    waterVolume,
                    claddingVolume,
                },
            } = useCellParamsStore.getState();

            const {
                averagedCrossSections: {
                    averagedMicroAU5,
                    averagedMicroAU8,
                    averagedMicroAO2,
                    averagedMicroAZr,
                    averagedMicroAH2O,
                },
            } = useAveragedCrossSectionsStore.getState();

            const {
                transportMacroCrossSections: {
                    transportMacroU235,
                    transportMacroU238,
                    transportMacroO2,
                    transportMacroH2O,
                    transportMacroZr,
                },
            } = useTransportMacroStore.getState();

            const twoZoneFirstZoneRadius = claddingInnerRadius;
            const twoZoneCellVolume = cellVolume.value;
            const twoZoneTotalRadius = Math.sqrt(twoZoneCellVolume / Math.PI);
            const twoZoneFirstZoneVolume =
                Math.PI * Math.pow(twoZoneFirstZoneRadius, 2);
            const twoZoneModeratorVolume =
                twoZoneCellVolume - twoZoneFirstZoneVolume;

            const twoZoneBlockAbsorptionCrossSection =
                (1 / twoZoneFirstZoneVolume) *
                (fuelVolume.value * averageN_5.value * averagedMicroAU5.value +
                    fuelVolume.value *
                        averageN_8.value *
                        averagedMicroAU8.value +
                    fuelVolume.value *
                        averageN_O2.value *
                        averagedMicroAO2.value);

            const twoZoneBlockTransportCrossSection =
                transportMacroU235.value +
                transportMacroU238.value +
                transportMacroO2.value;

            const twoZoneModeratorAbsorptionCrossSection =
                (1 / twoZoneModeratorVolume) *
                (waterVolume.value *
                    averageN_H2O.value *
                    averagedMicroAH2O.value +
                    averagedMicroAZr.value *
                        averageN_Zr.value *
                        claddingVolume.value);

            const twoZoneModeratorTransportCrossSection =
                transportMacroH2O.value + transportMacroZr.value;

            const twoZoneParams = {
                twoZoneBlockAbsorptionCrossSection,
                twoZoneBlockTransportCrossSection,
                twoZoneCellVolume,
                twoZoneFirstZoneRadius,
                twoZoneFirstZoneVolume,
                twoZoneModeratorAbsorptionCrossSection,
                twoZoneModeratorTransportCrossSection,
                twoZoneModeratorVolume,
                twoZoneTotalRadius,
            };

            setParams(twoZoneParams);
        } catch (error) {
            console.error(
                'Ошибка при расчете параметров двухзонной модели',
                error,
            );
        }
    };

    return { computeTwoZoneParams };
};
