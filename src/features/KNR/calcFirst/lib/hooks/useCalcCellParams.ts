import { useInitialParamsStore } from '@features/KNR/VVER/setInitialValues';

import { useCellParamsStore } from '../../model/stores/cellParamsStore.ts';
import {
    calculateCellVolume,
    calculateCladdingVolume,
    calculateCladdingVolumeFraction,
    calculateFuelSurfaceArea,
    calculateFuelVolume,
    calculateFuelVolumeFraction,
    calculateWaterVolume,
    calculateWaterVolumeFraction,
} from '../utils/calcCellParams/helpers.ts';

export const useCalcCellParams = () => {
    const { initialParams } = useInitialParamsStore();
    const { setCellParams } = useCellParamsStore();

    const computeCellParams = async () => {
        try {
            const {
                fuelRodLatticePitch,
                fuelPelletRadius,
                claddingInnerRadius,
                claddingOuterRadius,
            } = initialParams;

            // Если ваши функции вычисления интенсивны по ресурсам, вы можете использовать Promise
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

            const ε_U = calculateFuelVolumeFraction(V_U, V_0);
            const ε_Zr = calculateCladdingVolumeFraction(V_Zr, V_0);
            const ε_H2O = calculateWaterVolumeFraction(V_H2O, V_0);

            const cellParams = {
                cellVolume: V_0,
                fuelVolume: V_U,
                fuelArea: S_U,
                claddingVolume: V_Zr,
                waterVolume: V_H2O,
                fuelFraction: ε_U,
                zirconiumFraction: ε_Zr,
                waterFraction: ε_H2O,
            };

            setCellParams(cellParams);
        } catch (error) {
            console.error('Ошибка при вычислении параметров ячейки:', error);
        }
    };
    return { computeCellParams };
};
