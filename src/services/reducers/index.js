import { combineReducers } from 'redux'
import { ingredientsReducer} from "./ingredients"
import { ingredientDetailsReducer } from "./ingredientsDetails"
import { orderDetailsReducer } from "./orderDetails"

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    ingredientDetails: ingredientDetailsReducer,
    orderDetails: orderDetailsReducer
})
