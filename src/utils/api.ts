import {
    IIngredient,
    TUserInfo
} from "./types";

const PATH = "https://norma.nomoreparties.space/api"

type TServerResponse<T> = {
    success: boolean
} & T;

type TRefreshResponse = TServerResponse<{
    refreshToken: string;
    accessToken: string;
}>;

type TIngredientsResponse = TServerResponse<{
    data: IIngredient[]
}>
const checkResponse = <T>(res: Response): Promise<T> => {
    return res.ok ? res.json() : Promise.reject(res);
};

const API = {
    getIngredientsRequest(): Promise<TIngredientsResponse> {
        return fetch(`${PATH}/ingredients`).then(res => checkResponse<TIngredientsResponse>(res))
    },
    storeOrder(ingredients: Array<string>){
        return fetch(`${PATH}/orders`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({ingredients})
            }).then(res => checkResponse(res))
    },
    loginUserRequest(user: TUserInfo) {
        const { email, password } = user;
        return fetch(`${PATH}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email,
              password
            })}).then(res => checkResponse(res))
    },
    logoutUserRequest(token: string) {
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
    getUserInfo(access: string) {
        return fetch(`${PATH}/auth/user`, {
            headers: {
                authorization: 'Bearer ' + access,
                'Content-Type': 'application/json'
            }}).then(res => checkResponse(res))
    },
    patchUserInfo(user: TUserInfo, access: string) {
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
    getRegisterRequest(user: TUserInfo) {
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
    getPasswordResetRequest(email: string){
        return fetch(`${PATH}/password-reset`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email
            })
        }).then(res => checkResponse(res))
    },
    getPasswordRecoverRequest(password: string, token: string){
        return fetch(`${PATH}/password-reset/reset`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                password,
                token
            })
        }).then(res => checkResponse(res))
    },
    refreshToken(token: string): Promise<TRefreshResponse>{
        return fetch(`${PATH}/auth/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token
            })
        }).then(res => checkResponse<TRefreshResponse>(res))
    }
}

export const checkUserAuth = ():boolean => {
    const sessionStorageLogin = sessionStorage.getItem('login')
    let login : boolean = false
    if(sessionStorageLogin) {
        login = JSON.parse(sessionStorageLogin);
    }
    return Boolean(login)
}
export default API
