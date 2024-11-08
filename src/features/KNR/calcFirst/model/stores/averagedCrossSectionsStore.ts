import { areAllParamsFilled, getActionName } from '@shared/lib/utils';
import { SetParams } from '@shared/types/param.ts';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { AveragedCrossSections } from '../../model/types/averagedMicroCrossSections.ts';

interface AveragedCrossSectionsStore {
    filled?: boolean;
    averagedCrossSections: AveragedCrossSections;
    setAveragedCrossSection: <T extends keyof AveragedCrossSections>(
        key: T,
        value: number,
    ) => void;
    setAveragedCrossSections: (value: SetParams<AveragedCrossSections>) => void;
}

const averagedCrossSectionsDefaults: AveragedCrossSections = {
    // Микроскопические сечения
    averagedMicroFU5: {
        name: 'σ_f5, см^2',
        description: 'Усредненное микроскопическое сечение деления U235 в см^2',
        value: 0,
    },
    averagedMicroAU5: {
        name: 'σ_a5, см^2',
        description:
            'Усредненное микроскопическое сечение поглощения U235 в см^2',
        value: 0,
    },
    averagedMicroAU8: {
        name: 'σ_a8, см^2',
        description:
            'Усредненное микроскопическое сечение поглощения U238 в см^2',
        value: 0,
    },
    averagedMicroAO2: {
        name: 'σ_aO2, см^2',
        description:
            'Усредненное микроскопическое сечение поглощения кислорода O2 в см^2',
        value: 0,
    },
    averagedMicroAH2O: {
        name: 'σ_aH2O, см^2',
        description:
            'Усредненное микроскопическое сечение поглощения воды H2O в см^2',
        value: 0,
    },
    averagedMicroAZr: {
        name: 'σ_aZr, см^2',
        description:
            'Усредненное микроскопическое сечение поглощения циркония Zr в см^2',
        value: 0,
    },

    // Макроскопические сечения
    averagedMacroFU5: {
        name: 'Σ_f5, см^(-1)',
        description:
            'Усредненное макроскопическое сечение деления U235 в см^(-1)',
        value: 0,
    },
    averagedMacroAU5: {
        name: 'Σ_a5, см^(-1)',
        description:
            'Усредненное макроскопическое сечение поглощения U235 в см^(-1)',
        value: 0,
    },
    averagedMacroAU8: {
        name: 'Σ_a8, см^(-1)',
        description:
            'Усредненное макроскопическое сечение поглощения U238 в см^(-1)',
        value: 0,
    },
    averagedMacroAO2: {
        name: 'Σ_aO2, см^(-1)',
        description:
            'Усредненное макроскопическое сечение поглощения кислорода O2 в см^(-1)',
        value: 0,
    },
    averagedMacroAH2O: {
        name: 'Σ_aH2O, см^(-1)',
        description:
            'Усредненное макроскопическое сечение поглощения воды H2O в см^(-1)',
        value: 0,
    },
    averagedMacroAZr: {
        name: 'Σ_aZr, см^(-1)',
        description:
            'Усредненное макроскопическое сечение поглощения циркония Zr в см^(-1)',
        value: 0,
    },
    averagedMacroATotal: {
        name: 'Σ_aΣ, см^(-1)',
        description:
            'Суммарное усредненное макроскопическое сечение поглощения в см^(-1)',
        value: 0,
    },
};

export const useAveragedCrossSectionsStore =
    create<AveragedCrossSectionsStore>()(
        devtools(
            immer((set) => ({
                averagedCrossSections: averagedCrossSectionsDefaults,

                setAveragedCrossSection: (key, value) =>
                    set(
                        (state) => {
                            state.averagedCrossSections[key].value = value;
                            state.filled = areAllParamsFilled(
                                state.averagedCrossSections,
                            );
                        },
                        undefined,
                        getActionName(
                            'AveragedMicroscopicCrossSectionsStore',
                            `setAveragedMicroscopicCrossSection: ${key}`,
                        ),
                    ),

                setAveragedCrossSections: (params) =>
                    set(
                        (state) => {
                            Object.keys(params).forEach((key) => {
                                const keyParam =
                                    key as keyof AveragedCrossSections;
                                state.averagedCrossSections[keyParam].value =
                                    params[keyParam];
                            });

                            state.filled = areAllParamsFilled(
                                state.averagedCrossSections,
                            );
                        },
                        undefined,
                        getActionName(
                            'AveragedMicroscopicCrossSectionsStore',
                            'setAveragedMicroscopicCrossSections',
                        ),
                    ),
            })),
        ),
    );
