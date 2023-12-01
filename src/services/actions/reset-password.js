import API from '../../utils/api'

export const GET_RESET_PASSWORD_SUCCESS = 'GET_RESET_PASSWORD_SUCCESS'

export const getPasswordRecoverThunk = (password, token) => {
    return (dispatch) => {
        API.getPasswordRecoverRequest(password, token)
            .then(({ success}) => {
                dispatch({type: GET_RESET_PASSWORD_SUCCESS, success});
            })
            .catch(console.warn)
    }
}
