import API from '../../utils/api'
import { AppThunk } from "../../utils/types";

export const GET_PASSWORD_SUCCESS : 'GET_PASSWORD_SUCCESS' = 'GET_PASSWORD_SUCCESS';

export interface IGetPasswordSuccess {
    readonly type: typeof GET_PASSWORD_SUCCESS,
    readonly payload: boolean
}
export type TForgotPasswordAction = IGetPasswordSuccess;
const getPasswordSuccess = (payload: boolean): IGetPasswordSuccess => ({
    type: GET_PASSWORD_SUCCESS,
    payload
})

export const getPasswordSuccessThunk : AppThunk = (email:string) => {
    return (dispatch) => {
        API.getPasswordResetRequest(email)
            .then(({ success }) => {
                dispatch(getPasswordSuccess(success));
            })
            .catch(console.warn);
    }
}
