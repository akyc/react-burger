import Api from "../../utils/api";

export const GET_ORDER_DETAILS_REQUEST = 'GET_ORDER_DETAILS_REQUEST';
export const GET_ORDER_DETAILS_SUCCESS = 'GET_ORDER_DETAILS_SUCCESS';
export const GET_ORDER_DETAILS_ERROR = 'GET_ORDER_DETAILS_ERROR';
export const RESET_ORDER_DETAILS = 'RESET_ORDER_DETAILS';

export const getOrderId = (ingredients) => {
    return function(dispatch) {
        dispatch({type: GET_ORDER_DETAILS_REQUEST})
        Api.storeOrder(ingredients).then(res => {
            if(res && res.success && res.order){
                dispatch({type: GET_ORDER_DETAILS_SUCCESS, id: res.order.number});
            }
        })
        .catch((error) => {
            dispatch({type: GET_ORDER_DETAILS_ERROR, error: error.status})
        })
    }
}
