import { areAllParamsFilled } from '@shared/lib/utils';
import { SetParams } from '@shared/types/param.ts';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { CompensationParameters } from '../../model/types/compensationParameters.ts';

const reactorParamsDefaults: CompensationParameters = {
    totalReactivity: {
        name: 'ρ_общ, о.е.',
        description:
            'Запас реактивности для обеспечения кампании с учётом погрешности',
        value: 0,
    },
    rodBlackness: {
        name: 'ξ, о.е.',
        description: 'Коэффициент черноты стержня',
        value: 0,
    },
    centralRodCompensation: {
        name: 'ρ_цс, о.е.',
        description: 'Компенсирующая способность центрального стержня',
        value: 0,
    },
    nControlRoads: {
        name: 'n_controls, шт.',
        description: 'Число регулирующих стержней',
        value: 0,
    },
    nSUZ: {
        name: 'n_suz, шт.',
        description: 'Количество ОР СУЗ',
        value: 0,
    },
};

interface ReactorStore {
    filled?: boolean;
    compensationParams: CompensationParameters;
    setCompensationParam: <T extends keyof CompensationParameters>(
        key: T,
        value: number,
    ) => void;
    setCompensationParams: (value: SetParams<CompensationParameters>) => void;
}

const getActionName = (store: string, action: string) => `${store}/${action}`;

export const useCompensationsStore = create<ReactorStore>()(
    devtools(
        immer((set) => ({
            compensationParams: reactorParamsDefaults,

            setCompensationParam: (key, value) =>
                set(
                    (state) => {
                        state.compensationParams[key].value = value;
                        state.filled = areAllParamsFilled(
                            state.compensationParams,
                        );
                    },
                    undefined,
                    getActionName(
                        'CompensationsStore',
                        `setReactorParam: ${key}`,
                    ),
                ),

            setCompensationParams: (params) =>
                set(
                    (state) => {
                        Object.keys(params).forEach((key) => {
                            const keyParam =
                                key as keyof CompensationParameters;
                            state.compensationParams[keyParam].value =
                                params[keyParam];
                        });

                        state.filled = areAllParamsFilled(
                            state.compensationParams,
                        );
                    },
                    undefined,
                    getActionName('CompensationsStore', 'setReactorParams'),
                ),
        })),
    ),
);
