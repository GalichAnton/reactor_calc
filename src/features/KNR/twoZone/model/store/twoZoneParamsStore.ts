import { areAllParamsFilled, getActionName } from '@shared/lib/utils';
import { SetParams } from '@shared/types/param.ts';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { TwoZoneModelParams } from '../types/twoZoneModelParams';

interface TwoZoneModelParamsStore {
    filled?: boolean;
    params: TwoZoneModelParams;
    setParam: <T extends keyof TwoZoneModelParams>(
        key: T,
        value: number,
    ) => void;
    setParams: (value: SetParams<TwoZoneModelParams>) => void;
}

const paramsDefaults: TwoZoneModelParams = {
    twoZoneCellVolume: {
        name: 'V_яч, см^3',
        description: 'Объём ячейки в см^3',
        value: 0,
    },
    twoZoneFirstZoneRadius: {
        name: 'R_1, см',
        description: 'Радиус первой зоны (топливо + газовый зазор) в см',
        value: 0,
    },
    twoZoneTotalRadius: {
        name: 'R_2, см',
        description: 'Радиус всей двухзонной ячейки в см',
        value: 0,
    },
    twoZoneFirstZoneVolume: {
        name: 'V_1, см^3',
        description: 'Объём первой зоны (блока) в см^3',
        value: 0,
    },
    twoZoneModeratorVolume: {
        name: 'V_2, см^3',
        description: 'Объём второй зоны (замедлителя) в см^3',
        value: 0,
    },
    twoZoneBlockAbsorptionCrossSection: {
        name: 'Σ_a1, см^-1',
        description: 'Макроскопическое сечение поглощения в блоке в см^(-1)',
        value: 0,
    },
    twoZoneBlockTransportCrossSection: {
        name: 'Σ_tr1, см^-1',
        description: 'Транспортное макроскопическое сечение в блоке в см^(-1)',
        value: 0,
    },
    twoZoneModeratorAbsorptionCrossSection: {
        name: 'Σ_a2, см^-1',
        description:
            'Макроскопическое сечение поглощения в замедлителе в см^(-1)',
        value: 0,
    },
    twoZoneModeratorTransportCrossSection: {
        name: 'Σ_tr2, см^-1',
        description:
            'Транспортное макроскопическое сечение в замедлителе в см^(-1)',
        value: 0,
    },
};

export const useTwoZoneModelParamsStore = create<TwoZoneModelParamsStore>()(
    devtools(
        immer((set) => ({
            params: paramsDefaults,

            setParam: (key, value) =>
                set(
                    (state) => {
                        state.params[key].value = value;
                        state.filled = areAllParamsFilled(state.params);
                    },
                    undefined,
                    getActionName(
                        'TwoZoneModelParamsStore',
                        `setParam: ${key}`,
                    ),
                ),

            setParams: (params) =>
                set(
                    (state) => {
                        Object.entries(params).forEach(([key, value]) => {
                            const paramKey = key as keyof TwoZoneModelParams;
                            state.params[paramKey].value = value;
                        });
                        state.filled = areAllParamsFilled(state.params);
                    },
                    undefined,
                    getActionName('TwoZoneModelParamsStore', 'setParams'),
                ),
        })),
    ),
);
