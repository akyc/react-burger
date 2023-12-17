import React, { useMemo, useState, FC } from 'react'
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../Modal/Modal'
import styles from './BurgerConstructor.module.css'
import OrderInfo from '../OrderDetails/OrderDetails'
import { useDispatch, useSelector } from "react-redux"
import { nanoid } from "@reduxjs/toolkit"
import {
    getOrderId,
    RESET_ORDER_DETAILS
} from "../../services/actions/orderDetails"
import {
    ADD_BUN,
    ADD_INGREDIENT,
    DELETE_INGREDIENT,
    RESET_INGREDIENT
} from "../../services/actions/constructor"
import { useDrop } from "react-dnd"
import IngredientDraggable from "../IngredientDraggable/IngredientDraggable"
import {
    useNavigate
} from "react-router-dom";
import {
    checkUserAuth
} from "../../utils/api";
import {
    pageRoutes
} from "../../utils/constants";
import {
    IIngredient,
    IIngredientId
} from "../../utils/types";

const BurgerConstructor:FC = () => {
    const isUser = checkUserAuth()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // @ts-ignore
    const {bun, ingredients} = useSelector(store => store.constructorBurger)
    // @ts-ignore
    const {orderId} = useSelector(store => store.orderDetails)
    const [isShowModal, setShowModal] = useState(false)
    const burger: IIngredient[] = useMemo(
        () => [...ingredients, bun, bun],
        [ingredients, bun]
    )
    const burgerTotalPrice = useMemo(
        () => ingredients.length && bun ? burger.reduce((a,c) => a + c.price, 0) : 0,
        [ingredients, bun, burger]
    )
    const addIngredient = (ingredient: IIngredient ) => {
        ingredient = {
            ...ingredient,
            uid: nanoid(),
        }
        if(ingredient.type === 'bun'){
            //@ts-ignore
            dispatch({type: ADD_BUN, payload: ingredient})
        } else {
            //@ts-ignore
            dispatch({type: ADD_INGREDIENT, payload: ingredient})
        }
    }
    const [, drop] = useDrop(() => ({
        accept: 'item',
        drop: (item: IIngredient) => addIngredient(item)
    }));
    const modalOpenHandler = () => {
        if (!isUser) {
            navigate(pageRoutes.login);
        }
        if(orderId){
            //@ts-ignore
            dispatch({type: RESET_ORDER_DETAILS})
        }
        const idsList = burger.map(el => el._id)
        //@ts-ignore
        dispatch(getOrderId(idsList))
        setShowModal(true )
    }
    const modalCloseHandler = () => {
        if(orderId){
            dispatch({type: RESET_INGREDIENT})
        }
        setShowModal(false )
    }
    const deleteIngredient = (item: IIngredient) => {
        //@ts-ignore
        dispatch({type: DELETE_INGREDIENT, item})
    };

    return (
        <section className={`${styles.constructorContainer} mt-25 pl-4`} ref={drop}>
            <div className={`${styles.blockedElement} d-flex pb-3 pl-8`}>
                {bun &&
                    <ConstructorElement
                        type={'top'}
                        isLocked={true}
                        text={`${bun.name} (верх)`}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                }
            </div>
            <div className={`${styles.fillings} d-flex`}>
                {ingredients && ingredients.map((item: IIngredient ,i: number) => <IngredientDraggable key={item.uid} index={i} item={item} id={item.uid} deleteIngredient={deleteIngredient}/>)}
            </div>
            <div className={`${styles.blockedElement} d-flex pt-3 pl-8`}>
                {bun &&
                    <ConstructorElement
                        type={'bottom'}
                        isLocked={true}
                        text={`${bun.name} (низ)`}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                }
            </div>
            {burgerTotalPrice > 0 &&
                <div className={`${styles.total} d-flex mt-10 pr-4`}>
                    <div className='d-flex'>
                        <p className='text text_type_digits-default pr-2'>{burgerTotalPrice}</p> <CurrencyIcon type='primary' />
                    </div>
                    <Button htmlType='button' type='primary' size='medium' onClick={modalOpenHandler}>
                        Оформить заказ
                    </Button>
                    {isShowModal &&
                        <Modal onClose={modalCloseHandler}>
                            <OrderInfo/>
                        </Modal>
                    }
                </div>
            }
        </section>
    )
}

export default BurgerConstructor
