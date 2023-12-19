import React, { FC, ForwardedRef } from 'react'
import {useSelector} from '../../utils/constants'
import styles from './IngredientsList.module.css'
import Ingredient from "../Ingredient/Ingredient"
import { IIngredient } from "../../utils/types"

interface IIngredientsList {
    ingredients: IIngredient[];
    groupTitle: string;
    scrollRef: ForwardedRef<HTMLDivElement>;
    viewRef: ForwardedRef<HTMLDivElement>;
}
const IngredientsList: FC<IIngredientsList> = ({ ingredients, groupTitle, scrollRef, viewRef}) => {

    const  constructorBurger = useSelector(store => store.constructorBurger)

    return (
        <div ref={scrollRef}>
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

export default IngredientsList
