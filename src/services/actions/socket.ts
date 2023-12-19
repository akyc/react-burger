import { TOrder } from '../../utils/types';

export const WS_CONNECTION_START = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED';
export const WS_GET_ORDERS = 'WS_GET_ORDERS';
export const WS_SEND_MESSAGE = 'WS_SEND_MESSAGE';
export const WS_USER_NAME_UPDATE = 'WS_USER_NAME_UPDATE';

export const wsActions: IWsActions = {
    wsInit: WS_CONNECTION_START,
    wsSendMessage: WS_SEND_MESSAGE,
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,
    onOrders: WS_GET_ORDERS
};

export interface IWsActions {
    readonly wsInit: typeof WS_CONNECTION_START,
    readonly wsSendMessage: typeof WS_SEND_MESSAGE,
    readonly onOpen: typeof WS_CONNECTION_SUCCESS,
    readonly onClose: typeof WS_CONNECTION_CLOSED,
    readonly onError: typeof WS_CONNECTION_ERROR,
    readonly onOrders: typeof WS_GET_ORDERS
}

export interface IWsConnectionStart {
    readonly type: typeof WS_CONNECTION_START
}

export interface IWsConnectionSuccess {
    readonly type: typeof WS_CONNECTION_SUCCESS
}
export interface IWsConnectionError {
    readonly type: typeof WS_CONNECTION_ERROR
}
export interface IWsConnectionClosed {
    readonly type: typeof WS_CONNECTION_CLOSED
}
export interface IWsGetOrders {
    readonly type: typeof WS_GET_ORDERS
    readonly payload: TOrderResponse
}
export interface IWsSendMessage {
    readonly type: typeof WS_SEND_MESSAGE
    readonly payload: string
}
export interface IWsUserNameUpdate {
    readonly type: typeof WS_USER_NAME_UPDATE
    readonly payload: string
}

export type TWsActions =
    | IWsConnectionStart
    | IWsConnectionSuccess
    | IWsConnectionError
    | IWsConnectionClosed
    | IWsGetOrders
    | IWsSendMessage
    | IWsUserNameUpdate

type TOrderResponse = {
    success: boolean,
    orders: TOrder[],
    total: number,
    totalToday: number
}
export const wsConnectionStart = (): IWsConnectionStart => ({
    type: WS_CONNECTION_START
})

export const wsConnectionSuccess = (): IWsConnectionSuccess => ({
    type: WS_CONNECTION_SUCCESS
})

export const wsConnectionError = (): IWsConnectionError => ({
    type: WS_CONNECTION_ERROR
})

export const wsConnectionClosed = (): IWsConnectionClosed => ({
    type: WS_CONNECTION_CLOSED
})

export const wsGetOrders = (payload: TOrderResponse): IWsGetOrders => ({
    type: WS_GET_ORDERS,
    payload
})

export const wsSendMessage = (message: string): IWsSendMessage => ({
    type: WS_SEND_MESSAGE,
    payload: message
})

export const wsUserNameUpdate = (userName: string): IWsUserNameUpdate => ({
        type: WS_USER_NAME_UPDATE,
        payload: userName
})
