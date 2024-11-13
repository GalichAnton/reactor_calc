import { ComputedParams } from '@features/reactivityCalc/model/types/computedParams.ts';
import { InitialReactivityParams } from '@features/reactivityCalc/model/types/initialReactivityParams.ts';
import { getActionName } from '@shared/lib/utils';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { OPERATING_MODE } from '../constants/mode.ts';

interface Config {
    isSix: boolean;
    start: boolean;
}

type ReactivityStateType = {
    initialParams: InitialReactivityParams;
    computedParams: ComputedParams;
    setInitialParam: <
        T extends keyof InitialReactivityParams,
        K extends InitialReactivityParams[T],
    >(
        key: T,
        value: K,
    ) => void;
    setInitialParams: (value: InitialReactivityParams) => void;
    setComputedParams: (value: ComputedParams) => void;
    setComputedParam: <
        T extends keyof ComputedParams,
        K extends ComputedParams[T],
    >(
        key: T,
        value: K,
    ) => void;
    setConfig: <T extends keyof Config, K extends Config[T]>(
        key: T,
        value: K,
    ) => void;
    config: Config;
    reset: () => void;
    setStart: () => void;
};

interface initialStoreValues {
    initialParams: InitialReactivityParams;
    computedParams: ComputedParams;
    config: Config;
}

const initialState: initialStoreValues = {
    initialParams: {
        velocity: 2,
        mode: OPERATING_MODE.STOP,
        startReactivity: 0,
        height: 187.5,
        power: 0,
        thermalPower: 0,
        interval: 0.1,
        nominalPower: 1000,
        reactorHeight: 373,
        process: 0,
        nTvs: 163,
        nTvel: 311,
        r_t: 3.8e-3,
    },
    computedParams: {
        calcTime: [],
        calcC: [],
        calcHeight: [],
        calcPower: [],
        calcReactivity: [],
        calcRel: [],
        calcCSix: [],
        calcThermalCoefficient: [],
    },
    config: {
        isSix: false,
        start: false,
    },
};

export const useReactivityStore = create<ReactivityStateType>()(
    devtools(
        immer((set) => ({
            initialParams: initialState.initialParams,
            computedParams: initialState.computedParams,
            config: initialState.config,
            setInitialParams: (params) =>
                set(
                    (state) => {
                        state.initialParams = params;
                    },
                    undefined,
                    getActionName('ReactivityStore', 'setInitialParam'),
                ),
            setInitialParam: (key, value) =>
                set(
                    (state) => {
                        state.initialParams[key] = value;
                    },
                    undefined,
                    getActionName(
                        'ReactivityStore',
                        `setInitialParams: ${key}`,
                    ),
                ),
            setComputedParam: (key, value) =>
                set(
                    (state) => {
                        // @ts-expect-error err
                        state.computedParams[key].push(value);
                    },
                    undefined,
                    getActionName('ReactivityStore', `setKInfParams`),
                ),
            setComputedParams: (params) =>
                set(
                    (state) => {
                        state.computedParams = params;
                    },
                    undefined,
                    getActionName('ReactivityStore', `setKInfParams`),
                ),
            reset: () =>
                set((state) => {
                    state.initialParams = initialState.initialParams;
                    state.computedParams = initialState.computedParams;
                }),
            setConfig: (key, value) =>
                set(
                    (state) => {
                        state.config[key] = value;
                    },
                    undefined,
                    getActionName('ReactivityStore', `setConfig: ${key}`),
                ),
            setStart: () =>
                set(
                    (state) => {
                        state.config.start = !state.config.start;
                    },
                    undefined,
                    getActionName('ReactivityStore', `setStart`),
                ),
        })),
    ),
);
