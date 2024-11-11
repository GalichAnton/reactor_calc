import {
    useAveragedCrossSectionsStore,
    useCellParamsStore,
    useKInfParamsStore,
    useLossFactorParamsStore,
    useMacroscopicCrossSectionsStore,
    useModerationCapacityStore,
    useNeutronDiffusionAgeStore,
    useNeutronGasParamsStore,
    useNuclearConcentrationsStore,
    useReactorCriticalityStore,
    useTransportMacroStore,
    useTwoZoneModelParamsStore,
} from '@features/KNR/calcFirst';
import {
    useCompanyParamsStore,
    useFuelParamsStore,
    useIsotopeCompositionStore,
    useZRelationsStore,
} from '@features/KNR/calcSecond';
import { useAZPhysParamsStore } from '@features/KNR/calcSecond/model/store/azPhysParamsStore.ts';
import { performAllCalculations } from '@features/KNR/VVER/mainCalc';
import { useInitialParamsStore } from '@features/KNR/VVER/setInitialValues';

import { useCalculationStore } from '../../model/store/calculationStore.ts';

// Импортируйте остальные хуки

export const useMainCalculations = () => {
    const { setActiveTab, setIsCalculated, startCalculation } =
        useCalculationStore();
    const { setCellParams } = useCellParamsStore();
    const { setCompanyParams } = useCompanyParamsStore();
    const { setConcentrations } = useNuclearConcentrationsStore();
    const { setAveragedCrossSections } = useAveragedCrossSectionsStore();
    const { setKInfParams } = useKInfParamsStore();
    const { setLossFactorParams } = useLossFactorParamsStore();
    const { setMacroscopicCrossSections } = useMacroscopicCrossSectionsStore();
    const { setModerationCapacityParams } = useModerationCapacityStore();
    const { setNeutronGasParams } = useNeutronGasParamsStore();
    const { setNeutronDiffusionAgeParams } = useNeutronDiffusionAgeStore();
    const { setReactorCriticalityParams } = useReactorCriticalityStore();
    const { setTransportMacroCrossSections } = useTransportMacroStore();
    const { setParams } = useTwoZoneModelParamsStore();
    const { setAZPhysParams } = useAZPhysParamsStore();
    const { setFuelParams } = useFuelParamsStore();
    const { setIsotopeProperties } = useIsotopeCompositionStore();
    const { setZRelationProperties } = useZRelationsStore();

    const calculate = async () => {
        startCalculation(true);
        setActiveTab('1');
        const { initialParams } = useInitialParamsStore.getState();

        try {
            await new Promise((resolve) => setTimeout(resolve, 0));
            const result = await performAllCalculations(initialParams);

            setCellParams(result.cellParams);
            setAZPhysParams(result.aZparams);
            setKInfParams(result.kInfParams);
            setConcentrations(result.concentrationsParams);
            setCompanyParams(
                result.companyParams.params,
                result.companyParams.dN5,
            );
            setAveragedCrossSections(result.averageCrossSections);
            setTransportMacroCrossSections(result.transportCrossSections);
            setModerationCapacityParams(result.moderationCapacity);
            setNeutronGasParams(result.neutronGasParams);
            setNeutronDiffusionAgeParams(result.neutronAgeParams);
            setParams(result.twoZoneParams);
            setFuelParams(result.fuelParams);
            setZRelationProperties(result.zRelationParams);
            setIsotopeProperties(result.isotopesParams);
            setLossFactorParams(result.lossFactorParams);
            setReactorCriticalityParams(result.reactorCriticallyParams);
            setMacroscopicCrossSections(result.macroscopicCrossSections);
        } catch (error) {
            console.error('Ошибка во время вычислений:', error);
        } finally {
            setIsCalculated(true);
            startCalculation(false);
        }
    };

    return { calculate };
};
