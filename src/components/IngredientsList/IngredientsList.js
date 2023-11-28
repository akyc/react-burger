import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {useSelector} from 'react-redux'
import styles from './IngredientsList.module.css'
import { ingredientType } from '../../utils/props-types'
import Ingredient from "../Ingredient/Ingredient";

const getIngredientDetails = store => store.ingredientDetails

const IngredientsList = ({ ingredients, groupTitle, viewRef}) => {
    const  constructorBurger = useSelector(store => store.constructorBurger)

    return (
        <div>
            <p className='text text_type_main-medium'>{groupTitle}</p>
            <div className={`${styles.group} d-flex pt-6 pb-10 pl-4`} ref={viewRef}>
                {ingredients.map((item, i) => {
                    return (
                        <Ingredient key={i} item={item}/>
                    )
                })}
            </div>
        </div>
    )
}

IngredientsList.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientType).isRequired,
    groupTitle: PropTypes.string.isRequired
}

export default IngredientsList
