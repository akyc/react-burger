import {
    ADD_BUN,
    ADD_INGREDIENT,
    DELETE_INGREDIENT,
    MOVE_INGREDIENT,
    RESET_INGREDIENT
} from "../actions/constructor";
import {
    IIngredient
} from "../../utils/types";
import {
    TUnionAction
} from "../actions";
type TInitialState = {
    ingredients: IIngredient[];
    bun: IIngredient | null
}

const initialState: TInitialState = {
    ingredients: [],
    bun: null
}

export const constructorBurgerReducer = (state :TInitialState = initialState, action: TUnionAction): TInitialState => {
    const moveIngredient = (dragIndex : number, hoverIndex : number): IIngredient[] => {
        const dragIngredient :IIngredient = state.ingredients[dragIndex]
        const newIngredients : IIngredient[] = [...state.ingredients]
        newIngredients.splice(dragIndex, 1)
        newIngredients.splice(hoverIndex, 0, dragIngredient)
        return newIngredients
    }
    switch(action.type){
        case ADD_BUN:
            return {
                ...state,
                bun: action.payload.type === 'bun' ? action.payload : state.bun
            }
        case ADD_INGREDIENT:
            return {
                ...state,
                ingredients: action.payload.type !== 'bun' ? [...state.ingredients, action.payload] : [...state.ingredients]
            }
        case DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients.filter( el => el.uid !== action.payload.uid)]
            }
        case MOVE_INGREDIENT:
            return {
                ...state,
                ingredients: [...moveIngredient(action.payload.dragIndex, action.payload.hoverIndex)]
            }
        case RESET_INGREDIENT:
            return {
                ...initialState
            }
        default:
            return state
    }
}
