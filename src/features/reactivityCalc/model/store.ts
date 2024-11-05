import { ReactorParams } from '@entities/reactor';
import { getActionName } from '@shared/lib/utils';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { OPERATING_MODE } from '../constants/mode.ts';

interface StateType {
    velocity: number;
    mode: OPERATING_MODE;
    startReactivity: number;
    height: number;
    power: number;
    interval: number;
    nominalPower: number;
    start: boolean;
    reactorHeight: number;
    process: number;
    params: null | {
        calcTime: number[];
        calcReactivity: number[];
        calcPower: number[];
        calcC: number[] | number[][];
        calcRel: number[];
        calcHeight: number[];
    };
    isSix: boolean;
}

interface ReactivityStore {
    data: StateType;
    actions: ActionsType;
}

const initialState: StateType = {
    velocity: 2,
    mode: OPERATING_MODE.STOP,
    startReactivity: 0,
    height: 187.5,
    power: 0,
    interval: 0.1,
    start: false,
    nominalPower: 1000,
    reactorHeight: 373,
    process: 0,
    params: null,
    isSix: false,
};

type ActionsType = {
    changeVelocity: (value: number) => void;
    changeMode: (value: OPERATING_MODE) => void;
    changeStartReactivity: (value: number) => void;
    changeHeight: (value: number) => void;
    changePower: (value: number) => void;
    changeNominalPower: (value: number) => void;
    changeInterval: (value: number) => void;
    changeStart: () => void;
    changeReactorHeight: (value: number) => void;
    updateCalcParams: (value: ReactorParams) => void;
    changeCalcHeight: (value: number) => void;
    changeIsSix: (value: boolean) => void;
    reset: () => void;
};

export const useReactivityStore = create<ReactivityStore>()(
    devtools(
        immer((set) => ({
            data: initialState,
            actions: {
                reset: () =>
                    set((state) => {
                        state.data = initialState;
                    }),

                changeVelocity: (value) =>
                    set(
                        (state) => {
                            state.data.velocity = value;
                        },
                        undefined,
                        getActionName('ReactivityStore', 'changeVelocity'),
                    ),
                changeMode: (value) =>
                    set(
                        (state) => {
                            state.data.mode = value;
                        },
                        undefined,
                        getActionName('ReactivityStore', 'changeMode'),
                    ),
                changeStartReactivity: (value) =>
                    set(
                        (state) => {
                            state.data.startReactivity = value;
                        },
                        undefined,
                        getActionName(
                            'ReactivityStore',
                            'changeStartReactivity',
                        ),
                    ),
                changeHeight: (value) =>
                    set(
                        (state) => {
                            state.data.height = value;
                        },
                        undefined,
                        getActionName('ReactivityStore', 'changeHeight'),
                    ),
                changePower: (value) =>
                    set(
                        (state) => {
                            state.data.power = value;
                        },
                        undefined,
                        getActionName('ReactivityStore', 'changePower'),
                    ),
                changeNominalPower: (value) =>
                    set(
                        (state) => {
                            state.data.nominalPower = value;
                        },
                        undefined,
                        getActionName('ReactivityStore', 'changeNominalPower'),
                    ),
                changeInterval: (value) =>
                    set(
                        (state) => {
                            state.data.interval = value;
                        },
                        undefined,
                        getActionName('ReactivityStore', 'changeInterval'),
                    ),
                changeStart: () =>
                    set(
                        (state) => {
                            state.data.start = !state.data.start;
                        },
                        undefined,
                        getActionName('ReactivityStore', 'changeStart'),
                    ),
                changeReactorHeight: (value) => {
                    set(
                        (state) => {
                            state.data.reactorHeight = value;
                            state.data.height = value / 2;
                        },
                        undefined,
                        getActionName('ReactivityStore', 'changeReactorHeight'),
                    );
                },
                updateCalcParams: (value) => {
                    set(
                        (state) => {
                            if (!state.data.params) {
                                state.data.params = {
                                    calcTime: [],
                                    calcHeight: [],
                                    calcReactivity: [],
                                    calcRel: [],
                                    calcC: [],
                                    calcPower: [],
                                };
                            }

                            state.data.params.calcTime.push(value.time);
                            state.data.params.calcHeight.push(value.height);
                            state.data.params.calcReactivity.push(
                                value.reactivity,
                            );
                            state.data.params.calcRel.push(value.rel);

                            // @ts-ignore
                            state.data.params.calcC.push(value.c);

                            state.data.params.calcPower.push(value.power);
                        },
                        undefined,
                        getActionName('ReactivityStore', 'updateCalcParams'),
                    );
                },
                changeCalcHeight: (value) =>
                    set(
                        (state) => {
                            state.data.params?.calcHeight.push(value);
                        },
                        undefined,
                        getActionName('ReactivityStore', 'changeCalcHeight'),
                    ),
                changeIsSix: (value) =>
                    set(
                        (state) => {
                            state.data.isSix = value;
                        },
                        undefined,
                        getActionName('ReactivityStore', 'changeIsSix'),
                    ),
            },
        })),
    ),
);
