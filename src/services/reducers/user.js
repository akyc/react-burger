import { GET_USER_INFO, PATCH_USER_INFO } from '../actions/user';

const initialState = {
    success: false,
    user: {
        email: '',
        name: ''
    },
};

export const getUserInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_INFO: {
            return {
                ...state,
                success: action.data.success,
                user: action.data.user,
            }
        }
        case PATCH_USER_INFO: {
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
