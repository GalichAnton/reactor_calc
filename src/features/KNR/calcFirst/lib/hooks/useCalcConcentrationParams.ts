import {
    DENSITY_UO2,
    DENSITY_ZR,
    useInitialParamsStore,
} from '@features/KNR/VVER/setInitialValues';
import { getWaterDensity } from '@shared/lib/utils';

import { useNuclearConcentrationsStore } from '../../model/stores/azCompNucConStore.ts';
import { useCellParamsStore } from '../../model/stores/cellParamsStore.ts';
import {
    calculateN05,
    calculateN08,
    calculateN0H2O,
    calculateN0O2,
    calculateN0U,
    calculateN0Zr,
    calculateAverageN5,
    calculateAverageN8,
    calculateAverageNH2O,
    calculateAverageNO2,
    calculateAverageNZr,
} from '../utils/calcNuclearConcentrations';

export const useCalcConcentrationParams = () => {
    const { setConcentrations } = useNuclearConcentrationsStore();

    const computeConcentrationParams = async () => {
        try {
            const {
                initialParams: { uraniumEnrichment, coolantTemperature },
            } = useInitialParamsStore.getState();
            const {
                cellParams: { fuelFraction, waterFraction, zirconiumFraction },
            } = useCellParamsStore.getState();

            const N_0U = calculateN0U(DENSITY_UO2);
            const N_05 = calculateN05(N_0U, uraniumEnrichment);
            const N_08 = calculateN08(N_0U, uraniumEnrichment);
            const N_0O2 = calculateN0O2(N_0U);
            const N_0H2O = calculateN0H2O(getWaterDensity(coolantTemperature));
            const N_0Zr = calculateN0Zr(DENSITY_ZR);

            const averageN_5 = calculateAverageN5(N_05, fuelFraction.value);
            const averageN_8 = calculateAverageN8(N_08, fuelFraction.value);
            const averageN_O2 = calculateAverageNO2(N_0O2, fuelFraction.value);
            const averageN_H2O = calculateAverageNH2O(
                N_0H2O,
                waterFraction.value,
            );
            const averageN_Zr = calculateAverageNZr(
                N_0Zr,
                zirconiumFraction.value,
            );

            const concentrationParams = {
                N_0U,
                N_05,
                N_08,
                N_0O2,
                averageN_5,
                averageN_8,
                averageN_O2,
                averageN_H2O,
                averageN_Zr,
                N_0H2O,
                N_0Zr,
            };

            setConcentrations(concentrationParams);
        } catch (error) {
            console.error('Ошибка при расчете концентраций', error);
        }
    };

    return { computeConcentrationParams };
};
