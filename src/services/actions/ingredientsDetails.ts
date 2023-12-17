import { IIngredient } from "../../utils/types";
export const GET_INGREDIENT_DETAILS : 'GET_INGREDIENT_DETAILS' = 'GET_INGREDIENT_DETAILS'

export interface IGetIngredientDetails {
    readonly type: typeof GET_INGREDIENT_DETAILS,
    readonly payload: IIngredient
}

export type TIngredientDetailsAction =
    | IGetIngredientDetails

export const getIngredientsDetails = (element: IIngredient): IGetIngredientDetails => ({
    type: GET_INGREDIENT_DETAILS,
    payload: element
})
