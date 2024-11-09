import { areAllParamsFilled, getActionName } from '@shared/lib/utils';
import { SetParams } from '@shared/types/param.ts';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { LossFactorParams } from '../types/lossFactorParams';

interface LossFactorParamsStore {
    filled?: boolean;
    lossFactorParams: LossFactorParams;
    setLossFactorParam: <T extends keyof LossFactorParams>(
        key: T,
        value: number,
    ) => void;
    setLossFactorParams: (value: SetParams<LossFactorParams>) => void;
}

const lossFactorParamsDefaults: LossFactorParams = {
    powerRatio: {
        name: 'q_1/q_2',
        description: 'Отношение мощностей источников тепловых нейтронов',
        value: 0,
    },
    blockDiffusionCoef: {
        name: 'D_1',
        description: 'Коэффициент диффузии тепловых нейтронов в блоке',
        value: 0,
    },
    blockInverseDiffLength: {
        name: 'α_1',
        description: 'Обратная длина диффузии тепловых нейтронов в блоке',
        value: 0,
    },
    moderatorDiffusionCoef: {
        name: 'D_2',
        description: 'Коэффициент диффузии тепловых нейтронов в замедлителе',
        value: 0,
    },
    moderatorInverseDiffLength: {
        name: 'α_2',
        description: 'Обратная длина диффузии тепловых нейтронов в замедлителе',
        value: 0,
    },
    besselI1: {
        name: "I_1(α'R_1)",
        description: "Функция Бесселя I1(α'R1)",
        value: 0,
    },
    besselI0: {
        name: "I_0(α'R_1)",
        description: "Функция Бесселя I0(α'R1)",
        value: 0,
    },
    moderatorG1: {
        name: 'G_1',
        description: 'Функция G1 для замедлителя',
        value: 0,
    },
    moderatorG0: {
        name: 'G_0',
        description: 'Функция G0 для замедлителя',
        value: 0,
    },
    blockFluxDensity: {
        name: 'Φ_1',
        description: 'Плотность потока для блока',
        value: 0,
    },
    moderatorFluxDensity: {
        name: 'Φ_2',
        description: 'Плотность потока для замедлителя',
        value: 0,
    },
    lossFactor: {
        name: 'd',
        description: 'Коэффициент проигрыша',
        value: 0,
    },
    lossFactorOther: {
        name: "d'",
        description: 'Коэффициент проигрыша по другой методике',
        value: 0,
    },
};

export const useLossFactorParamsStore = create<LossFactorParamsStore>()(
    devtools(
        immer((set) => ({
            lossFactorParams: lossFactorParamsDefaults,

            setLossFactorParam: (key, value) =>
                set(
                    (state) => {
                        state.lossFactorParams[key].value = value;
                        state.filled = areAllParamsFilled(
                            state.lossFactorParams,
                        );
                    },
                    undefined,
                    getActionName(
                        'LossFactorParamsStore',
                        `setLossFactorParam: ${key}`,
                    ),
                ),

            setLossFactorParams: (params) =>
                set(
                    (state) => {
                        Object.keys(params).forEach((key) => {
                            const keyParam = key as keyof LossFactorParams;
                            state.lossFactorParams[keyParam].value =
                                params[keyParam];
                        });

                        state.filled = areAllParamsFilled(
                            state.lossFactorParams,
                        );
                    },
                    undefined,
                    getActionName(
                        'LossFactorParamsStore',
                        `setLossFactorParams`,
                    ),
                ),
        })),
    ),
);
