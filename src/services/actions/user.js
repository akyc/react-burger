import API from "../../utils/api";
import {
    getCookie
} from "../../utils/cookies";
export const GET_USER_INFO = 'GET_USER_INFO';
export const PATCH_USER_INFO = 'PATCH_USER_INFO';

export const getUserInfoThunk = () => {
    const access = getCookie('access')

    return function(dispatch) {
        API.getUserInfo(access)
            .then((data) => {
                const { success } = data;
                if (success) {
                    dispatch({type: GET_USER_INFO, data});
                }
            })
            .catch((err) => {
                if (err) {
                    const refresh = getCookie('refresh')
                    API.refreshToken(refresh)
                }
            })
    }
}

export const patchUserInfoThunk = (user,access) => {
    return function(dispatch) {
        API.patchUserInfo(user, access)
            .then((data) => {
                const { success } = data;
                if (success) {
                    dispatch({type: PATCH_USER_INFO, data});
                }
            })
            .catch((err) => {
                if (err) {
                    const refresh = getCookie('refresh')
                    API.refreshToken(refresh)
                }
            })
    }
}
