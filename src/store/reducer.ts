import { Actions } from './actions.ts';
import { ActionType, StateType } from './types.ts';

export const Reducer = (state: StateType, action: ActionType) => {
    switch (action.type) {
        case Actions.CHANGE_VELOCITY:
            return { ...state, velocity: action.payload };
        case Actions.CHANGE_MODE:
            return { ...state, mode: action.payload };
        case Actions.CHANGE_HEIGHT:
            return { ...state, height: action.payload };
        case Actions.CHANGE_INTERVAL:
            return { ...state, interval: action.payload };
        case Actions.CHANGE_NOMINAL_POWER:
            return { ...state, nominalPower: action.payload };
        case Actions.CHANGE_PLAY_OFF:
            return { ...state, start: !state.start };
        case Actions.CHANGE_POWER:
            return { ...state, power: action.payload };
        case Actions.CHANGE_REACTOR_HEIGHT:
            return { ...state, reactorHeight: action.payload };
        case Actions.CHANGE_START_REACTIVITY:
            return { ...state, startReactivity: action.payload };
        default:
            return state;
    }
};
