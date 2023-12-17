import {
    IIngredient,
    TUserInfo
} from "./types";

const PATH: string = "https://norma.nomoreparties.space/api"

export const wsOrdersUrl: string = `wss://norma.nomoreparties.space/orders`;
export const wsAllOrdersUrl: string = 'wss://norma.nomoreparties.space/orders/all';


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
    storeOrder(ingredients: Array<string>) : Promise<any>{
        return fetch(`${PATH}/orders`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({ingredients})
            }).then(res => checkResponse(res))
    },
    loginUserRequest(user: TUserInfo): Promise<any> {
        const { email, password } = user;
        return fetch(`${PATH}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email,
              password
            })}).then(res => checkResponse(res))
    },
    logoutUserRequest(token: string | undefined): Promise<any> {
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
    getUserInfo(access: string | undefined) : Promise<any> {
        return fetch(`${PATH}/auth/user`, {
            headers: {
                authorization: 'Bearer ' + access,
                'Content-Type': 'application/json'
            }}).then(res => checkResponse(res))
    },
    patchUserInfo(user: TUserInfo, access: string) : Promise<any> {
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
    getRegisterRequest(user: TUserInfo) : Promise<any> {
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
    getPasswordResetRequest(email: string) : Promise<any> {
        return fetch(`${PATH}/password-reset`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email
            })
        }).then(res => checkResponse(res))
    },
    getPasswordRecoverRequest(password: string, token: string) : Promise<any> {
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

export const filterIngredients = (arr: string[], data: IIngredient[]) => arr.map(item => {
    return data.filter(i => i._id === item);
}).reduce((acc, item) => {
    return acc.concat(item)
})

export const calculatePrice = (arr: string[], data: IIngredient[]) => {
    return filterIngredients(arr, data).reduce((acc, item) => acc + item.price, 0)
}

export const includesIngredients = (data: IIngredient[], arr: string[]) => {
    return data.filter((item) => arr.includes(item._id));
}

export type TOptions = {
    month: 'long',
    day: 'numeric',
    timezone: 'Moscow',
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: "short",
}
export const getOrderDate = (date: string) => {
    const options: TOptions = {
        month: 'long',
        day: 'numeric',
        timezone: 'Moscow',
        hour: 'numeric',
        minute: 'numeric',
        timeZoneName: "short",
    };

    return new Date(Date.parse(date)).toLocaleString("ru", options)
}

export default API
