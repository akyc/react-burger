import {GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_ERROR, GET_INGREDIENTS_SUCCESS} from "../actions/ingredients";
import {
    IIngredient
} from "../../utils/types";
import {
    TUnionAction
} from "../actions";

type TInitialState = {
    ingredientsItems: IIngredient[];
    ingredientsRequest: boolean,
    ingredientsError: boolean,
    ingredientsRequestError: string | null,
    ingredientGroups: {['name'] : 'bun' | 'sauce' | 'main', ['title'] : 'Булки' | 'Соусы' | 'Начинки'}[]
}

const initialState : TInitialState = {
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
export const ingredientsReducer = (state = initialState, action: TUnionAction) => {
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
                ingredientsItems: [...action.payload]
            }
        case GET_INGREDIENTS_ERROR:
            return {
                ...initialState,
                ingredientsRequest: false,
                ingredientsError: true,
                ingredientsRequestError: action.payload
            }
        default:
            return state
    }
}
