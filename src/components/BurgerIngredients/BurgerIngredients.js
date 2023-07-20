import React, {useEffect, useRef} from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientsList from '../IngredientsList/IngredientsList'
import styles from './BurgerIngredients.module.css'
import { useSelector, useDispatch } from "react-redux"
import { useInView } from "react-intersection-observer"
import { SELECT_TABS } from "../../services/actions/tabs"
const BurgerIngredients = () => {
    const { ingredientsItems, ingredientGroups } = useSelector(store => store.ingredients)

    const dispatch = useDispatch()
    const current = useSelector(store => store.tabs.select)
    const setCurrent = (current) => {
        dispatch({type: SELECT_TABS, select: current})
    }

    const [bunsContainer , inViewBuns] = useInView({
        threshold: 0,
    });
    const [saucesContainer, inViewSauces] = useInView({
        threshold: 0,
    });
    const [mainsContainer, inViewMains] = useInView({
        threshold: 0,
    });
    useEffect(() => {
        if (inViewBuns) {
            setCurrent("bun");
        } else if (inViewSauces) {
            setCurrent("sauce");
        } else if (inViewMains) {
            setCurrent("main");
        }
    }, [inViewBuns, inViewSauces, inViewMains]);
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
                <IngredientsList ingredients={ingredientsItems.filter(({ type }) => type === 'bun')} groupTitle={'Булки'} viewRef={bunsContainer}/>
                <IngredientsList ingredients={ingredientsItems.filter(({ type }) => type === 'sauce')} groupTitle={'Соусы'} viewRef={saucesContainer}/>
                <IngredientsList ingredients={ingredientsItems.filter(({ type }) => type === 'main')} groupTitle={'Начинки'} viewRef={mainsContainer}/>
            </div>
        </section>
    )
}

export default BurgerIngredients
