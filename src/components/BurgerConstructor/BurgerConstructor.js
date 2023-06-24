import React from 'react'
import PropTypes from 'prop-types'
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './BurgerConstructor.module.css'

const BurgerConstructor = ({ selectedIngredients }) => {
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
                <Button htmlType='button' type='primary' size='medium'>
                    Оформить заказ
                </Button>
            </div>
        </section>
    )
}

BurgerConstructor.propTypes = {
    selectedIngredients: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.number,
        image: PropTypes.string,
    })).isRequired
}

export default BurgerConstructor