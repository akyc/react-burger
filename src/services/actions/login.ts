import API from '../../utils/api'
import {
    deleteCookie,
    getCookie,
    setCookie
} from '../../utils/cookies'
import {
    AppDispatch,
    AppThunk,
    TUserInfo
} from "../../utils/types";
export const LOGIN_USER: 'LOGIN_USER' = 'LOGIN_USER';
export const LOGOUT_USER: 'LOGOUT_USER' = 'LOGOUT_USER';

export interface ILoginUser {
    readonly type: typeof LOGIN_USER,
    readonly payload: boolean
}

export interface ILogoutUser {
    readonly type: typeof LOGOUT_USER,
    readonly payload: boolean
}

export type TLoginAction =
    | ILoginUser
    | ILogoutUser

const loginUser = (payload: boolean): ILoginUser => ({
    type: LOGIN_USER,
    payload
});

const logoutUser = (payload: boolean): ILogoutUser => ({
    type: LOGOUT_USER,
    payload
});

export const getLoginUser:AppThunk = (user:TUserInfo) => {
    return (dispatch: AppDispatch) => {
            API.loginUserRequest(user)
            .then((data) => {
                const { success, refreshToken, accessToken } = data;
                if (success) {
                    sessionStorage
                        .setItem('login', JSON.stringify(true));
                    dispatch(loginUser(data));
                    setCookie('access', accessToken.split('Bearer ')[1]);
                    setCookie('refresh', refreshToken);
                }
            })
            .catch(console.warn)
    }
}

export const logoutUserThunk: AppThunk = () => {
    const token : string | undefined = getCookie('refresh')
    return (dispatch: AppDispatch) => {
        API.logoutUserRequest(token)
            .then((data) => {
                const { success } = data;
                if (success) {
                    sessionStorage
                        .removeItem('login');
                    dispatch(logoutUser(success));
                    deleteCookie('access')
                    deleteCookie('refresh')
                }
            })
            .catch(console.warn)
    }
}


