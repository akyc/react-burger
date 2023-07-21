import {GET_INGREDIENT_DETAILS} from "../actions/ingredientsDetails";

const initialState = {
    ingredient: {}
}

export function ingredientDetailsReducer(state = initialState, action){
    switch(action.type){
        case GET_INGREDIENT_DETAILS:
            return {
                ...state,
                ingredient: action.ingredient
            }
        default:
            return state
    }
}
