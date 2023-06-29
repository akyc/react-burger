import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './IngredientsList.module.css'
import Modal from '../Modal/Modal'
import IngredientDetails from '../IngredientDetails/IngredientDetails'

const IngredientsList = ({ ingredients, groupTitle }) => {
    const [state, setState] = useState({
        showModal: false,
        showInfoIngredient: null
    })
    const modalOpenHandler = (e, ingredient) => {
        setState({ showModal: true, showInfoIngredient: ingredient })
    }
    const modalCloseHandler = (e) => {
        setState({ showModal: false, showInfoIngredient: null })
    }
    return (
        <div>
            <p className='text text_type_main-medium'>{groupTitle}</p>
            <div className={`${styles.group} d-flex pt-6 pb-10 pl-4`}>
                {ingredients.map((ingredient) => {
                    const { _id, name, price, image_mobile, image_large, image } = ingredient
                    return (
                        <div key={_id} className={`${styles.item} clickable`} onClick={(e) => modalOpenHandler(e, ingredient)}>
                            <picture className='pl-4 pr-4 pb-4'>
                                <source media='(min-width: 1024px)' src={image_large} />
                                <source media='(max-width: 768px)' src={image_mobile} />
                                <img src={image} alt={name} />
                            </picture>
                            <div className={`${styles.cost} text text_type_digits-default d-flex pt-1 pb-1`}>
                                {price} <CurrencyIcon type='primary' />
                            </div>
                            <p className='text text_type_main-default text-center'>
                                {name}
                            </p>
                        </div>
                    )
                })}
                {state.showModal && state.showInfoIngredient &&
                    <Modal header='Детали ингредиента' onClose={modalCloseHandler}>
                        <IngredientDetails ingredient={state.showInfoIngredient} />
                    </Modal>
                }
            </div>
        </div>
    )
}

IngredientsList.propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.number,
        image_mobile: PropTypes.string,
        image_large: PropTypes.string,
        image: PropTypes.string
    })).isRequired,
    groupTitle: PropTypes.string.isRequired
}

export default IngredientsList