import React from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientsList from '../IngredientsList/IngredientsList'
import styles from './BurgerIngredients.module.css'
import { useSelector } from "react-redux"
const BurgerIngredients = () => {
    const { ingredientsItems, ingredientGroups } = useSelector(store => store.ingredients)
    const [current, setCurrent] = React.useState(ingredientGroups[0].name)

    return (
        <section className={styles.ingredientsContainer}>
            <p className='text text_type_main-large pt-10 pb-5'>
                Соберите бургер
            </p>
            <div className={`${styles.tabsContainer} pb-10`}>
                {ingredientGroups.map(({ name, title }, i) => {
                    return (
                        <Tab value={name} active={current === name} onClick={setCurrent} key={i}>
                            {title}
                        </Tab>
                    )
                })}
            </div>
            <div className={styles.ingredientsListContainer}>
                {ingredientGroups.map(({ name, title }, i) => {
                    const actualIngredients = ingredientsItems.filter(({ type }) => type === name)
                    return (
                        <IngredientsList ingredients={actualIngredients} groupTitle={title} key={i} />
                    )
                })}
            </div>
        </section>
    )
}

export default BurgerIngredients
