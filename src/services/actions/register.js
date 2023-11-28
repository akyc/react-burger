import API from "../../utils/api";
export const REGISTER_USER = 'REGISTER_USER';

export const getRegisterUser = (user) => {
    return function(dispatch) {
        API.getRegisterRequest(user)
            .then((data) => {
                dispatch({type: REGISTER_USER, data});
            })
            .catch(console.warn)
    }
}
