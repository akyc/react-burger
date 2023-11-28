import API from '../../utils/api'

export const GET_PASSWORD_SUCCESS = 'GET_PASSWORD_SUCCESS';

export const getPasswordSuccessThunk = (email) => {
    return function(dispatch) {
        API.getPasswordResetRequest(email)
            .then(({ success }) => {
                dispatch({type: GET_PASSWORD_SUCCESS, success});
            })
            .catch(console.warn);
    }
}
