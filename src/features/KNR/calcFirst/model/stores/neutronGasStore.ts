import { CellParams } from '@features/KNR/calcFirst/model/types/cellParams.ts';
import { areAllParamsFilled, getActionName } from '@shared/lib/utils';
import { SetParams } from '@shared/types/param.ts';
import { create } from 'zustand/index';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { NeutronGasParams } from '../../model/types/neutronGasParams.ts';

interface NeutronGasStore {
    filled?: boolean;
    neutronGasParams: NeutronGasParams;
    setNeutronGasParam: <T extends keyof NeutronGasParams>(
        key: T,
        value: number,
    ) => void;
    setNeutronGasParams: (value: SetParams<NeutronGasParams>) => void;
}

const neutronGasParamsDefaults: NeutronGasParams = {
    neutronGasTemperature: {
        name: 'T_n, K',
        description: 'Температура нейтронного газа в K',
        value: 0,
    },
    totalMacroSigmaA: {
        name: 'Σ_a (T_H2O), см^-1',
        description:
            'Cуммарное макроскопическое сечение поглощения при температуре замедлителя см^-1',
        value: 0,
    },
    gVeskottFactorA5: {
        name: 'g_(a_5)',
        description:
            'g-фактор (фактор Весткотта) поглощения U235 в зависимости от температуры',
        value: 0,
    },
    gVeskottFactorF5: {
        name: 'g_(f_5)',
        description:
            'g-фактор (фактор Весткотта) деления U235 в зависимости от температуры',
        value: 0,
    },
    roundedTemperature: {
        name: 'T_n, K',
        description: 'Округленная температура нейтронного газа в K',
        value: 0,
    },
};

export const useNeutronGasParamsStore = create<NeutronGasStore>()(
    devtools(
        immer((set) => ({
            neutronGasParams: neutronGasParamsDefaults,

            setNeutronGasParam: (key, value) =>
                set(
                    (state) => {
                        state.neutronGasParams[key].value = value;
                        state.filled = areAllParamsFilled(
                            state.neutronGasParams,
                        );
                    },
                    undefined,
                    getActionName(
                        'CellParamsStore',
                        `setNeutronGasParam: ${key}`,
                    ),
                ),
            setNeutronGasParams: (params) =>
                set(
                    (state) => {
                        Object.keys(params).forEach((key) => {
                            const keyParam = key as keyof CellParams;
                            state.neutronGasParams[keyParam].value =
                                params[keyParam];
                        });

                        state.filled = areAllParamsFilled(
                            state.neutronGasParams,
                        );
                    },
                    undefined,
                    getActionName('CellParamsStore', `setNeutronGasParams`),
                ),
        })),
    ),
);
