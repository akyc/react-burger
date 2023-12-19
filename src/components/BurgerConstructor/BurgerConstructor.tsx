import React, { useMemo, useState, FC } from 'react'
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../Modal/Modal'
import styles from './BurgerConstructor.module.css'
import OrderInfo from '../OrderDetails/OrderDetails'
import { useDispatch, useSelector } from "../../utils/constants"
import { nanoid } from "@reduxjs/toolkit"
import {
    getOrderId
} from "../../services/actions/orderDetails"
import {
    addBun,
    addIngredient,
    deleteIngredient,
    resetIngredient
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
    IIngredient
} from "../../utils/types";
import {
    getCookie
} from "../../utils/cookies";

const BurgerConstructor:FC = () => {
    const isUser = checkUserAuth()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {bun, ingredients} = useSelector(store => store.constructorBurger)
    const {orderId} = useSelector(store => store.orderDetails)
    const [isShowModal, setShowModal] = useState(false)
    const burger = useMemo(
        () => [...ingredients, bun, bun],
        [ingredients, bun]
    )
    const burgerTotalPrice = useMemo(
        () => ingredients.length && bun ? burger.reduce((a,c) => a + (c ? c.price : 0) , 0) : 0,
        [ingredients, bun, burger]
    )
    const addIngredientHandler = (ingredient: IIngredient ) => {
        ingredient = {
            ...ingredient,
            uid: nanoid(),
        }
        if(ingredient.type === 'bun'){
            dispatch(addBun(ingredient))
        } else {
            dispatch(addIngredient(ingredient))
        }
    }
    const [, drop] = useDrop(() => ({
        accept: 'item',
        drop: (item: IIngredient) => addIngredientHandler(item)
    }));
    const modalOpenHandler = () => {
        if (!isUser) {
            navigate(pageRoutes.login);
        }
        if(orderId){
            dispatch(resetIngredient())
        }
        const idsList = burger.map(el => el?._id)
        const access = getCookie('access')
        dispatch(getOrderId(idsList, access))
        setShowModal(true )
    }
    const modalCloseHandler = () => {
        if(orderId){
            dispatch(resetIngredient())
        }
        setShowModal(false )
    }
    const deleteIngredientHandler = (item: IIngredient) => {
        dispatch(deleteIngredient(item))
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
                {ingredients && ingredients.map((item,i) => <IngredientDraggable key={item.uid} index={i} item={item} id={item.uid} deleteIngredient={deleteIngredientHandler}/>)}
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
