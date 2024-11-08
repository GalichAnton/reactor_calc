import { areAllParamsFilled, getActionName } from '@shared/lib/utils';
import { SetParams } from '@shared/types/param.ts';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { TransportMacroscopicCrossSections } from '../../model/types/transportMacroscopicCrossSections';

interface TransportMacroStore {
    filled?: boolean;
    transportMacroCrossSections: TransportMacroscopicCrossSections;
    setTransportMacroParam: <T extends keyof TransportMacroscopicCrossSections>(
        key: T,
        value: number,
    ) => void;
    setTransportMacroCrossSections: (
        value: SetParams<TransportMacroscopicCrossSections>,
    ) => void;
}

const transportMacroDefaultParams: TransportMacroscopicCrossSections = {
    transportMacroH2O: {
        name: 'Σ_tr(H2O), см^(-1)',
        description: 'Транспортное макроскопическое сечение H2O',
        value: 0,
    },
    transportMacroU235: {
        name: 'Σ_tr(U235), см^(-1)',
        description: 'Транспортное макроскопическое сечение U235',
        value: 0,
    },
    transportMacroU238: {
        name: 'Σ_tr(U238), см^(-1)',
        description: 'Транспортное макроскопическое сечение U238',
        value: 0,
    },
    transportMacroO2: {
        name: 'Σ_tr(O2), см^(-1)',
        description: 'Транспортное макроскопическое сечение O2',
        value: 0,
    },
    transportMacroZr: {
        name: 'Σ_tr(Zr), см^(-1)',
        description: 'Транспортное макроскопическое сечение Zr',
        value: 0,
    },
    transportMacroTotal: {
        name: 'Σ_tr(Σ), см^(-1)',
        description:
            'Суммарное транспортное макроскопическое сечение в см^(-1)',
        value: 0,
    },
    transportMacroTotal1eV: {
        name: 'Σ_tr(Σ) 1эВ, см^(-1)',
        description:
            'Суммарное транспортное макроскопическое сечение в см^(-1)',
        value: 0,
    },
};

export const useTransportMacroStore = create<TransportMacroStore>()(
    devtools(
        immer((set) => ({
            transportMacroCrossSections: transportMacroDefaultParams,

            setTransportMacroParam: (key, value) =>
                set(
                    (state) => {
                        state.transportMacroCrossSections[key].value = value;
                        state.filled = areAllParamsFilled(
                            state.transportMacroCrossSections,
                        );
                    },
                    undefined,
                    getActionName(
                        'TransportMacroStore',
                        `setTransportMacroParam: ${key}`,
                    ),
                ),

            setTransportMacroCrossSections: (params) =>
                set(
                    (state) => {
                        Object.keys(params).forEach((key) => {
                            const keyParam =
                                key as keyof TransportMacroscopicCrossSections;
                            state.transportMacroCrossSections[keyParam].value =
                                params[keyParam];
                        });

                        state.filled = areAllParamsFilled(
                            state.transportMacroCrossSections,
                        );
                    },
                    undefined,
                    getActionName(
                        'TransportMacroStore',
                        `setTransportMacroCrossSections`,
                    ),
                ),
        })),
    ),
);
