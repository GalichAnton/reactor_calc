import { elemCharacteristics } from '@shared/constants/elemCharacteristics.ts';
import { WATER_NEUTRON_AGE } from '@shared/constants/general.ts';
import { SetParams } from '@shared/types/param.ts';

import { NeutronDiffusionAgeParams } from '../../../model/types/neutronDiffusionAgeParams';

/**
 * Интерфейс входных параметров для расчета характеристик возраста нейтронов
 */
interface NeutronAgeParamsProps {
    /** Полное транспортное макросечение (см^-1) */
    transportMacroTotal: number;
    /** Полное макросечение поглощения (см^-1) */
    averagedMacroATotal: number;
    /** Средняя ядерная концентрация циркония (см^-3) */
    averageN_Zr: number;
    /** Средняя ядерная концентрация кислорода (см^-3) */
    averageN_O2: number;
    /** Ядерная концентрация U-238 (см^-3) */
    N_0U: number;
    /** Объем оболочки (см^3) */
    claddingVolume: number;
    /** Объем топлива (см^3) */
    fuelVolume: number;
    /** Объем воды (см^3) */
    waterVolume: number;
    /** Объем ячейки (см^3) */
    cellVolume: number;
}

/**
 * Рассчитывает параметры возраста нейтронов в ячейке ядерного реактора
 *
 * @param params Входные параметры для расчета
 * @returns {Promise<SetParams<NeutronAgeParams>>} Объект с рассчитанными параметрами
 * @throws {Error} Ошибка при некорректных входных данных
 */
export const calculateNeutronAgeParams = async (
    params: NeutronAgeParamsProps,
): Promise<SetParams<NeutronDiffusionAgeParams>> => {
    const {
        transportMacroTotal,
        averagedMacroATotal,
        averageN_Zr,
        averageN_O2,
        N_0U,
        claddingVolume,
        fuelVolume,
        waterVolume,
        cellVolume,
    } = params;

    try {
        // Расчет квадрата длины диффузии
        const diffusionLengthSquared =
            1 / (3 * averagedMacroATotal * transportMacroTotal);

        // Расчет эквивалентного объема урана
        const uraniumEquivalentVolume =
            (claddingVolume *
                averageN_Zr *
                elemCharacteristics.Zr.crossSectionTr +
                fuelVolume *
                    averageN_O2 *
                    elemCharacteristics.O.crossSectionTr) /
            (N_0U * elemCharacteristics.U238.crossSectionTr);

        // Расчет относительного объема
        const Vrel =
            (fuelVolume + uraniumEquivalentVolume) /
            (uraniumEquivalentVolume + fuelVolume + waterVolume);

        // Расчет коэффициента z
        const z =
            1 +
            0.23 * Vrel +
            0.95 * Math.pow(Vrel, 2) +
            0.48 * Math.pow(Vrel, 3);

        // Расчет возраста нейтронов
        const neutronAge =
            (WATER_NEUTRON_AGE * (z * Math.pow(cellVolume, 2))) /
            Math.pow(uraniumEquivalentVolume + fuelVolume + waterVolume, 2);

        return {
            neutronAge,
            uraniumEquivalentVolume,
            diffusionLengthSquared,
            Vrel,
            z,
        };
    } catch (error) {
        throw new Error(
            `Ошибка при расчете параметров возраста нейтронов: ${error}`,
        );
    }
};
