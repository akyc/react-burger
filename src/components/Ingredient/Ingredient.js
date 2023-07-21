import React from "react"
import { useDrag } from 'react-dnd'
import styles from '../IngredientsList/IngredientsList.module.css'
import {
    Counter,
    CurrencyIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
    useSelector
} from "react-redux";

const Ingredient = ({item, modalOpenHandler}) => {
    const { _id, name, price, image_mobile, image_large, image } = item
    const {ingredients, bun} = useSelector(store => store.constructorBurger)
    const amount = [...ingredients, bun, bun].filter( el => el?._id === _id).length
    const [, drag] = useDrag(() => ({
        type: 'item',
        item
    }))


    return (
        <div className={`${styles.item} clickable`} ref={drag} onClick={(e) => modalOpenHandler(e,item)}>
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
            {!!amount && <Counter count={amount} size='default' extraClass='m-1' />}
         </div>
    )
}

export default Ingredient
