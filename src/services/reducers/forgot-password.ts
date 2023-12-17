import { GET_PASSWORD_SUCCESS } from "../actions/forgot-password";
import {
    TUnionAction
} from "../actions";

type TInitialState = {
    success: boolean
}

const initialState: TInitialState = {
    success: false
}

export const resetPasswordReducer = (state : TInitialState = initialState, action: TUnionAction) : TInitialState => {
    switch (action.type) {
        case GET_PASSWORD_SUCCESS: {
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
