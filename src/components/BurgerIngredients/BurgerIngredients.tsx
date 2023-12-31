import React, {useEffect, useMemo} from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientsList from '../IngredientsList/IngredientsList'
import styles from './BurgerIngredients.module.css'
import { useSelector, useDispatch } from "react-redux"
import { useInView } from "react-intersection-observer"
import { SELECT_TABS } from "../../services/actions/tabs"
import {
    IIngredient
} from "../../utils/types";
//@ts-ignore
const getIngredients = store => store.ingredients
//@ts-ignore
const getCurrentTab = store => store.tabs.select
const BurgerIngredients = () => {
    const { ingredientsItems, ingredientGroups } = useSelector(getIngredients)
    const current = useSelector(getCurrentTab)
    const dispatch = useDispatch()
    const setCurrent = (current:string) => {
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

    const buns = useMemo(
        ():IIngredient[] => ingredientsItems.filter((item:IIngredient) => item.type === "bun"),
        [ingredientsItems]
    );

    const sauces = useMemo(
        ():IIngredient[] => ingredientsItems.filter((item:IIngredient) => item.type === "sauce"),
        [ingredientsItems]
    );

    const mains = useMemo(
        ():IIngredient[] => ingredientsItems.filter((item:IIngredient) => item.type === "main"),
        [ingredientsItems]
    );
    return (
        <section className={styles.ingredientsContainer}>
            <p className='text text_type_main-large pt-10 pb-5'>
                Соберите бургер
            </p>
            <div className={`${styles.tabsContainer} pb-10`}>
                {ingredientGroups.map(({ name, title }: {[key: string]: string}, i: number) => {
                    return (
                        <Tab value={name} active={current === name} onClick={setCurrent} key={i}>
                            {title}
                        </Tab>
                    )
                })}
            </div>
            <div className={styles.ingredientsListContainer}>
                <IngredientsList ingredients={buns} groupTitle={'Булки'} viewRef={bunsContainer}/>
                <IngredientsList ingredients={sauces} groupTitle={'Соусы'} viewRef={saucesContainer}/>
                <IngredientsList ingredients={mains} groupTitle={'Начинки'} viewRef={mainsContainer}/>
            </div>
        </section>
    )
}

export default BurgerIngredients
