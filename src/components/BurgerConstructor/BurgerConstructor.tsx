import React, { useMemo, useState } from 'react'
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
// @ts-ignore
const getConstructorItems = store => store.constructorBurger
// @ts-ignore
const getOrderDetails = store => store.orderDetails
const BurgerConstructor = () => {
    const login = useSelector(state => state.login.login) || JSON.parse(sessionStorage.getItem('login'))
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {bun, ingredients} = useSelector(getConstructorItems)
    const {orderId} = useSelector(getOrderDetails)
    const [isShowModal, setShowModal] = useState(false)
    const burger = useMemo(
        () => [...ingredients, bun, bun],
        [ingredients, bun]
    )
    const burgerTotalPrice = useMemo(
        () => ingredients.length && bun ? burger.reduce((a,c) => a + c.price, 0) : 0,
        [ingredients, bun, burger]
    )
    const addIngredient = ingredient => {
        ingredient = {
            ...ingredient,
            uid: nanoid(),
        }
        if(ingredient.type === 'bun'){
            dispatch({type: ADD_BUN, item: ingredient})
        } else {
            dispatch({type: ADD_INGREDIENT, item: ingredient})
        }

    }
    const [, drop] = useDrop(() => ({
        accept: 'item',
        drop: (item) => addIngredient(item)
    }));
    const modalOpenHandler = (e) => {
        if (!login) {
            navigate('/login');
        }
        if(orderId){
            dispatch({type: RESET_ORDER_DETAILS})
        }
        const idsList = burger.map(el => el._id)
        dispatch(getOrderId(idsList))
        setShowModal(true )
    }
    const modalCloseHandler = (e) => {
        if(orderId){
            dispatch({type: RESET_INGREDIENT})
        }
        setShowModal(false )
    }
    const deleteIngredient = (item) => {
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
                {ingredients && ingredients.map((item,i) => <IngredientDraggable key={item.uid} index={i} item={item} id={item.uid} deleteIngredient={deleteIngredient}/>)}
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
