import API from "../../utils/api";
import {
    getCookie
} from "../../utils/cookies";
import {
    AppThunk,
    TUserInfo
} from "../../utils/types";
export const GET_USER_INFO : 'GET_USER_INFO' = 'GET_USER_INFO';
export const PATCH_USER_INFO : 'PATCH_USER_INFO' = 'PATCH_USER_INFO';

export type TUserInfoResponse = {
    success: boolean,
    user: TUserInfo
}
export interface IGetUserInfo {
    readonly type: typeof GET_USER_INFO,
    readonly payload: TUserInfoResponse
}

export interface IPatchUserINfo {
    readonly type: typeof PATCH_USER_INFO,
    readonly payload: TUserInfoResponse
}

export const getUserInfo = (payload: TUserInfoResponse): IGetUserInfo => ({
    type: GET_USER_INFO,
    payload
})

export const patchUserInfo = (payload: TUserInfoResponse) : IPatchUserINfo => ({
    type: PATCH_USER_INFO,
    payload
})

export type TUserAction =
    IGetUserInfo
    | IPatchUserINfo

export const getUserInfoThunk : AppThunk= () => {
    const access = getCookie('access')
    return (dispatch) => {
        API.getUserInfo(access)
            .then((data) => {
                const { success } = data;
                if (success) {
                    dispatch(getUserInfo(data));
                }
            })
            .catch((err) =>{
                err.json().then((error: {['message']: string})  => {
                    if (error.message === "jwt expired") {
                        const refresh : string | undefined = getCookie('refresh')
                        if(refresh) {
                            API.refreshToken(refresh)
                        }
                    }
                })
            })
    }
}

export const patchUserInfoThunk : AppThunk = (user,access) => {
    return (dispatch) => {
        API.patchUserInfo(user, access)
            .then((data) => {
                const { success } = data;
                if (success) {
                    dispatch(patchUserInfo(data));
                }
            })
            .catch((err) => {
                if (err) {
                    const refresh : string | undefined = getCookie('refresh')
                    if(refresh) {
                        API.refreshToken(refresh)
                    }
                }
            })
    }
}
