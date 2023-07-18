import React from 'react'
import {useSelector} from "react-redux"
import styles from './IngredientDetails.module.css'
const IngredientDetails = () => {
    const { name, image_mobile, image_large, proteins, fat, calories, carbohydrates } = useSelector( store => store.ingredientDetails.ingredient)
    const nutrients = [
        { title: 'Калории, ккал', value: calories },
        { title: 'Белки, г', value: proteins },
        { title: 'Жиры, г', value: fat },
        { title: 'Углеводы, г', value: carbohydrates }
    ]
    return (
        <>
            <picture className='pl-4 pr-4 pb-4'>
                <source media='(min-width: 1024px)' src={image_large} />
                <source media='(max-width: 768px)' src={image_mobile} />
                <img src={image_large} alt={name} />
            </picture>
            <p className='text text_type_main-small pb-8'>{name}</p>
            <ul className={`${styles.information} d-flex`} >
                {nutrients.map(({ title, value }, i) => {
                    if (value !== undefined) {
                        return (
                            <li className='text text_type_main-default text_color_inactive' key={i}>
                                {title}<br />
                                <span className='text text_type_digits-default'>{value}</span>
                            </li>
                        )
                    }
                    return (null)
                })}
            </ul>
        </>
    )
}

export default IngredientDetails
