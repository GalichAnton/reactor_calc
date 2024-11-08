import { useEffect } from 'react';

import { useCompanyParamsStore } from '@features/KNR/VVER/calc';
import { useAZPhysParamsStore } from '@features/KNR/VVER/calc/model/store/azPhysParamsStore.ts';
import {
    useAZStore,
    useReactorStore,
    useTVSStore,
} from '@features/KNR/VVER/setInitialValues';

import { useFuelParamsStore } from '../../model/store/fuelStore.ts';

export const useCalcFuelParams = () => {
    const { setFuelParams } = useFuelParamsStore();
    const {
        companyParams: { dN5 },
    } = useCompanyParamsStore();
    const {
        AZCharacteristics: {
            fuelVolume,
            nuclearConcentration235U,
            nuclearConcentration238U,
        },
    } = useAZStore();
    const {
        reactorCharacteristics: { coreHeight, thermalPower },
    } = useReactorStore();
    const {
        TVSCharacteristics: { ntvel },
    } = useTVSStore();
    const {
        azPhysParams: { numFuelAssemblies },
    } = useAZPhysParamsStore();
    const {
        companyParams: {
            computedValues: { company },
        },
    } = useCompanyParamsStore();

    useEffect(() => {
        const depletedUranium235Mass =
            dN5 *
            ((235 / (0.6023 * 1e24)) *
                fuelVolume *
                coreHeight *
                ntvel *
                numFuelAssemblies);

        const specificFuelConsumption =
            depletedUranium235Mass /
            (thermalPower * company.reactorOperationalTime);

        const initialUranium235Mass =
            (1e-3 / (0.6023 * 1e24)) *
            fuelVolume *
            coreHeight *
            ntvel *
            numFuelAssemblies *
            nuclearConcentration235U *
            235;

        const initialUranium238Mass =
            (1e-3 / (0.6023 * 1e24)) *
            fuelVolume *
            coreHeight *
            ntvel *
            numFuelAssemblies *
            nuclearConcentration238U *
            238;

        const totalInitialUraniumMass =
            initialUranium235Mass + initialUranium238Mass;

        const uraniumEnrichment =
            initialUranium235Mass / totalInitialUraniumMass;

        const fuelBurnupPerCompany =
            (thermalPower * company.reactorOperationalTime) /
            totalInitialUraniumMass;

        const fuelBurnupPerYear =
            (thermalPower * 330) / totalInitialUraniumMass;

        const numberOfReloads = fuelBurnupPerCompany / fuelBurnupPerYear;

        setFuelParams({
            depletedUranium235Mass,
            specificFuelConsumption,
            initialUranium235Mass,
            initialUranium238Mass,
            totalInitialUraniumMass,
            uraniumEnrichment,
            fuelBurnupPerCompany,
            fuelBurnupPerYear,
            numberOfReloads,
        });
    }, [
        dN5,
        fuelVolume,
        coreHeight,
        ntvel,
        numFuelAssemblies,
        nuclearConcentration238U,
        nuclearConcentration235U,
        thermalPower,
    ]);
};
