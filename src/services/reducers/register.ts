import { REGISTER_USER } from "../actions/register";
import {
    TUnionAction
} from "../actions";
import {
    TUserInfoResponse
} from "../actions/user";

type TInitialState = TUserInfoResponse

const initialState : TInitialState = {
    success: false,
    user: {},
};

export const registerUserReducer = (state : TInitialState = initialState, action : TUnionAction) : TInitialState => {
    switch (action.type) {
        case REGISTER_USER: {
            return {
                ...state,
                success: action.payload.success,
                user: action.payload.user,
            }
        }
        default: {
            return state;
        }
    }
}
