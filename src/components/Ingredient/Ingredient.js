import React from "react"
import { useDrag } from 'react-dnd'
import styles from '../IngredientsList/IngredientsList.module.css'
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const Ingredient = ({item}) => {
    const [, drag] = useDrag(() => ({
        type: 'item',
        item
    }))
    const { _id, name, price, image_mobile, image_large, image } = item
    return (
        <div className={`${styles.item} clickable`} ref={drag}>
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
}

export default Ingredient
