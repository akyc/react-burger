import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {useSelector, useDispatch} from 'react-redux'
import {getIngredientsDetails} from "../../services/actions/ingredientsDetails"
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './IngredientsList.module.css'
import Modal from '../Modal/Modal'
import IngredientDetails from '../IngredientDetails/IngredientDetails'
import { ingredientType } from '../../utils/props-types'


const IngredientsList = ({ ingredients, groupTitle }) => {
    const dispatch = useDispatch()
    const {ingredient} = useSelector(store => store.ingredientDetails)
    const [isShowModal, setShowModal] = useState(false)
    const modalOpenHandler = (e, item) => {
        dispatch(getIngredientsDetails(item))
        setShowModal(true)
    }
    const modalCloseHandler = (e) => {
        dispatch(getIngredientsDetails({}))
        setShowModal(false)
    }
    return (
        <div>
            <p className='text text_type_main-medium'>{groupTitle}</p>
            <div className={`${styles.group} d-flex pt-6 pb-10 pl-4`}>
                {ingredients.map((item) => {
                    const { _id, name, price, image_mobile, image_large, image } = item
                    return (
                        <div key={_id} className={`${styles.item} clickable`} onClick={(e) => modalOpenHandler(e, item)}>
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
                {isShowModal && ingredient &&
                    <Modal header='Детали ингредиента' onClose={modalCloseHandler}>
                        <IngredientDetails />
                    </Modal>
                }
            </div>
        </div>
    )
}

IngredientsList.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientType).isRequired,
    groupTitle: PropTypes.string.isRequired
}

export default IngredientsList
