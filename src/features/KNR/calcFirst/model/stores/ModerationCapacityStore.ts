import { areAllParamsFilled, getActionName } from '@shared/lib/utils';
import { SetParams } from '@shared/types/param.ts';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { ModerationCapacity } from '../types/moderationCapacity';

interface ModerationCapacityStore {
    filled?: boolean;
    moderationCapacityParams: ModerationCapacity;
    setModerationCapacityParam: <T extends keyof ModerationCapacity>(
        key: T,
        value: number,
    ) => void;
    setModerationCapacityParams: (value: SetParams<ModerationCapacity>) => void;
}

const moderationCapacityDefaults: ModerationCapacity = {
    moderationCapacityU235: {
        name: 'ξΣ_s5',
        description: 'Замедляющая способность U235 в см^(-1)',
        value: 0,
    },
    moderationCapacityU238: {
        name: 'ξΣ_s8',
        description: 'Замедляющая способность U238 в см^(-1)',
        value: 0,
    },
    moderationCapacityO2: {
        name: 'ξΣ_sO2',
        description: 'Замедляющая способность кислорода O2 в см^(-1)',
        value: 0,
    },
    moderationCapacityH2O: {
        name: 'ξΣ_sH2O',
        description: 'Замедляющая способность воды H2O в см^(-1)',
        value: 0,
    },
    moderationCapacityZr: {
        name: 'ξΣ_sZr',
        description: 'Замедляющая способность циркония Zr в см^(-1)',
        value: 0,
    },
    totalModerationCapacity: {
        name: 'ξΣ_sΣ    ',
        description: 'Суммарная замедляющая способность в см^(-1)',
        value: 0,
    },
};

export const useModerationCapacityStore = create<ModerationCapacityStore>()(
    devtools(
        immer((set) => ({
            moderationCapacityParams: moderationCapacityDefaults,

            setModerationCapacityParam: (key, value) =>
                set(
                    (state) => {
                        state.moderationCapacityParams[key].value = value;
                        state.filled = areAllParamsFilled(
                            state.moderationCapacityParams,
                        );
                    },
                    undefined,
                    getActionName(
                        'ModerationCapacityStore',
                        `setModerationCapacityParam: ${key}`,
                    ),
                ),

            setModerationCapacityParams: (params) =>
                set(
                    (state) => {
                        Object.keys(params).forEach((key) => {
                            const keyParam = key as keyof ModerationCapacity;
                            state.moderationCapacityParams[keyParam].value =
                                params[keyParam];
                        });

                        state.filled = areAllParamsFilled(
                            state.moderationCapacityParams,
                        );
                    },
                    undefined,
                    getActionName(
                        'ModerationCapacityStore',
                        `setModerationCapacityParams`,
                    ),
                ),
        })),
    ),
);
