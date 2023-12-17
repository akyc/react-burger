import { combineReducers } from 'redux'
import { ingredientsReducer} from "./ingredients"
import { ingredientDetailsReducer } from "./ingredientsDetails"
import { orderDetailsReducer } from "./orderDetails"
import { constructorBurgerReducer } from "./constructor"
import { selectTabsReducer } from "./tabs"
import { registerUserReducer } from './register'
import { loginUserReducer } from './login'
import { getUserInfoReducer } from './user'
import { resetPasswordReducer } from './forgot-password'
import { recoverPasswordReducer } from './reset-password'
import {
    socketReduser
} from "./socket";
import {
    userSocketReducer
} from "./user-socket";

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    ingredientDetails: ingredientDetailsReducer,
    orderDetails: orderDetailsReducer,
    constructorBurger: constructorBurgerReducer,
    tabs: selectTabsReducer,
    user: registerUserReducer,
    login: loginUserReducer,
    info: getUserInfoReducer,
    resetPassword: resetPasswordReducer,
    recoverPassword: recoverPasswordReducer,
    socket: socketReduser,
    userOrders: userSocketReducer
})
