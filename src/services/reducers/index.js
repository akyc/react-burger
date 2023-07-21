import { combineReducers } from 'redux'
import { ingredientsReducer} from "./ingredients"
import { ingredientDetailsReducer } from "./ingredientsDetails"
import { orderDetailsReducer } from "./orderDetails"
import { constructorBurgerReducer } from "./constructor"
import { selectTabsReducer } from "./tabs"

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    ingredientDetails: ingredientDetailsReducer,
    orderDetails: orderDetailsReducer,
    constructorBurger: constructorBurgerReducer,
    tabs: selectTabsReducer
})
