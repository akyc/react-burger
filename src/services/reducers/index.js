import { combineReducers } from 'redux'
import { ingredientsReducer} from "./ingredients"
import { ingredientDetailsReducer } from "./ingredientsDetails"
import { orderDetailsReducer } from "./orderDetails"
import { constructorBurgerReducer } from "./constructor"

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    ingredientDetails: ingredientDetailsReducer,
    orderDetails: orderDetailsReducer,
    constructorBurger: constructorBurgerReducer
})
