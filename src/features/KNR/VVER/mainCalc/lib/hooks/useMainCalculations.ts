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
import { useCalcCellParams } from '@features/KNR/calcFirst';
import {
    useAzCalc,
    useCalcCompanyParams,
    useCalcFuelParams,
    useCalcIsotopes,
    useZrelationsCalc,
} from '@features/KNR/calcSecond';

import { useCalculationStore } from '../../model/store/calculationStore.ts';

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
    const { computeAZParams } = useAzCalc();
    const { computeIsotopeProperties } = useCalcIsotopes();
    const { computeZrelationsParams } = useZrelationsCalc();
    const { computeCompanyParams } = useCalcCompanyParams();
    const { computeFuelParams } = useCalcFuelParams();

    const delay = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms));

    const performAllCalculations = async () => {
        startCalculation(true);
        setActiveTab('1');
        try {
            await delay(500);

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
            await computeAZParams();
            await computeIsotopeProperties();
            await computeZrelationsParams();
            await computeCompanyParams();
            await computeFuelParams();
        } catch (error) {
            console.error('Ошибка во время вычислений:', error);
        } finally {
            setIsCalculated(true);
            startCalculation(false);
        }
    };

    return { performAllCalculations };
};
