import { SetParams } from '@shared/types/param.ts';

import { TwoZoneModelParams } from '../../../model/types/twoZoneModelParams.ts';

/**
 * Интерфейс входных параметров для расчета характеристик двухзонной модели
 */
interface TwoZoneParamsProps {
    /** Ядерные концентрации */
    concentrations: {
        averageN_5: number; // Средняя концентрация U-235
        averageN_8: number; // Средняя концентрация U-238
        averageN_O2: number; // Средняя концентрация O2
        averageN_H2O: number; // Средняя концентрация H2O
        averageN_Zr: number; // Средняя концентрация Zr
    };
    /** Геометрические параметры */
    geometry: {
        claddingInnerRadius: number; // Внутренний радиус оболочки
        cellVolume: number; // Объем ячейки
        fuelVolume: number; // Объем топлива
        waterVolume: number; // Объем воды
        claddingVolume: number; // Объем оболочки
    };
    /** Усредненные микросечения */
    averagedCrossSections: {
        averagedMicroAU5: number; // Усредненное микросечение U-235
        averagedMicroAU8: number; // Усредненное микросечение U-238
        averagedMicroAO2: number; // Усредненное микросечение O2
        averagedMicroAZr: number; // Усредненное микросечение Zr
        averagedMicroAH2O: number; // Усредненное микросечение H2O
    };
    /** Транспортные макросечения */
    transportMacro: {
        transportMacroU235: number; // Транспортное макросечение U-235
        transportMacroU238: number; // Транспортное макросечение U-238
        transportMacroO2: number; // Транспортное макросечение O2
        transportMacroH2O: number; // Транспортное макросечение H2O
        transportMacroZr: number; // Транспортное макросечение Zr
    };
}

/**
 * Рассчитывает параметры двухзонной модели ячейки ядерного реактора
 *
 * @param {TwoZoneParamsProps} params - Входные параметры для расчета
 * @returns {Promise<SetParams<TwoZoneParams>>} Объект с рассчитанными параметрами
 * @throws {Error} Ошибка при некорректных входных данных
 */
export const calculateTwoZoneParams = async (
    params: TwoZoneParamsProps,
): Promise<SetParams<TwoZoneModelParams>> => {
    try {
        const {
            concentrations,
            geometry,
            averagedCrossSections,
            transportMacro,
        } = params;

        // Расчет геометрических параметров двухзонной модели
        const twoZoneFirstZoneRadius = geometry.claddingInnerRadius;
        const twoZoneCellVolume = geometry.cellVolume;
        const twoZoneTotalRadius = Math.sqrt(twoZoneCellVolume / Math.PI);
        const twoZoneFirstZoneVolume =
            Math.PI * Math.pow(twoZoneFirstZoneRadius, 2);
        const twoZoneModeratorVolume =
            twoZoneCellVolume - twoZoneFirstZoneVolume;

        // Расчет сечения поглощения для блока
        const twoZoneBlockAbsorptionCrossSection =
            (1 / twoZoneFirstZoneVolume) *
            (geometry.fuelVolume *
                concentrations.averageN_5 *
                averagedCrossSections.averagedMicroAU5 +
                geometry.fuelVolume *
                    concentrations.averageN_8 *
                    averagedCrossSections.averagedMicroAU8 +
                geometry.fuelVolume *
                    concentrations.averageN_O2 *
                    averagedCrossSections.averagedMicroAO2);

        // Расчет транспортного сечения для блока
        const twoZoneBlockTransportCrossSection =
            transportMacro.transportMacroU235 +
            transportMacro.transportMacroU238 +
            transportMacro.transportMacroO2;

        // Расчет сечения поглощения для замедлителя
        const twoZoneModeratorAbsorptionCrossSection =
            (1 / twoZoneModeratorVolume) *
            (geometry.waterVolume *
                concentrations.averageN_H2O *
                averagedCrossSections.averagedMicroAH2O +
                averagedCrossSections.averagedMicroAZr *
                    concentrations.averageN_Zr *
                    geometry.claddingVolume);

        // Расчет транспортного сечения для замедлителя
        const twoZoneModeratorTransportCrossSection =
            transportMacro.transportMacroH2O + transportMacro.transportMacroZr;

        // Формирование и возврат объекта с результатами
        return {
            twoZoneBlockAbsorptionCrossSection,
            twoZoneBlockTransportCrossSection,
            twoZoneCellVolume,
            twoZoneFirstZoneRadius,
            twoZoneFirstZoneVolume,
            twoZoneModeratorAbsorptionCrossSection,
            twoZoneModeratorTransportCrossSection,
            twoZoneModeratorVolume,
            twoZoneTotalRadius,
        };
    } catch (error) {
        throw new Error(
            `Ошибка при расчете параметров двухзонной модели: ${error}`,
        );
    }
};
