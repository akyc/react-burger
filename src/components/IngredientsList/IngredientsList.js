import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {useSelector, useDispatch} from 'react-redux'
import {getIngredientsDetails} from "../../services/actions/ingredientsDetails"
import styles from './IngredientsList.module.css'
import Modal from '../Modal/Modal'
import IngredientDetails from '../IngredientDetails/IngredientDetails'
import { ingredientType } from '../../utils/props-types'
import Ingredient from "../Ingredient/Ingredient";

const getIngredientDetails = store => store.ingredientDetails

const IngredientsList = ({ ingredients, groupTitle, viewRef}) => {
    const dispatch = useDispatch()
    const {ingredient} = useSelector(getIngredientDetails)
    const  constructorBurger = useSelector(store => store.constructorBurger)
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
            <div className={`${styles.group} d-flex pt-6 pb-10 pl-4`} ref={viewRef}>
                {ingredients.map((item, i) => {
                    return (
                        <Ingredient key={i} item={item} modalOpenHandler={modalOpenHandler}/>
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
