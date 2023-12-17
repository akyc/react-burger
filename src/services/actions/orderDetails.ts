import Api from "../../utils/api";
import {
    AppThunk,
    IIngredient
} from "../../utils/types";

export const GET_ORDER_DETAILS_REQUEST : 'GET_ORDER_DETAILS_REQUEST' = 'GET_ORDER_DETAILS_REQUEST';
export const GET_ORDER_DETAILS_SUCCESS : 'GET_ORDER_DETAILS_SUCCESS' = 'GET_ORDER_DETAILS_SUCCESS';
export const GET_ORDER_DETAILS_ERROR : 'GET_ORDER_DETAILS_ERROR' = 'GET_ORDER_DETAILS_ERROR';
export const RESET_ORDER_DETAILS : 'RESET_ORDER_DETAILS' = 'RESET_ORDER_DETAILS';

export interface IGetOrderDetailsRequest {
    readonly type: typeof GET_ORDER_DETAILS_REQUEST
}

export interface IGetOrderDetailsSuccess {
    readonly type: typeof GET_ORDER_DETAILS_SUCCESS,
    readonly payload: string
}
export interface IGetOrderDetailsError {
    readonly type: typeof GET_ORDER_DETAILS_ERROR,
    readonly payload: string
}
export interface IResetOrderDetails {
    readonly type: typeof RESET_ORDER_DETAILS
}

export type TOrderDetailsAction =
    | IGetOrderDetailsRequest
    | IGetOrderDetailsSuccess
    | IGetOrderDetailsError
    | IResetOrderDetails

export const getOrderDetailsRequest = (): IGetOrderDetailsRequest => ({
    type: GET_ORDER_DETAILS_REQUEST
})

export const getOrderDetailsSuccess = (id: string): IGetOrderDetailsSuccess => ({
    type: GET_ORDER_DETAILS_SUCCESS,
    payload: id
});
 export const getOrderDetailsError = (status: string) : IGetOrderDetailsError => ({
     type: GET_ORDER_DETAILS_ERROR,
     payload: status
 })
export const resetOrderDetails = (): IResetOrderDetails => ({
    type: RESET_ORDER_DETAILS,
})

export const getOrderId : AppThunk = (ingredients : Array<string>) => {
    return (dispatch) =>  {
        dispatch(getOrderDetailsRequest())
        Api.storeOrder(ingredients).then(res => {
            if(res && res.success && res.order){
                dispatch(getOrderDetailsSuccess(res.order.number));
            }
        })
        .catch((error) => {
            dispatch(getOrderDetailsError(error.status))
        })
    }
}
