import { Actions } from './actions.ts';
import { ActionType, StateType } from './types.ts';

export const Reducer = (state: StateType, action: ActionType) => {
    switch (action.type) {
        case Actions.CHANGE_VELOCITY:
            return { ...state, v: action.payload };
        case Actions.CHANGE_MODE:
            return { ...state, mode: action.payload };
        default:
            return state;
    }
};
