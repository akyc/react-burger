import {
    TConstructorAction
} from './constructor'
import {
    TForgotPasswordAction
} from "./forgot-password";
import {
    TIngredientsAction
} from "./ingredients";
import {
    TIngredientDetailsAction
} from "./ingredientsDetails";
import {
    TLoginAction
} from "./login";
import {
    TOrderDetailsAction
} from "./orderDetails";
import {
    TRegisterUserAction
} from "./register";
import {
    TResetPasswordSuccessAction
} from "./reset-password";
import {
    TUserAction
} from "./user";
import {
    TTabsAction
} from "./tabs";



export type TUnionAction =
    TConstructorAction
    | TForgotPasswordAction
    | TIngredientsAction
    | TIngredientDetailsAction
    | TLoginAction
    | TOrderDetailsAction
    | TRegisterUserAction
    | TResetPasswordSuccessAction
    | TTabsAction
    | TUserAction
