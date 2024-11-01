import { ReactorParams } from '@entities/reactor';
import { getActionName } from '@shared/lib/utils';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { OPERATING_MODE } from '../constants/mode.ts';

type StateType = {
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
};

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
};

type ReactivityStore = StateType & ActionsType;

export const useReactivityStore = create<ReactivityStore>()(
    devtools(
        immer((set) => ({
            ...initialState,
            changeVelocity: (value) =>
                set(
                    (state) => {
                        state.velocity = value;
                    },
                    undefined,
                    getActionName('ReactivityStore', 'changeVelocity'),
                ),
            changeMode: (value) =>
                set(
                    (state) => {
                        state.mode = value;
                    },
                    undefined,
                    getActionName('ReactivityStore', 'changeMode'),
                ),
            changeStartReactivity: (value) =>
                set(
                    (state) => {
                        state.startReactivity = value;
                    },
                    undefined,
                    getActionName('ReactivityStore', 'changeStartReactivity'),
                ),
            changeHeight: (value) =>
                set(
                    (state) => {
                        state.height = value;
                    },
                    undefined,
                    getActionName('ReactivityStore', 'changeHeight'),
                ),
            changePower: (value) =>
                set(
                    (state) => {
                        state.power = value;
                    },
                    undefined,
                    getActionName('ReactivityStore', 'changePower'),
                ),
            changeNominalPower: (value) =>
                set(
                    (state) => {
                        state.nominalPower = value;
                    },
                    undefined,
                    getActionName('ReactivityStore', 'changeNominalPower'),
                ),
            changeInterval: (value) =>
                set(
                    (state) => {
                        state.interval = value;
                    },
                    undefined,
                    getActionName('ReactivityStore', 'changeInterval'),
                ),
            changeStart: () =>
                set(
                    (state) => {
                        state.start = !state.start;
                    },
                    undefined,
                    getActionName('ReactivityStore', 'changeStart'),
                ),
            changeReactorHeight: (value) => {
                set(
                    (state) => {
                        state.reactorHeight = value;
                        state.height = value / 2;
                    },
                    undefined,
                    getActionName('ReactivityStore', 'changeReactorHeight'),
                );
            },
            updateCalcParams: (value) => {
                set(
                    (state) => {
                        if (!state.params) {
                            state.params = {
                                calcTime: [],
                                calcHeight: [],
                                calcReactivity: [],
                                calcRel: [],
                                calcC: [],
                                calcPower: [],
                            };
                        }

                        state.params.calcTime.push(value.time);
                        state.params.calcHeight.push(value.height);
                        state.params.calcReactivity.push(value.reactivity);
                        state.params.calcRel.push(value.rel);

                        // @ts-ignore
                        state.params.calcC.push(value.c);

                        state.params.calcPower.push(value.power);
                    },
                    undefined,
                    getActionName('ReactivityStore', 'updateCalcParams'),
                );
            },
            changeCalcHeight: (value) =>
                set(
                    (state) => {
                        state.params?.calcHeight.push(value);
                    },
                    undefined,
                    getActionName('ReactivityStore', 'changeCalcHeight'),
                ),
            changeIsSix: (value) =>
                set(
                    (state) => {
                        state.isSix = value;
                    },
                    undefined,
                    getActionName('ReactivityStore', 'changeIsSix'),
                ),
        })),
        { name: 'ReactivityStore' },
    ),
);
