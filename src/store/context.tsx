import React, { createContext, useReducer } from 'react';

import { Actions } from './actions.ts';
import { Reducer } from './reducer.ts';
import { AppContextType, initialStateType, OPERATING_MODE } from './types.ts';

const initialState: initialStateType = {
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
};

const AppContext = createContext<AppContextType>({
    state: initialState,
    changeVelocity: () => undefined,
    changeMode: () => undefined,
    changeStartReactivity: () => undefined,
    changeHeight: () => undefined,
    changePower: () => undefined,
    changeInterval: () => undefined,
    changeNominalPower: () => undefined,
    changeStart: () => undefined,
    changeReactorHeight: () => undefined,
    changeProcess: () => undefined,
});

const { Provider } = AppContext;

const StateProvider = ({
    children,
    providerState,
}: {
    children: React.ReactElement;
    providerState?: initialStateType;
}) => {
    const [state, dispatch] = useReducer(
        Reducer,
        providerState || initialState,
    );

    const providerValue = {
        state,
        changeVelocity: (value: number) => {
            dispatch({ type: Actions.CHANGE_VELOCITY, payload: value });
        },
        changeMode: (value: OPERATING_MODE) => {
            dispatch({ type: Actions.CHANGE_MODE, payload: value });
        },
        changeStartReactivity: (value: number) => {
            dispatch({ type: Actions.CHANGE_START_REACTIVITY, payload: value });
        },
        changeHeight: (value: number) => {
            dispatch({ type: Actions.CHANGE_HEIGHT, payload: value });
        },
        changePower: (value: number) => {
            dispatch({ type: Actions.CHANGE_POWER, payload: value });
        },
        changeInterval: (value: number) => {
            dispatch({ type: Actions.CHANGE_INTERVAL, payload: value });
        },
        changeNominalPower: (value: number) => {
            dispatch({ type: Actions.CHANGE_NOMINAL_POWER, payload: value });
        },
        changeReactorHeight: (value: number) => {
            dispatch({ type: Actions.CHANGE_REACTOR_HEIGHT, payload: value });
        },
        changeStart: () => {
            dispatch({ type: Actions.CHANGE_PLAY_OFF });
        },
        changeProcess: (value: number) => {
            dispatch({ type: Actions.CHANGE_PROCESS, payload: value });
        },
    };

    return <Provider value={providerValue}>{children}</Provider>;
};

export { AppContext, StateProvider };
