import { areAllParamsFilled, getActionName } from '@shared/lib/utils';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { CellParams } from '../types/cellParams';

interface CellParamsStore {
    filled?: boolean;
    cellParams: CellParams;
    setCellParam: <T extends keyof CellParams>(key: T, value: number) => void;
    setCellParams: (value: Record<keyof CellParams, number>) => void;
}

const cellParamsDefaults: CellParams = {
    cellVolume: {
        name: 'cellVolume',
        description: 'Объем ячейки в кубических сантиметрах см^3',
        value: 0,
    },
    fuelVolume: {
        name: 'fuelVolume',
        description: 'Объем топлива в кубических сантиметрах см^3',
        value: 0,
    },
    fuelArea: {
        name: 'fuelArea',
        description: 'Площадь топлива в квадратных сантиметрах см^2',
        value: 0,
    },
    claddingVolume: {
        name: 'claddingVolume',
        description: 'Объем оболочек ТВЭЛ в кубических сантиметрах см^3',
        value: 0,
    },
    waterVolume: {
        name: 'waterVolume',
        description: 'Объем воды в кубических сантиметрах см^3',
        value: 0,
    },
    fuelFraction: {
        name: 'fuelFraction',
        description: 'Объемная доля топлива',
        value: 0,
    },
    zirconiumFraction: {
        name: 'zirconiumFraction',
        description: 'Объемная доля конструкционного материала (циркония Zr)',
        value: 0,
    },
    waterFraction: {
        name: 'waterFraction',
        description: 'Объемная доля воды H2O',
        value: 0,
    },
};

export const useCellParamsStore = create<CellParamsStore>()(
    devtools(
        immer((set) => ({
            cellParams: cellParamsDefaults,

            setCellParam: (key, value) =>
                set(
                    (state) => {
                        state.cellParams[key].value = value;
                        state.filled = areAllParamsFilled(state.cellParams);
                    },
                    undefined,
                    getActionName('CellParamsStore', `setCellParam: ${key}`),
                ),
            setCellParams: (params) =>
                set(
                    (state) => {
                        Object.keys(params).forEach((key) => {
                            const keyParam = key as keyof CellParams;
                            state.cellParams[keyParam].value = params[keyParam];
                        });

                        state.filled = areAllParamsFilled(state.cellParams);
                    },
                    undefined,
                    getActionName('CellParamsStore', `setCellParams`),
                ),
        })),
    ),
);
