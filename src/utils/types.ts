import { store } from '../services/store'
import { ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { TUnionAction} from "../services/actions";

export interface IIngredientId {
    _id: string;
}

export interface IIngredient extends IIngredientId {
    name: string;
    type: string;
    proteins: number;
    calories: number;
    carbohydrates: number;
    fat: number;
    image: string;
    image_large: string;
    image_mobile: string;
    price: number;
    __v?: number;
    uid: string;
}

export type TUserInfo = {
    name: string;
    email: string;
    password?: string;
};

export type TOrder = {
    _id: string,
    ingredients: Array<string>,
    status: string,
    name: string,
    createdAt: string,
    updatedAt: string,
    number: number
}

export interface IOrder {
    name: string;
    order: TOrder;
    success: boolean;
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
    ThunkAction<ReturnType, RootState, never, TUnionAction>
>;
