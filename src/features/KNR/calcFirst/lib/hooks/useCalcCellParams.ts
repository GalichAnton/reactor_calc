import { useEffect } from 'react';

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
} from '../utils/calcCellParams.ts';

export const useCalcCellParams = () => {
    const { setCellParams } = useCellParamsStore();
    const {
        initialParams: {
            fuelRodLatticePitch,
            fuelPelletRadius,
            claddingInnerRadius,
            claddingOuterRadius,
        },
    } = useInitialParamsStore();

    useEffect(() => {
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

        setCellParams({
            cellVolume: V_0,
            fuelVolume: V_U,
            fuelArea: S_U,
            claddingVolume: V_Zr,
            waterVolume: V_H2O,
            fuelFraction: ε_U,
            zirconiumFraction: ε_Zr,
            waterFraction: ε_H2O,
        });
    }, [
        fuelRodLatticePitch,
        fuelPelletRadius,
        claddingInnerRadius,
        claddingOuterRadius,
    ]);
};
