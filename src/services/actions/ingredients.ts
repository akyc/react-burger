import API from '../../utils/api'
import {
    AppThunk,
    IIngredient
} from "../../utils/types";

export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST'
export const GET_INGREDIENTS_SUCCESS:'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS'
export const GET_INGREDIENTS_ERROR:'GET_INGREDIENTS_ERROR' = 'GET_INGREDIENTS_ERROR'

export interface IGetIngredientsRequest {
    readonly type: typeof GET_INGREDIENTS_REQUEST
}
export interface IGetIngredientsSuccess {
    readonly type: typeof GET_INGREDIENTS_SUCCESS,
    readonly payload: Array<IIngredient>
}
export interface IGetIngredientsError {
    readonly type: typeof GET_INGREDIENTS_ERROR,
    readonly payload: string
}

export const getIngredientsRequest = ():IGetIngredientsRequest => ({
    type: GET_INGREDIENTS_REQUEST
})

export const getIngredientsSuccess = (items:Array<IIngredient>):IGetIngredientsSuccess => ({
    type: GET_INGREDIENTS_SUCCESS,
    payload: items
})

export const getIngredientsError = (status:string): IGetIngredientsError => ({
    type: GET_INGREDIENTS_ERROR,
    payload: status
})

export type TIngredientsAction =
    | IGetIngredientsSuccess
    | IGetIngredientsRequest
    | IGetIngredientsError

export const getIngredients: AppThunk = () => {
    return (dispatch) =>{
        dispatch(getIngredientsRequest())
        API.getIngredientsRequest().then(res => {
            if(res && res.success){
                dispatch(getIngredientsSuccess(res.data))
            }
        }).catch((error) => {
            dispatch(getIngredientsError(error.status))
        })
    }
}
