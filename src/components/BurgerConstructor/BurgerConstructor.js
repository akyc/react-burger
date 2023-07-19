import React, {
    useRef,
    useState
} from 'react'
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../Modal/Modal'
import styles from './BurgerConstructor.module.css'
import OrderInfo from '../OrderDetails/OrderDetails'
import { useDispatch, useSelector } from "react-redux"
import { nanoid } from "@reduxjs/toolkit"
import { getOrderId } from "../../services/actions/orderDetails"
import {
    ADD_BUN,
    ADD_INGREDIENT,
    DELETE_INGREDIENT,
    MOVE_INGREDIENT
} from "../../services/actions/constructor"
import {
    useDrag,
    useDrop
} from "react-dnd"
import IngredientDraggable
    from "../IngredientDraggable/IngredientDraggable";

const BurgerConstructor = () => {
    const dispatch = useDispatch()
    const {bun, ingredients} = useSelector(store => store.constructorBurger)
    const [isShowModal, setShowModal] = useState(false)
    const burger = [...ingredients, bun, bun]
    const burgerTotalPrice = ingredients.length && bun ? burger.reduce((a,c) => a + c.price, 0) : 0
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
        const idsList = burger.map(el => el._id)
        dispatch(getOrderId(idsList))
        setShowModal(true )
    }
    const modalCloseHandler = (e) => {
        setShowModal(false )
    }
    const deleteIngredient = (item) => {
        dispatch({type: DELETE_INGREDIENT, item})
    };

    const moveIngredient = (dragIndex, hoverIndex) => {
        const dragIngredient = ingredients[dragIndex]
        const newIngredients = [...ingredients]
        newIngredients.splice(dragIndex, 1)
        newIngredients.splice(hoverIndex, 0, dragIngredient)
        dispatch({type: MOVE_INGREDIENT, item: newIngredients})
    }

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
                {ingredients && ingredients.map((item,i) => <IngredientDraggable key={item.uid} index={i} item={item} deleteIngredient={deleteIngredient} moveIngredient={moveIngredient}/>)}
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
