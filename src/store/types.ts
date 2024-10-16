import { Actions } from './actions.ts';

export type StateType = {
    velocity: number;
    mode: OPERATING_MODE;
    reactivity: number;
    height: number;
};
export type ActionTypeType = keyof typeof Actions;
export type ActionType = {
    type: ActionTypeType;
    payload: any;
};
export type AppContextType = {
    state: StateType;
    changeVelocity: (value: number) => void;
    changeMode: (value: OPERATING_MODE) => void;
    changeReactivity: (value: number) => void;
    changeHeight: (value: number) => void;
};

export type initialStateType = {
    velocity: number;
    mode: OPERATING_MODE.STOP;
    reactivity: number;
    height: number;
};

export enum OPERATING_MODE {
    STOP = 0,
    UP = 1,
    DOWN = -1,
}
