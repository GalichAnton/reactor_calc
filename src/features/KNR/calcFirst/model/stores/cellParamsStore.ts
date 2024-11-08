import { areAllParamsFilled, getActionName } from '@shared/lib/utils';
import { SetParams } from '@shared/types/param.ts';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { CellParams } from '../types/cellParams';

interface CellParamsStore {
    filled?: boolean;
    cellParams: CellParams;
    setCellParam: <T extends keyof CellParams>(key: T, value: number) => void;
    setCellParams: (value: SetParams<CellParams>) => void;
}

const cellParamsDefaults: CellParams = {
    cellVolume: {
        name: 'V_0',
        description: 'Объем ячейки в кубических сантиметрах см^3',
        value: 0,
    },
    fuelVolume: {
        name: 'V_U',
        description: 'Объем топлива в кубических сантиметрах см^3',
        value: 0,
    },
    fuelArea: {
        name: 'S_U',
        description: 'Площадь топлива в квадратных сантиметрах см^2',
        value: 0,
    },
    claddingVolume: {
        name: 'V_Zr',
        description: 'Объем оболочек ТВЭЛ в кубических сантиметрах см^3',
        value: 0,
    },
    waterVolume: {
        name: 'V_H2O',
        description: 'Объем воды в кубических сантиметрах см^3',
        value: 0,
    },
    fuelFraction: {
        name: 'ε_U',
        description: 'Объемная доля топлива',
        value: 0,
    },
    zirconiumFraction: {
        name: 'ε_Zr',
        description: 'Объемная доля конструкционного материала (циркония Zr)',
        value: 0,
    },
    waterFraction: {
        name: 'ε_H2O',
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
