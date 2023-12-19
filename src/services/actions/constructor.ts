import { IIngredient } from '../../utils/types'
export const ADD_INGREDIENT: 'ADD_INGREDIENT' = 'ADD_INGREDIENT'
export const ADD_BUN: 'ADD_BUN' = 'ADD_BUN'
export const DELETE_INGREDIENT:'DELETE_INGREDIENT' = 'DELETE_INGREDIENT'
export const MOVE_INGREDIENT:'MOVE_INGREDIENT' = 'MOVE_INGREDIENT'
export const RESET_INGREDIENT: 'RESET_INGREDIENT' = 'RESET_INGREDIENT'

export interface IAddIngredient {
    readonly type: typeof ADD_INGREDIENT,
    readonly payload: IIngredient
}
export interface IAddBun {
    readonly type: typeof ADD_BUN,
    readonly payload: IIngredient
}
export interface IDeleteIngredient {
    readonly type: typeof DELETE_INGREDIENT,
    readonly payload: IIngredient
}
export interface IMoveIngredient {
    readonly type: typeof MOVE_INGREDIENT,
    readonly payload: {
        dragIndex: number
        hoverIndex: number
    }
}
export interface IResetIngredient {
    readonly type: typeof RESET_INGREDIENT,
}

export type TConstructorAction =
    | IAddIngredient
    | IAddBun
    | IDeleteIngredient
    | IMoveIngredient
    | IResetIngredient

export const addIngredient = (element: IIngredient): IAddIngredient => ({
    type: ADD_INGREDIENT,
    payload: element
});

export const addBun = (element: IIngredient): IAddBun => ({
    type: ADD_BUN,
    payload: element
});

export const deleteIngredient = (element: IIngredient): IDeleteIngredient => ({
    type: DELETE_INGREDIENT,
    payload: element
});

export const resetIngredient = (): IResetIngredient => ({
    type: RESET_INGREDIENT
});

export const moveIngredient = (dragIndex: number, hoverIndex: number): IMoveIngredient => ({
    type: MOVE_INGREDIENT,
    payload: {
        dragIndex,
        hoverIndex
    }
});

