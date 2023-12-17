import {
    GET_ORDER_DETAILS_REQUEST,
    GET_ORDER_DETAILS_SUCCESS,
    GET_ORDER_DETAILS_ERROR,
    RESET_ORDER_DETAILS
} from "../actions/orderDetails";
import {
    TUnionAction
} from "../actions";

type TInitialState = {
    orderId: null | string,
    orderRequestError: null | string,
    orderError: boolean,
    orderRequest: boolean,
}

const initialState : TInitialState = {
    orderId: null,
    orderRequestError: null,
    orderError: false,
    orderRequest: false,

}
export function orderDetailsReducer(state : TInitialState = initialState, action: TUnionAction) : TInitialState {
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
                orderId: action.payload
            }
        case GET_ORDER_DETAILS_ERROR:
            return {
                ...initialState,
                orderRequest: false,
                orderError: true,
                orderRequestError: action.payload
            }
        case RESET_ORDER_DETAILS:
            return {
                ...initialState
            }
        default:
            return state
    }
}
