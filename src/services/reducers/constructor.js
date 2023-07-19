import {ADD_BUN, ADD_INGREDIENT, DELETE_INGREDIENT, MOVE_INGREDIENT} from "../actions/constructor";

const initialState = {
    ingredients:[],
    bun: null
}
export const constructorBurgerReducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_BUN:
            return {
                ...state,
                bun: action.item.type === 'bun' ? action.item : state.bun
            }
        case ADD_INGREDIENT:
            return {
                ...state,
                ingredients: action.item.type !== 'bun' ? [...state.ingredients, action.item] : [...state.ingredients]
            }
        case DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients.filter( el => el.uid !== action.item.uid)]
            }
        case MOVE_INGREDIENT:
            return {
                ...state,
                ingredients: [...action.item]
            }
        default:
            return state
    }
}
