import {GET_INGREDIENT_DETAILS} from "../actions/ingredientsDetails";
import {
    TUnionAction
} from "../actions";
import {
    IIngredient
} from "../../utils/types";

type TInitialState = {
    ingredient: IIngredient | {}
}

const initialState : TInitialState = {
    ingredient: {}
}

export function ingredientDetailsReducer(state = initialState, action : TUnionAction) : TInitialState{
    switch(action.type){
        case GET_INGREDIENT_DETAILS:
            return {
                ...state,
                ingredient: action.payload
            }
        default:
            return state
    }
}
