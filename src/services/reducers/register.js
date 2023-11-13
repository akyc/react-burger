import { REGISTER_USER } from "../actions/register";

const initialState = {
    success: false,
    user: {},
};

export const registerUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_USER: {
            return {
                ...state,
                success: action.data.success,
                user: action.data.user,
            }
        }
        default: {
            return state;
        }
    }
}
