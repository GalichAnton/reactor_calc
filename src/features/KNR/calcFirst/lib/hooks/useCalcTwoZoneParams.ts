import { useEffect } from 'react';

import { useAveragedCrossSectionsStore } from '@features/KNR/calcFirst/model/stores/averagedCrossSectionsStore.ts';
import { useNuclearConcentrationsStore } from '@features/KNR/calcFirst/model/stores/azCompNucConStore.ts';
import { useCellParamsStore } from '@features/KNR/calcFirst/model/stores/cellParamsStore.ts';
import { useTransportMacroStore } from '@features/KNR/calcFirst/model/stores/transportMacroStore.ts';
import { useInitialParamsStore } from '@features/KNR/VVER/setInitialValues';

import { useTwoZoneModelParamsStore } from '../../model/stores/twoZoneParamsStore.ts';

export const useCalcTwoZoneParams = () => {
    const { setParams } = useTwoZoneModelParamsStore();
    const {
        concentrations: {
            averageN_5,
            averageN_8,
            averageN_O2,
            averageN_H2O,
            averageN_Zr,
        },
    } = useNuclearConcentrationsStore();

    const {
        initialParams: { uraniumEnrichment, fuelPelletRadius },
    } = useInitialParamsStore();

    const {
        cellParams: {
            fuelFraction,
            waterFraction,
            zirconiumFraction,
            cellVolume,
            fuelVolume,
            waterVolume,
            claddingVolume,
        },
    } = useCellParamsStore();

    const {
        averagedCrossSections: {
            averagedMicroAU5,
            averagedMicroAU8,
            averagedMicroAO2,
            averagedMicroAZr,
            averagedMicroAH2O,
        },
    } = useAveragedCrossSectionsStore();
    const {
        transportMacroCrossSections: {
            transportMacroU235,
            transportMacroU238,
            transportMacroO2,
            transportMacroH2O,
            transportMacroZr,
        },
    } = useTransportMacroStore();

    useEffect(() => {
        const twoZoneFirstZoneRadius = fuelPelletRadius;

        const twoZoneCellVolume = cellVolume.value;

        const twoZoneTotalRadius = Math.sqrt(twoZoneCellVolume / Math.PI);

        const twoZoneFirstZoneVolume =
            Math.PI * Math.pow(twoZoneFirstZoneRadius, 2);

        const twoZoneModeratorVolume =
            twoZoneCellVolume - twoZoneFirstZoneVolume;

        const twoZoneBlockAbsorptionCrossSection =
            (1 / twoZoneFirstZoneVolume) *
            (fuelVolume.value * averageN_5.value * averagedMicroAU5.value +
                fuelVolume.value * averageN_8.value * averagedMicroAU8.value +
                fuelVolume.value * averageN_O2.value * averagedMicroAO2.value);

        const twoZoneBlockTransportCrossSection =
            transportMacroU235.value +
            transportMacroU238.value +
            transportMacroO2.value;

        const twoZoneModeratorAbsorptionCrossSection =
            (1 / twoZoneModeratorVolume) *
            (waterVolume.value * averageN_H2O.value * averagedMicroAH2O.value +
                averagedMicroAZr.value *
                    averageN_Zr.value *
                    claddingVolume.value);

        const twoZoneModeratorTransportCrossSection =
            transportMacroH2O.value + transportMacroZr.value;

        setParams({
            twoZoneBlockAbsorptionCrossSection,
            twoZoneBlockTransportCrossSection,
            twoZoneCellVolume,
            twoZoneFirstZoneRadius,
            twoZoneFirstZoneVolume,
            twoZoneModeratorAbsorptionCrossSection,
            twoZoneModeratorTransportCrossSection,
            twoZoneModeratorVolume,
            twoZoneTotalRadius,
        });
    }, [
        transportMacroU235,
        transportMacroU238,
        transportMacroO2,
        transportMacroH2O,
        transportMacroZr,
        uraniumEnrichment,
        fuelFraction,
        waterFraction,
        zirconiumFraction,
        averagedMicroAU5,
        averagedMicroAU8,
        averagedMicroAO2,
        averagedMicroAZr,
        averagedMicroAH2O,
        cellVolume,
        fuelVolume,
        waterVolume,
        claddingVolume,
        averageN_5,
        averageN_8,
        averageN_O2,
        averageN_H2O,
        averageN_Zr,
    ]);
};
