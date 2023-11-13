import { GET_RESET_PASSWORD_SUCCESS } from '../actions/reset-password'

const initialState = {
    success: false
}

export const recoverPasswordReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_RESET_PASSWORD_SUCCESS: {
            return {
                ...state,
                success: action.success
            }
        }
        default: {
            return state;
        }
    }
}
