import { LOGIN_USER, LOGOUT_USER } from "../actions/login";

const initialState = {
    login: null,
    logout: false,
    user: {}
};

export const loginUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGOUT_USER:
            return {
                ...state,
                login: !action.data.success,
                logout: action.data.success,
                user: {}
            }
        case LOGIN_USER:
            return {
                ...state,
                login: action.data.success,
                logout: !action.data.success,
                user: action.data.user,
            }
        default:
            return state;

    }
}
