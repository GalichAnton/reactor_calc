import { useNuclearConcentrationsStore } from '../../model/stores/azCompNucConStore.ts';
import { useModerationCapacityStore } from '../../model/stores/ModerationCapacityStore.ts';
import {
    calculateModerationCapacityH2O,
    calculateModerationCapacityO2,
    calculateModerationCapacityU235,
    calculateModerationCapacityU238,
    calculateModerationCapacityZr,
    calculateTotalModerationCapacity,
} from '../utils/calcModerationCapacity.ts';

export const useCalcModerationCapacity = () => {
    const { setModerationCapacityParams } = useModerationCapacityStore();

    const computeModerationCapacityParams = async () => {
        try {
            const {
                concentrations: {
                    averageN_5,
                    averageN_H2O,
                    averageN_O2,
                    averageN_Zr,
                    averageN_8,
                },
            } = useNuclearConcentrationsStore.getState();

            const moderationCapacityU235 = calculateModerationCapacityU235(
                averageN_5.value,
            );
            const moderationCapacityU238 = calculateModerationCapacityU238(
                averageN_8.value,
            );
            const moderationCapacityO2 = calculateModerationCapacityO2(
                averageN_O2.value,
            );
            const moderationCapacityH2O = calculateModerationCapacityH2O(
                averageN_H2O.value,
            );
            const moderationCapacityZr = calculateModerationCapacityZr(
                averageN_Zr.value,
            );

            const totalModerationCapacity = calculateTotalModerationCapacity(
                moderationCapacityU235,
                moderationCapacityU238,
                moderationCapacityO2,
                moderationCapacityH2O,
                moderationCapacityZr,
            );

            const moderationCapacityParams = {
                moderationCapacityU235,
                moderationCapacityU238,
                moderationCapacityO2,
                moderationCapacityH2O,
                moderationCapacityZr,
                totalModerationCapacity,
            };

            setModerationCapacityParams(moderationCapacityParams);
        } catch (error) {
            console.error('Ошибка при расчете замедляющих способностей', error);
        }
    };

    return { computeModerationCapacityParams };
};