import React, { createContext, useReducer } from 'react';

import { Actions } from './actions.ts';
import { Reducer } from './reducer.ts';
import { AppContextType, initialStateType, OPERATING_MODE } from './types.ts';

const initialState: initialStateType = {
    velocity: 0,
    mode: OPERATING_MODE.STOP,
    reactivity: 0,
    height: 0,
};

const AppContext = createContext<AppContextType>({
    state: initialState,
    changeVelocity: () => undefined,
    changeMode: () => undefined,
    changeReactivity: () => undefined,
    changeHeight: () => undefined,
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
        changeReactivity: (value: number) => {
            dispatch({ type: Actions.CHANGE_REACTIVITY, payload: value });
        },
        changeHeight: (value: number) => {
            dispatch({ type: Actions.CHANGE_REACTIVITY, payload: value });
        },
    };

    return <Provider value={providerValue}>{children}</Provider>;
};

export { AppContext, StateProvider };
