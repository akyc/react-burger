import React, {
    FC,
    ForwardedRef,
    useState
} from 'react'
import {useSelector} from 'react-redux'
import styles from './IngredientsList.module.css'
import Ingredient from "../Ingredient/Ingredient";
import {
    IIngredient
} from "../../utils/types";

interface IIngredientsList {
    ingredients: IIngredient[];
    groupTitle: string;
    viewRef: ForwardedRef<HTMLDivElement>;
}
const IngredientsList: FC<IIngredientsList> = ({ ingredients, groupTitle, viewRef}) => {
    //@ts-ignore
    const  constructorBurger = useSelector(store => store.constructorBurger)

    return (
        <div>
            <p className='text text_type_main-medium'>{groupTitle}</p>
            <div className={`${styles.group} d-flex pt-6 pb-10 pl-4`} ref={viewRef}>
                {ingredients.map((item: IIngredient, i:number) => {
                    return (
                        <Ingredient key={i} item={item}/>
                    )
                })}
            </div>
        </div>
    )
}

export default IngredientsList
