import { getActionName } from '@shared/lib/utils';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { ZRelations } from '../types/zRelations';

interface ZRelationsStore {
    filled?: boolean;
    initialConcentrationN05: number;
    initialConcentrationN08: number;
    zRelationsParams?: ZRelations[];
    setZRelationProperties: (value: ZRelations) => void;
    resetStore: () => void;
}

export const useZRelationsStore = create<ZRelationsStore>()(
    devtools(
        immer((set) => ({
            initialConcentrationN05: 0,
            initialConcentrationN08: 0,
            setZRelationProperties: (params) =>
                set(
                    (state) => {
                        if (!state.zRelationsParams) {
                            state.zRelationsParams = [];
                        }

                        state.zRelationsParams.push(params);
                        state.filled = true;
                    },
                    undefined,
                    getActionName('ZRelationsStore', 'setZRelationProperties'),
                ),
            resetStore: () =>
                set(
                    (state) => (state.zRelationsParams = undefined),
                    undefined,
                    getActionName('ZRelationsStore', 'resetStore'),
                ),
        })),
    ),
);
