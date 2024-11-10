import {
    useCellParamsStore,
    useNuclearConcentrationsStore,
} from '@features/KNR/calcFirst';
import { useInitialParamsStore } from '@features/KNR/VVER/setInitialValues';

import { useAZPhysParamsStore } from '../../model/store/azPhysParamsStore.ts';
import { useCompanyParamsStore } from '../../model/store/campanyStore.ts';
import { useFuelParamsStore } from '../../model/store/fuelStore.ts';

export const useCalcFuelParams = () => {
    const { setFuelParams } = useFuelParamsStore();

    const computeFuelParams = async () => {
        try {
            const {
                cellParams: { fuelVolume },
            } = useCellParamsStore.getState();

            const {
                concentrations: { N_05, N_08 },
            } = useNuclearConcentrationsStore.getState();

            const {
                initialParams: { nTvel, coreHeight, thermalPower },
            } = useInitialParamsStore.getState();

            const {
                azPhysParams: { numFuelAssemblies },
            } = useAZPhysParamsStore.getState();

            const {
                companyParams: { company, dN5 },
            } = useCompanyParamsStore.getState();
            console.log(dN5);
            const depletedUranium235Mass =
                dN5.value *
                ((235 / (0.6023 * 1e24)) *
                    fuelVolume.value *
                    coreHeight *
                    nTvel *
                    numFuelAssemblies.value);

            const specificFuelConsumption =
                depletedUranium235Mass /
                (thermalPower * company.reactorOperationalTime.value);

            const initialUranium235Mass =
                (1e-3 / (0.6023 * 1e24)) *
                fuelVolume.value *
                coreHeight *
                nTvel *
                numFuelAssemblies.value *
                N_05.value *
                235;

            const initialUranium238Mass =
                (1e-3 / (0.6023 * 1e24)) *
                fuelVolume.value *
                coreHeight *
                nTvel *
                numFuelAssemblies.value *
                N_08.value *
                238;

            const totalInitialUraniumMass =
                initialUranium235Mass + initialUranium238Mass;

            const uraniumEnrichment =
                initialUranium235Mass / totalInitialUraniumMass;

            const fuelBurnupPerCompany =
                (thermalPower * company.reactorOperationalTime.value) /
                totalInitialUraniumMass;

            const fuelBurnupPerYear =
                (thermalPower * 330) / totalInitialUraniumMass;

            const numberOfReloads = fuelBurnupPerCompany / fuelBurnupPerYear;

            const fuelParams = {
                depletedUranium235Mass,
                specificFuelConsumption,
                initialUranium235Mass,
                initialUranium238Mass,
                totalInitialUraniumMass,
                uraniumEnrichment,
                fuelBurnupPerCompany,
                fuelBurnupPerYear,
                numberOfReloads,
            };

            setFuelParams(fuelParams);
        } catch (error) {
            console.error('Ошибка при расчете параметров топлива', error);
        }
    };

    return { computeFuelParams };
};
