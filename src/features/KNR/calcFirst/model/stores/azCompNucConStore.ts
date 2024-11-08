import { areAllParamsFilled, getActionName } from '@shared/lib/utils';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { AzComponentsNuclearConcentrations } from '../../model/types/azComponentsNuclearConcentrations.ts';

interface NuclearConcentrationsStore {
    filled?: boolean;
    concentrations: AzComponentsNuclearConcentrations;
    setConcentrationValue: <T extends keyof AzComponentsNuclearConcentrations>(
        key: T,
        value: number,
    ) => void;
    setConcentrations: (
        value: Record<keyof AzComponentsNuclearConcentrations, number>,
    ) => void;
}

const nuclearConcentrationsDefaults: AzComponentsNuclearConcentrations = {
    N_0U: {
        name: 'N_0U',
        description: 'Ядерная концентрация топлива UO2 в см^(-3)',
        value: 0,
    },
    N_05: {
        name: 'N_05',
        description: 'Ядерная концентрация U235 в см^(-3)',
        value: 0,
    },
    N_08: {
        name: 'N_08',
        description: 'Ядерная концентрация U238 в см^(-3)',
        value: 0,
    },
    N_0O2: {
        name: 'N_0O2',
        description: 'Ядерная концентрация кислорода O2 в см^(-3)',
        value: 0,
    },
    N_0H2O: {
        name: 'N_0H2O',
        description: 'Ядерная концентрация воды H2O в см^(-3)',
        value: 0,
    },
    N_0Zr: {
        name: 'N_0Zr',
        description: 'Ядерная концентрация циркония Zr в см^(-3)',
        value: 0,
    },
    averageN_5: {
        name: 'averageN_5',
        description:
            'Средняя ядерная концентрация U235 по гомогенной ячейке в см^(-3)',
        value: 0,
    },
    averageN_8: {
        name: 'averageN_8',
        description:
            'Средняя ядерная концентрация U238 по гомогенной ячейке в см^(-3)',
        value: 0,
    },
    averageN_O2: {
        name: 'averageN_O2',
        description:
            'Средняя ядерная концентрация кислорода O2 по гомогенной ячейке в см^(-3)',
        value: 0,
    },
    averageN_H2O: {
        name: 'averageN_H2O',
        description:
            'Средняя ядерная концентрация воды H2O по гомогенной ячейке в см^(-3)',
        value: 0,
    },
    averageN_Zr: {
        name: 'averageN_Zr',
        description:
            'Средняя ядерная концентрация циркония Zr по гомогенной ячейке в см^(-3)',
        value: 0,
    },
};

export const useNuclearConcentrationsStore =
    create<NuclearConcentrationsStore>()(
        devtools(
            immer((set) => ({
                concentrations: nuclearConcentrationsDefaults,

                setConcentrationValue: (key, value) =>
                    set(
                        (state) => {
                            state.concentrations[key].value = value;
                            state.filled = areAllParamsFilled(
                                state.concentrations,
                            );
                        },
                        undefined,
                        getActionName(
                            'setConcentrationValue',
                            `setConcentrationValue=${key}`,
                        ),
                    ),

                setConcentrations: (params) =>
                    set(
                        (state) => {
                            Object.keys(params).forEach((key) => {
                                const keyParam =
                                    key as keyof AzComponentsNuclearConcentrations;
                                state.concentrations[keyParam].value =
                                    params[keyParam];
                            });

                            state.filled = areAllParamsFilled(
                                state.concentrations,
                            );
                        },
                        undefined,
                        getActionName(
                            'setConcentrationValue',
                            'setConcentrations',
                        ),
                    ),
            })),
        ),
    );
