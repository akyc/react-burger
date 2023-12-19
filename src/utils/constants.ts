import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook
} from 'react-redux';
import { RootState } from './types';
import { ThunkDispatch } from 'redux-thunk';
import { TUnionAction } from '../services/actions';
export enum pageRoutes {
    main = '/',
    register = '/register',
    login = '/login',
    profile = '/profile',
    orderId = '/profile/orders/:id',
    forgotPassword = '/forgot-password',
    resetPassword = '/reset-password',
    ingredients = '/ingredients/',
    ingredientsId = 'ingredients/:id',
    orders = '/orders',
    feed = '/feed/',
    feedId = '/feed/:id',
    notFound = '*',
}

export const useDispatch = dispatchHook<ThunkDispatch<RootState, never, TUnionAction>>;

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
