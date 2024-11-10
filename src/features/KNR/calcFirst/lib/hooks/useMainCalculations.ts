import {
    useCalcAverageCrossSections,
    useCalcConcentrationParams,
    useCalcKInfParams,
    useCalcLossFactorParams,
    useCalcMacroscopicCrossSections,
    useCalcModerationCapacity,
    useCalcNeutronAgeParams,
    useCalcNeutronGasParams,
    useCalcReactorCriticaly,
    useCalcTransportMacroSections,
    useCalcTwoZoneParams,
} from '@features/KNR/calcFirst';
import { useCalculationStore } from '@features/KNR/VVER/calc/model/store/CalculationStore.ts';

import { useCalcCellParams } from './useCalcCellParams';
// Импортируйте остальные хуки

export const useMainCalculations = () => {
    const { setActiveTab, setIsCalculated, startCalculation } =
        useCalculationStore();

    const { computeCellParams } = useCalcCellParams();
    const { computeConcentrationParams } = useCalcConcentrationParams();
    const { computeMacroscopicCrossSections } =
        useCalcMacroscopicCrossSections();
    const { computeModerationCapacityParams } = useCalcModerationCapacity();
    const { computeNeutronGasParams } = useCalcNeutronGasParams();
    const { computeAverageCrossSections } = useCalcAverageCrossSections();
    const { computeTransportMacroSections } = useCalcTransportMacroSections();
    const { computeTwoZoneParams } = useCalcTwoZoneParams();
    const { computeLossFactorParams } = useCalcLossFactorParams();
    const { computeKInfParams } = useCalcKInfParams();
    const { computeNeutronAgeParams } = useCalcNeutronAgeParams();
    const { computeReactorCriticalityParams } = useCalcReactorCriticaly();

    const delay = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms));

    const performAllCalculations = async () => {
        startCalculation(true);
        setActiveTab('1');
        try {
            await delay(1000);

            await computeCellParams();
            await computeConcentrationParams();
            await computeMacroscopicCrossSections();
            await computeModerationCapacityParams();
            await computeNeutronGasParams();
            await computeAverageCrossSections();
            await computeTransportMacroSections();
            await computeTwoZoneParams();
            await computeLossFactorParams();
            await computeKInfParams();
            await computeNeutronAgeParams();
            await computeReactorCriticalityParams();
        } catch (error) {
            console.error('Ошибка во время вычислений:', error);
        } finally {
            setIsCalculated(true);
            startCalculation(false);
        }
    };

    return { performAllCalculations };
};
