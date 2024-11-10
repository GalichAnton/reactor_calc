import { SetParams } from '@shared/types/param.ts';

import {
    calculateCellVolume,
    calculateCladdingVolume,
    calculateCladdingVolumeFraction,
    calculateFuelSurfaceArea,
    calculateFuelVolume,
    calculateFuelVolumeFraction,
    calculateWaterVolume,
    calculateWaterVolumeFraction,
} from './helpers.ts';
import { CellParams } from '../../../model/types/cellParams.ts';

/**
 * Интерфейс входных параметров для расчета характеристик ячейки
 */
interface CellParamsProps {
    /** Шаг решетки твэлов (см) */
    fuelRodLatticePitch: number;
    /** Радиус топливной таблетки (см) */
    fuelPelletRadius: number;
    /** Внутренний радиус оболочки (см) */
    claddingInnerRadius: number;
    /** Внешний радиус оболочки (см) */
    claddingOuterRadius: number;
}

/**
 * Рассчитывает основные параметры ячейки ядерного реактора
 *
 * @returns {Promise<CellParams>} Объект с рассчитанными параметрами
 * @throws {Error} Ошибка при некорректных входных данных
 */
export const calculateCellParams = async (
    params: CellParamsProps,
): Promise<SetParams<CellParams>> => {
    const {
        fuelRodLatticePitch,
        fuelPelletRadius,
        claddingInnerRadius,
        claddingOuterRadius,
    } = params;
    try {
        // Вычисление объемов и площадей
        const V_0 = calculateCellVolume(fuelRodLatticePitch);
        const V_U = calculateFuelVolume(fuelPelletRadius);
        const S_U = calculateFuelSurfaceArea(fuelPelletRadius);
        const V_Zr = calculateCladdingVolume(
            claddingInnerRadius,
            claddingOuterRadius,
        );
        const V_H2O = calculateWaterVolume(
            fuelRodLatticePitch,
            claddingOuterRadius,
        );

        // Вычисление объемных долей
        const ε_U = calculateFuelVolumeFraction(V_U, V_0);
        const ε_Zr = calculateCladdingVolumeFraction(V_Zr, V_0);
        const ε_H2O = calculateWaterVolumeFraction(V_H2O, V_0);

        // Формирование и возврат объекта с результатами
        return {
            cellVolume: V_0,
            fuelVolume: V_U,
            fuelArea: S_U,
            claddingVolume: V_Zr,
            waterVolume: V_H2O,
            fuelFraction: ε_U,
            zirconiumFraction: ε_Zr,
            waterFraction: ε_H2O,
        };
    } catch (error) {
        throw new Error(`Ошибка при расчете параметров ячейки: ${error}`);
    }
};
