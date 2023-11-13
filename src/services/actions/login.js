import API from '../../utils/api'
import { getCookie, setCookie } from '../../utils/cookies'

export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

export const getLoginUser = (user) => {
    return function(dispatch) {
            API.loginUserRequest(user)
            .then((data) => {
                const { success, refreshToken, accessToken } = data;
                if (success) {
                    sessionStorage
                        .setItem('login', JSON.stringify(true));
                    dispatch({type: LOGIN_USER, data});
                    setCookie('access', accessToken.split('Bearer ')[1]);
                    setCookie('refresh', refreshToken);
                }
            })
            .catch(console.warn)
    }
}

export const logoutUserThunk = () => {
    const token = getCookie('refresh')
    return (dispatch) => {
        API.logoutUserRequest(token)
            .then((data) => {
                const { success } = data;
                if (success) {
                    dispatch({ type: LOGOUT_USER, data });
                }
            })
            .catch(console.warn)
    }
}


