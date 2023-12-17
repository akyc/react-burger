import API from "../../utils/api";
import {
    AppThunk,
    TUserInfo
} from "../../utils/types";
import {
    TUserInfoResponse
} from "./user";
export const REGISTER_USER : 'REGISTER_USER' = 'REGISTER_USER';

export interface IRegisterUser {
    readonly type: typeof REGISTER_USER,
    readonly payload: TUserInfoResponse
}

export const registerUser = (user: TUserInfoResponse): IRegisterUser => ({
    type: REGISTER_USER,
    payload: user
})

export type TRegisterUserAction = IRegisterUser

export const getRegisterUser : AppThunk = (user : TUserInfo) => {
    return (dispatch) => {
        API.getRegisterRequest(user)
            .then((data) => {
                dispatch(registerUser(data));
            })
            .catch(console.warn)
    }
}
