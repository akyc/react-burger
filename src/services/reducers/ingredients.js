import {GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_FAILED, GET_INGREDIENTS_SUCCESS} from "../actions/ingredients";

const initialState = {
    ingredientsItems: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
    ingredientsRequestError: null
}
export const ingredientsReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_INGREDIENTS_REQUEST:
            return {
            ...state,
                ingredientsRequest: true,
            }
        case GET_INGREDIENTS_SUCCESS:
            return {
                ...state,
                ingredientsFailed: false,
                ingredientsRequest: false,
                ingredientsItems: [...action.items]
            }
        case GET_INGREDIENTS_FAILED:
            return {
                ...state,
                ingredientsRequest: false,
                ingredientsFailed: true,
                ingredientsRequestError: action.error
            }
        default:
            return state
    }
}
