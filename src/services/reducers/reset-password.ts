import { GET_RESET_PASSWORD_SUCCESS } from '../actions/reset-password'
import {
    TUnionAction
} from "../actions";

type TInitState = {
    success: boolean
}

const initialState : TInitState = {
    success: false
}

export const recoverPasswordReducer = (state : TInitState = initialState, action : TUnionAction) : TInitState => {
    switch (action.type) {
        case GET_RESET_PASSWORD_SUCCESS: {
            return {
                ...state,
                success: action.payload
            }
        }
        default: {
            return state;
        }
    }
}
