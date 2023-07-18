import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../Modal/Modal'
import styles from './BurgerConstructor.module.css'
import OrderInfo from '../OrderDetails/OrderDetails'
import {
    useDispatch,
    useSelector
} from "react-redux"
import { getOrderId } from "../../services/actions/orderDetails";

const BurgerConstructor = () => {
    const dispatch = useDispatch()
    const selectedIngredients = useSelector(store => store.ingredients.ingredientsItems)
    const [isShowModal, setShowModal] = useState(false)
    const modalOpenHandler = (e) => {
        dispatch(getOrderId(['643d69a5c3f7b9001cfa093c','643d69a5c3f7b9001cfa0942']))
        setShowModal(true )
    }
    const modalCloseHandler = (e) => {
        setShowModal(false )
    }
    return (
        <section className={`${styles.constructorContainer} mt-25 pl-4`}>
            <div className={`${styles.blockedElement} d-flex pb-3 pl-8`}>
                {selectedIngredients.slice(0, 1).map(({ _id, name, price, image }) => {
                    return (
                        <ConstructorElement
                            type={'top'}
                            isLocked={true}
                            text={`${name} (верх)`}
                            price={price}
                            thumbnail={image}
                            key={_id}
                        />
                    )
                })}
            </div>
            <div className={`${styles.fillings} d-flex`}>
                {selectedIngredients.map(({ _id, name, price, image }) => {
                    return (
                        <div className={`${styles.draggableElement} d-flex`} key={_id}>
                            <DragIcon type='primary' />
                            <ConstructorElement
                                isLocked={false}
                                text={name}
                                price={price}
                                thumbnail={image}
                            />
                        </div>
                    )
                })}
            </div>
            <div className={`${styles.blockedElement} d-flex pt-3 pl-8`}>
                {selectedIngredients.slice(0, 1).map(({ _id, name, price, image }) => {
                    return (
                        <ConstructorElement
                            type={'bottom'}
                            isLocked={true}
                            text={`${name} (низ)`}
                            price={price}
                            thumbnail={image}
                            key={_id}
                        />
                    )
                })}
            </div>
            <div className={`${styles.total} d-flex mt-10 pr-4`}>
                <div className='d-flex'>
                    <p className='text text_type_digits-default pr-2'>610</p> <CurrencyIcon type='primary' />
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
        </section>
    )
}

export default BurgerConstructor
