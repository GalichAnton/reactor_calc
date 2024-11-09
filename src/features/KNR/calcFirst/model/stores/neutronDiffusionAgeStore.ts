import { areAllParamsFilled, getActionName } from '@shared/lib/utils';
import { SetParams } from '@shared/types/param.ts';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { NeutronDiffusionAgeParams } from '../types/neutronDiffusionAgeParams.ts';

interface NeutronDiffusionAgeStore {
    filled?: boolean;
    neutronDiffusionAgeParams: NeutronDiffusionAgeParams;
    setNeutronDiffusionAgeParam: <T extends keyof NeutronDiffusionAgeParams>(
        key: T,
        value: number,
    ) => void;
    setNeutronDiffusionAgeParams: (
        value: SetParams<Omit<NeutronDiffusionAgeParams, 'z'>>,
    ) => void;
}

const neutronDiffusionAgeParamsDefaults: NeutronDiffusionAgeParams = {
    diffusionLengthSquared: {
        name: 'L², см²',
        description: 'Квадрат длины диффузии',
        value: 0,
    },

    uraniumEquivalentVolume: {
        name: 'V_U экв, см³',
        description: 'Эквивалентный объем урана',
        value: 0,
    },
    Vrel: {
        name: 'V_rel',
        description: 'Отношение объемов по которому находим z',
        value: 0,
    },
    neutronAge: {
        name: 'τ, см²',
        description: 'Возраст тепловых нейтронов, см^2',
        value: 0,
    },
    z: {
        name: 'z',
        description: 'Параметр z',
        value: 0,
    },
};

export const useNeutronDiffusionAgeStore = create<NeutronDiffusionAgeStore>()(
    devtools(
        immer((set) => ({
            neutronDiffusionAgeParams: neutronDiffusionAgeParamsDefaults,

            setNeutronDiffusionAgeParam: (key, value) =>
                set(
                    (state) => {
                        state.neutronDiffusionAgeParams[key].value = value;
                        state.filled = areAllParamsFilled(
                            state.neutronDiffusionAgeParams,
                        );
                    },
                    undefined,
                    getActionName(
                        'NeutronDiffusionAgeStore',
                        `setNeutronDiffusionAgeParam: ${key}`,
                    ),
                ),

            setNeutronDiffusionAgeParams: (params) =>
                set(
                    (state) => {
                        Object.keys(params).forEach((key) => {
                            const keyParam =
                                key as keyof NeutronDiffusionAgeParams;
                            state.neutronDiffusionAgeParams[keyParam].value =
                                params[keyParam];
                        });

                        state.filled = areAllParamsFilled(
                            state.neutronDiffusionAgeParams,
                        );
                    },
                    undefined,
                    getActionName(
                        'NeutronDiffusionAgeStore',
                        `setNeutronDiffusionAgeParams`,
                    ),
                ),
        })),
    ),
);
