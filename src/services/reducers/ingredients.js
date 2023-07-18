import {GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_ERROR, GET_INGREDIENTS_SUCCESS} from "../actions/ingredients";

const initialState = {
    ingredientsItems: [],
    ingredientsRequest: false,
    ingredientsError: false,
    ingredientsRequestError: null,
    ingredientGroups: [
        { name: 'bun', title: 'Булки' },
        { name: 'sauce', title: 'Соусы' },
        { name: 'main', title: 'Начинки' }
    ]
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
                ingredientsError: false,
                ingredientsRequest: false,
                ingredientsRequestError: null,
                ingredientsItems: [...action.items]
            }
        case GET_INGREDIENTS_ERROR:
            return {
                ...initialState,
                ingredientsRequest: false,
                ingredientsError: true,
                ingredientsRequestError: action.error
            }
        default:
            return state
    }
}
