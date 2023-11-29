
const PATH = "https://norma.nomoreparties.space/api"

const checkResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(res);
};

const API = {
    getIngredientsRequest() {
        return fetch(`${PATH}/ingredients`).then(res => checkResponse(res))
    },
    storeOrder(ingredients){
        return fetch(`${PATH}/orders`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({ingredients})
            }).then(res => checkResponse(res))
    },
    loginUserRequest(user) {
        const { email, password } = user;
        return fetch(`${PATH}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email,
              password
            })}).then(res => checkResponse(res))
    },
    logoutUserRequest(token) {
        return fetch(`${PATH}/auth/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token
            })
        }).then(res => checkResponse(res))
    },
    getUserInfo(access) {
        return fetch(`${PATH}/auth/user`, {
            headers: {
                authorization: 'Bearer ' + access,
                'Content-Type': 'application/json'
            }}).then(res => checkResponse(res))
    },
    patchUserInfo(user, access) {
        const {email, name, password} = user
        return fetch(`${PATH}/auth/user`, {
            method: 'PATCH',
            headers: {
                authorization: 'Bearer ' + access,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                name,
                password
            })
        }).then(res => checkResponse(res))
    },
    getRegisterRequest(user) {
        const { email, password, name } = user;
        return fetch(`${PATH}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                password,
                name
            })
        }).then(res => checkResponse(res))
    },
    getPasswordResetRequest(email){
        return fetch(`${PATH}/password-reset`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email
            })
        }).then(res => checkResponse(res))
    },
    getPasswordRecoverRequest(password, token){
        return fetch(`${PATH}/password-reset/reset`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                password,
                token
            })
        }).then(res => checkResponse(res))
    },
    refreshToken(token){
        fetch(`${PATH}/auth/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token
            })
        }).then(res => checkResponse(res)).catch(console.warn)
    }
}

export const checkUserAuth = () => {
    const sessionStorageLogin: string | null = sessionStorage.getItem('login')
    let login : string | null = null
    if(sessionStorageLogin) {
        login = JSON.parse(sessionStorageLogin);
    }
    return login
}
export default API
