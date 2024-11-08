import { CellParams } from '@features/KNR/calcFirst/model/types/cellParams.ts';
import { areAllParamsFilled, getActionName } from '@shared/lib/utils';
import { SetParams } from '@shared/types/param.ts';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { MacroscopicCrossSections } from '../types/macroscopicCrossSections.ts';

interface MacroscopicCrossSectionsStore {
    filled?: boolean;
    macroscopicCrossSections: MacroscopicCrossSections;
    setMacroscopicCrossSection: <T extends keyof MacroscopicCrossSections>(
        key: T,
        value: number,
    ) => void;
    setMacroscopicCrossSections: (
        value: SetParams<MacroscopicCrossSections>,
    ) => void;
}

const macroscopicCrossSectionsDefaults: MacroscopicCrossSections = {
    macroSigmaA5: {
        name: 'Σ_a5',
        description: 'Макроскопическое сечение поглощения U235 в см^(-1)',
        value: 0,
    },
    macroSigmaA8: {
        name: 'Σ_a8',
        description: 'Макроскопическое сечение поглощения U238 в см^(-1)',
        value: 0,
    },
    macroSigmaAZr: {
        name: 'Σ_aZr',
        description:
            'Макроскопическое сечение поглощения конструкционного материала (Zr) в см^(-1)',
        value: 0,
    },
    macroSigmaAO2: {
        name: 'Σ_aO2',
        description:
            'Макроскопическое сечение поглощения кислорода O2 в см^(-1)',
        value: 0,
    },
    macroSigmaAH2O: {
        name: 'Σ_aH2O',
        description: 'Макроскопическое сечение поглощения воды H2O в см^(-1)',
        value: 0,
    },
    macroSigmaATotal: {
        name: 'Σ_aΣ',
        description: 'Суммарное макроскопическое сечение поглощения в см^(-1)',
        value: 0,
    },
};

export const useMacroscopicCrossSectionsStore =
    create<MacroscopicCrossSectionsStore>()(
        devtools(
            immer((set) => ({
                macroscopicCrossSections: macroscopicCrossSectionsDefaults,

                setMacroscopicCrossSection: (key, value) =>
                    set(
                        (state) => {
                            state.macroscopicCrossSections[key].value = value;
                            state.filled = areAllParamsFilled(
                                state.macroscopicCrossSections,
                            );
                        },
                        undefined,
                        getActionName(
                            'MacroscopicCrossSectionsStore',
                            `setMacroscopicCrossSection: ${key}`,
                        ),
                    ),

                setMacroscopicCrossSections: (params) =>
                    set(
                        (state) => {
                            Object.keys(params).forEach((key) => {
                                const keyParam = key as keyof CellParams;
                                state.macroscopicCrossSections[keyParam].value =
                                    params[keyParam];
                            });

                            state.filled = areAllParamsFilled(
                                state.macroscopicCrossSections,
                            );
                        },
                        undefined,
                        getActionName(
                            'MacroscopicCrossSectionsStore',
                            `setMacroscopicCrossSections`,
                        ),
                    ),
            })),
        ),
    );
