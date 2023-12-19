import API from '../../utils/api'
import {
    AppThunk
} from "../../utils/types";

export const GET_RESET_PASSWORD_SUCCESS : 'GET_RESET_PASSWORD_SUCCESS' = 'GET_RESET_PASSWORD_SUCCESS'

export interface IGetResetPasswordSuccess {
    readonly type: typeof GET_RESET_PASSWORD_SUCCESS,
    readonly payload: boolean
}
export const getResetPasswordSuccess = (status: boolean) : IGetResetPasswordSuccess => ({
    type: GET_RESET_PASSWORD_SUCCESS,
    payload: status
})

export type TResetPasswordSuccessAction = IGetResetPasswordSuccess

export const getPasswordRecoverThunk : AppThunk = (password: string, token: string) => {
    return (dispatch) => {
        API.getPasswordRecoverRequest(password, token)
            .then(({success}) => {
                dispatch(getResetPasswordSuccess(success));
            })
            .catch(console.warn)
    }
}
