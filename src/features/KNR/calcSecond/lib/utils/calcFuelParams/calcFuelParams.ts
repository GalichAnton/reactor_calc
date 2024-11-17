import { SetParams } from '@shared/types/param.ts';

import { FuelParams } from '../../../model/types/fuelParams.ts';

/**
 * Интерфейс входных параметров для расчета характеристик топлива
 */
interface FuelParamsProps {
    /** Объем топлива (см^3) */
    fuelVolume: number;
    /** Концентрация U-235 (1/см^3) */
    N_05: number;
    /** Концентрация U-238 (1/см^3) */
    N_08: number;
    /** Количество твэлов */
    nTvel: number;
    /** Высота активной зоны (см) */
    coreHeight: number;
    /** Тепловая мощность реактора (МВт) */
    thermalPower: number;
    /** Количество тепловыделяющих сборок */
    numFuelAssemblies: number;
    /** Изменение концентрации U-235 за кампанию (1/см^3) */
    dN5: number;
    /** Время работы реактора в течение кампании реактора(сут) */
    reactorOperationalTime: number;
    /** Время работы реактора в течение кампании топлива(сут) */
    reactorOperationalTimePerFuelCompany: number;
}

/**
 * Рассчитывает параметры ядерного топлива
 *
 * @param {FuelParamsProps} params - Входные параметры для расчета
 * @returns {Promise<SetParams<FuelParams>>} Объект с рассчитанными параметрами топлива
 * @throws {Error} Ошибка при некорректных входных данных
 */
export const calculateFuelParams = async (
    params: FuelParamsProps,
): Promise<SetParams<FuelParams>> => {
    const {
        fuelVolume,
        N_05,
        N_08,
        nTvel,
        coreHeight,
        thermalPower,
        numFuelAssemblies,
        dN5,
        reactorOperationalTime,
        reactorOperationalTimePerFuelCompany,
    } = params;

    try {
        const depletedUranium235Mass =
            dN5 *
            ((235 / (0.6023 * 1e24)) *
                fuelVolume *
                coreHeight *
                nTvel *
                numFuelAssemblies);

        const specificFuelConsumption =
            depletedUranium235Mass / (thermalPower * reactorOperationalTime);

        const initialUranium235Mass =
            (1e-3 / (0.6023 * 1e24)) *
            fuelVolume *
            coreHeight *
            nTvel *
            numFuelAssemblies *
            N_05 *
            235;

        const initialUranium238Mass =
            (1e-3 / (0.6023 * 1e24)) *
            fuelVolume *
            coreHeight *
            nTvel *
            numFuelAssemblies *
            N_08 *
            238;

        const totalInitialUraniumMass =
            initialUranium235Mass + initialUranium238Mass;

        const uraniumEnrichment =
            initialUranium235Mass / totalInitialUraniumMass;

        const fuelBurnupPerCompany =
            (thermalPower * reactorOperationalTime) / totalInitialUraniumMass;

        const fuelBurnupPerFuelCompany =
            (thermalPower * reactorOperationalTimePerFuelCompany) /
            totalInitialUraniumMass;

        const fuelBurnupPerYear =
            (thermalPower * 330) / totalInitialUraniumMass;

        const numberOfReloads = fuelBurnupPerFuelCompany / fuelBurnupPerYear;

        return {
            depletedUranium235Mass,
            specificFuelConsumption,
            initialUranium235Mass,
            initialUranium238Mass,
            totalInitialUraniumMass,
            uraniumEnrichment,
            fuelBurnupPerCompany,
            fuelBurnupPerYear,
            numberOfReloads,
            fuelBurnupPerFuelCompany,
        };
    } catch (error) {
        throw new Error(`Ошибка при расчете параметров топлива: ${error}`);
    }
};
