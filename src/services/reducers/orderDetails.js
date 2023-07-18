import {GET_ORDER_DETAILS_REQUEST, GET_ORDER_DETAILS_SUCCESS, GET_ORDER_DETAILS_ERROR} from "../actions/orderDetails";
const initialState = {
    orderId: null,
    orderRequestError: null,
    orderError: false,
    orderRequest: false,

}
export function orderDetailsReducer(state=initialState, action){
    switch(action.type){
        case GET_ORDER_DETAILS_REQUEST:
            return {
                ...state,
                orderRequest: true
            }
        case GET_ORDER_DETAILS_SUCCESS:
            return {
                ...state,
                orderRequest: false,
                orderRequestError: null,
                orderError: false,
                orderId: action.id
            }
        case GET_ORDER_DETAILS_ERROR:
            return {
                ...initialState,
                orderRequest: false,
                orderError: true,
                orderRequestError: action.error
            }
        default:
            return state
    }
}
