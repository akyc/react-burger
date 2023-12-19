import { LOGIN_USER, LOGOUT_USER } from "../actions/login";
import {
    TUnionAction
} from "../actions";

type TInitialState = {
    login: boolean,
    logout: boolean
}

const initialState: TInitialState = {
    login: false,
    logout: false
};

export const loginUserReducer = (state: TInitialState = initialState, action: TUnionAction) : TInitialState => {
    switch (action.type) {
        case LOGOUT_USER:
            return {
                ...state,
                login: !action.payload,
                logout: action.payload,
            }
        case LOGIN_USER:
            return {
                ...state,
                login: action.payload,
                logout: !action.payload,
            }
        default:
            return state;
    }
}
